class Admin::DjsController < Admin::BaseController

  def index

    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    respond_to do |f|
      f.json do
        @djs = User.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
        @count = User.find_by_sql(query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=djs.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = DjsStreamer.new(params)
      end
    end
  end
  
  def update
    @dj = Dj.find params[:id]
    @user = User.find @dj[:user_id]
    if @user.update_attributes dj_params


      render json: { message: I18n.t('dj.messages.success_upsert') }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user = User.find params[:id]
    @dj = Dj.find_by_user_id params[:id]
    @user.destroy
    @dj.destroy
    render json: {ok: true}
  end

  def show
    @user = User.find params[:id]
    @dj = Dj.find_by_user_id params[:id]
    #render json: {ok: true}
  end

  # related models actions

  private 

  def dj_params
    allowed_params = params.require(:user).permit(:name, :email, :personal_url, :width, :height, :crop_x, :crop_y, :crop_w, :crop_h, :crop_rotate,
                                :crop_scale_x, :crop_scale_y, :avatar, :about,
                                dj_attributes: [:rate_per_hour, :free_to_hire, :city, :country_flag_code, :sample_title, sample: [] ],
                                event_category_ids: [], genre_ids: [], equipment_ids: [])
    allowed_params[:dj_attributes][:id] = @dj.id
    allowed_params

  end


  def query(options={})
    users = User.arel_table
    djs = Dj.arel_table

    fields = [
        users[:id],
        users[:name],
        users[:email],
        users[:about],
        users[:avatar_file_name],
        users[:avatar_content_type],
        users[:avatar_file_size],
        users[:avatar_updated_at],
        djs[:created_at],
        djs[:id].as('dj_id'),
        djs[:city],
        djs[:country_flag_code],
        djs[:rate_per_hour],
        djs[:free_to_hire]
    ]

    q = users
            .group(djs[:id])
            .group(users[:id])
            .join(djs).on(djs[:user_id].eq(users[:id]))

    q.where(users[:name].matches("%#{ params[:name] }%")) if params[:name].present?

    model = Dj.column_names.include?(params[:sort_column.to_s])? djs: users

    if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
      q = q.order(model[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    else
      q = q.order(model[:id].desc)
    end
    countries = CountryFlag.find_by_country_name(params[:country])       if params[:country].present?
    q.where(users[:name].matches("%#{params[:name]}%"))                  if params[:name].present?
    q.where(djs[:city].matches("%#{ params[:city] }%"))                  if params[:city].present?
    q.where(djs[:country_flag_code].in(countries))                       if params[:country].present?
    q.where(djs[:rate_per_hour].gteq(params[:rate_per_hour_from]))       if params[:rate_per_hour_from].present?
    q.where(djs[:rate_per_hour].lteq(params[:rate_per_hour_to]))         if params[:rate_per_hour_to].present?
    q.where(djs[:created_at].gteq(params[:date_from].to_date))           if params[:date_from].present?
    q.where(djs[:created_at].lteq(params[:date_to].to_date))             if params[:date_to].present?

    if options[:count]
      q.project("COUNT(*)")
    else
      q.project(fields)
    end
  end

end