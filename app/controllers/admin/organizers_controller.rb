class Admin::OrganizersController < Admin::BaseController

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    respond_to do |f|
      f.json do
        @organizers = User.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
        @count = User.find_by_sql(query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=organizers.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = OrganizersStreamer.new(params)
      end
    end
  end
  
  def update
    @organizer = Organizer.find params[:id]
    @user = User.find @organizer[:user_id]
    @user.update_attributes user_update_params
    @organizer.update_attributes organizer_params
    if @user.save && @organizer.save
      render json: { message: I18n.t('dj.messages.success_upsert') }
    else
      render json: { errors: @user.errors.full_messages +  @organizer.errors.full_messages}, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user = User.find params[:id]
    @organizer = Organizer.find_by_user_id params[:id]
    @user.destroy
    @organizer.destroy
    render json: {ok: true}
  end

  def show
    @user = User.find params[:id]
    @organizer = Organizer.find_by_user_id params[:id]
  end

  # related models actions

  private 

  def organizer_params
    params.require(:organizer).permit :first_name, :last_name, :city, :country_flag_code, :address
  end

  def user_update_params
    params.require(:organizer).permit :name, :email, :personal_url, :avatar, :about, :instagram_link, :facebook_link, :soundcloud_link
  end

  def query(options={})
    users = User.arel_table
    organizers = Organizer.arel_table

    fields = [
        users[:id],
        users[:name],
        users[:about],
        users[:instagram_link],
        users[:facebook_link],
        users[:soundcloud_link],
        users[:avatar_file_name],
        users[:avatar_content_type],
        users[:avatar_file_size],
        users[:avatar_updated_at],
        organizers[:created_at],
        organizers[:id].as('dj_id'),
        organizers[:city],
        organizers[:first_name],
        organizers[:last_name],
        organizers[:country_flag_code],
        organizers[:address]
    ]

    q = users
            .group(organizers[:id])
            .group(users[:id])
            .join(organizers).on(organizers[:user_id].eq(users[:id]))

    q.where(users[:name].matches("%#{ params[:name] }%")) if params[:name].present?

    model = Organizer.column_names.include?(params[:sort_column.to_s])? organizers: users

    if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
      q = q.order(model[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    else
      q = q.order(model[:id].desc)
    end
    countries = CountryFlag.find_by_country_name(params[:country])       if params[:country].present?
    q.where(users[:name].matches("%#{params[:name]}%"))                  if params[:name].present?
    q.where(organizers[:city].matches("%#{ params[:city] }%"))                  if params[:city].present?
    q.where(organizers[:country_flag_code].in(countries))                       if params[:country].present?
    q.where(organizers[:created_at].gteq(params[:date_from].to_date))           if params[:date_from].present?
    q.where(organizers[:created_at].lteq(params[:date_to].to_date))             if params[:date_to].present?

    if options[:count]
      q.project("COUNT(*)")
    else
      q.project(fields)
    end
  end

end