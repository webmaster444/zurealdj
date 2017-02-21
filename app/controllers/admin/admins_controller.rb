class Admin::AdminsController < Admin::BaseController
  skip_before_action :authenticate_user
  def profile
    @user = current_user
  end



end