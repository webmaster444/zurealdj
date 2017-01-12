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
      render json: {validation_errors: @users.errors}, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.permit(:name, :avatar, :about, :facebook_link, :instagram_link, :soundcloud_link, :weekday_rate_from,
                  :weekday_rate_to, :weekend_rate_from, :weekend_rate_to,
                  dj_attributes: [:city, :country_flag_code, :sample, :sample_title], cancelation_ids: [], event_category_ids: [],
                  genre_ids: [], equipment_ids: [])
  end

  def step_params
    params.permit :personal_url, :weekday_rate_from, :weekday_rate_to, :weekend_rate_from, :weekend_rate_to,
                  cancelation_ids: [], event_category_ids: [], genre_ids: [], equipment_ids: []
  end
end