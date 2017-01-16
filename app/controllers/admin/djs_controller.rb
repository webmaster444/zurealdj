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
    @user.update_attributes user_update_params
    @dj.update_attributes dj_params
    if @user.save && @dj.save
      render json: { message: I18n.t('dj.messages.success_upsert') }
    else
      render json: { errors: @user.errors.full_messages +  @dj.errors.full_messages }, status: :unprocessable_entity
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
    params.require(:dj).permit :first_name, :last_name, :city, :sample, :country_flag_code, :weekday_price_from, :weekday_price_to, :weekend_price_from, :weekend_price_to
  end

  def user_update_params
    params.require(:dj).permit :name, :email, :personal_url, :avatar, :about, :instagram_link, :facebook_link, :soundcloud_link
  end

  def query(options={})
    users = User.arel_table
    djs = Dj.arel_table

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
        djs[:created_at],
        djs[:id].as('dj_id'),
        djs[:city],
        djs[:country_flag_code],
        djs[:weekday_rate_from],
        djs[:weekday_rate_to],
        djs[:weekend_rate_from],
        djs[:weekend_rate_to]
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
    q.where(djs[:weekday_rate_from].gteq(params[:weekday_rate_from]))    if params[:weekday_rate_from].present?
    q.where(djs[:weekday_rate_to].lteq(params[:weekday_rate_to]))        if params[:weekday_rate_to].present?
    q.where(djs[:weekend_rate_from].gteq(params[:weekend_rate_from]))    if params[:weekend_rate_from].present?
    q.where(djs[:weekend_rate_to].lteq(params[:weekend_rate_to]))        if params[:weekend_rate_to].present?
    q.where(djs[:created_at].gteq(params[:date_from].to_date))           if params[:date_from].present?
    q.where(djs[:created_at].lteq(params[:date_to].to_date))             if params[:date_to].present?

    if options[:count]
      q.project("COUNT(*)")
    else
      q.project(fields)
    end
  end

end