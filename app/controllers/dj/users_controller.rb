class Dj::UsersController < Dj::BaseController

  skip_before_action :not_finished_profile, except: :profile

  def step
    @user = current_user
    if @user.update_attributes step_params
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

  def step_data
    @user = current_user
    render 'profile'
  end

  def comments
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    stars = Star.arel_table
    bookings = Booking.arel_table
    events = Event.arel_table
    organizers = Organizer.arel_table

    fields = [
        stars[:comment],
        stars[:stars],
        stars[:created_at],
        events[:title],
        organizers[:user_id]
    ]

    query = stars
                .project(fields)
                .group(bookings[:id])
                .group(events[:id])
                .group(organizers[:id])
                .group(stars[:id])
                .join(bookings).on(bookings[:id].eq(stars[:booking_id]))
                .join(events).on(events[:id].eq(bookings[:event_id]))
                .join(organizers).on(organizers[:id].eq(events[:organizer_id]))
                .where(stars[:to_user_id].eq current_user[:id])
                .where(stars[:comment].not_eq(nil) && stars[:comment].not_eq(""))

    query = query.order(stars[:created_at].desc)

    count_query = query.clone.project('COUNT(*)')

    @comments = Star.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Star.find_by_sql(count_query.to_sql).count
  end

  def update_profile
    @user = current_user
    @user.dj.sample = nil if(params[:sample_removed])
    if @user.update_attributes profile_params
      render json: {message: 'Profile updated.'}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    allowed_params = params.permit(:name, :dj_or_venue_name, :width, :height, :crop_x, :crop_y, :crop_w, :crop_h, :crop_rotate,
                  :crop_scale_x, :crop_scale_y, :avatar, :about,
                  dj_attributes: [ :rate_per_hour, :free_to_hire, :city, :country_flag_code, :sample, :sample_title],
                   event_category_ids: [], genre_ids: [], equipment_ids: [])
    allowed_params[:dj_attributes][:id] = current_user.dj.id
    allowed_params
  end

  def step_params
    allowed_params = params.permit :personal_url, :agree, dj_attributes: [:rate_per_hour, :free_to_hire],
                   event_category_ids: [], genre_ids: [], equipment_ids: []
    allowed_params[:dj_step] =  @user.next_step
    allowed_params
  end
end