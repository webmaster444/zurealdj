class Admin::OrganizersController < Admin::BaseController

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    respond_to do |f|
      f.json do
        @organizers = User.find_by_sql(Organizer.query(params).take(@per_page).skip((@page - 1) * @per_page).to_sql)
        @count = User.find_by_sql(Organizer.query(params.merge({count: true})).to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=organizers.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = OrganizersStreamer.new()
      end
    end
  end
  
  def update
    @organizer = Organizer.find params[:id]
    @user = User.find @organizer[:user_id]
    if @user.update_attributes organizer_params

      render json: { message: I18n.t('organizer.messages.success_upsert') }
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

  private

  def organizer_params
    allowed_params = params.require(:user).permit(:name, :email, :personal_url, :company_name, :width, :height, :crop_x, :crop_y, :crop_w, :crop_h, :crop_rotate,
                                                  :crop_scale_x, :crop_scale_y, :avatar, :about,
                                                  organizer_attributes: [:address, :country_flag_code],
                                                  event_category_ids: [], genre_ids: [])
    allowed_params[:organizer_attributes][:id] = @organizer.id
    allowed_params

  end

end