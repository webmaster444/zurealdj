class Dj::UsersController < Dj::BaseController

  skip_before_filter :not_finished_profile

  def step
    @user = current_user
    allowed_params = step_params.merge({dj_step: @user.next_step})
    if @user.update_attributes allowed_params
      if @user.next_step == 'dj_completed'
        @user.update_attribute :dj_step, 'dj_completed'
      end
      render json: {next_step: @user.next_step.try(:gsub, 'dj_', '')}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def step_back
    @user = current_user
    @user.update_attribute :dj_step, @user.previous_step
    render json: { step: @user.next_step.gsub('dj_', '') }
  end

  def profile
    @user = current_user
  end

  def update_profile
    @user = current_user
    if @user.update_attributes profile_params
      render json: {message: 'Profile updated.'}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.permit(:name, :width, :height, :crop_x, :crop_y, :crop_w, :crop_h, :crop_rotate,
                  :crop_scale_x, :crop_scale_y, :avatar, :about,
                  dj_attributes: [:rate_per_hour, :city, :country_flag_code, :sample, :sample_title],
                   event_category_ids: [], genre_ids: [], equipment_ids: [])
  end

  def step_params
    params.permit :personal_url, :agree, dj_attributes: [:rate_per_hour],
                   event_category_ids: [], genre_ids: [], equipment_ids: []
  end
end