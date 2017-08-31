class Admin::AdminsController < Admin::BaseController
  load_and_authorize_resource :user, parent: false
  def index
    respond_to do |format|
      format.json do
        @page = params[:page].to_i
        @page = 1 if @page < 1
        @per_page = params[:per_page].to_i
        @per_page = 10 if @per_page < 1
        query = Admin.search_query(params)
        count_query = query.clone.project('COUNT(*)')
        @admins = User.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
        @count = User.find_by_sql(count_query.to_sql).count
      end
    end
  end

  def create
    @user = User.new role: Role.admin
    if @user.update_attributes admin_params
      render json: {message: 'Admin successfully updated'}
    else
      render json: {validation_errors: @user.errors}, status: 422
    end
  end

  def destroy
    if @user.id == current_user.id
      render json: {errors: ['Can not remove yourself.']}, status: 422 and return
    end
    if @user.destroy
      render json: {message: 'User successfully removed.' }
    else
      render json: {errors: @user.errors.full_messages }
    end
  end

  private
  def admin_params
    params.permit(:name, :email, :password, :password_confirmation, :active)
  end



end