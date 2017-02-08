class Organizer::DjsController < Organizer::BaseController

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 12 if @per_page < 1

    @djs = User.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = User.find_by_sql(query(count: true)).first.try(:[], :count)
  end

  def rate
    booking = Booking.find params[:booking_id]
    render json: {}, status: :not_found and return unless booking && current_user.organizer.events.include?(booking.event)
    @vote = Star.new rate_params
    if @vote.save
      render json: {message: "Vote saved."}
    else
      render json: {errors: @vote.errors.full_messages}, status: :unprocessable_entity
    end
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
                .where(stars[:to_user_id].eq params[:id])

    query = query.order(stars[:created_at].desc)

    count_query = query.clone.project('COUNT(*)')

    @comments = Star.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Star.find_by_sql(count_query.to_sql).count
  end

  def show
    @user = user
    @dj = dj
  end

  private

  def dj
    @dj ||= user.dj
  end

  def user
    @user ||= User.where("id = ? OR personal_url = ?", params[:id].to_i, params[:id]).first
  end

  def rate_params
    allowed_params = params.permit :booking_id, :comment
    allowed_params[:to_user] = dj.user
    allowed_params[:from_user] = current_user
    allowed_params[:stars] = params[:rating]
    allowed_params
  end

  def query(options={})
    users = User.arel_table
    djs = Dj.arel_table

    q = users
            .join(djs).on(djs[:user_id].eq(users[:id]))

    q.where(users[:name].matches("%#{ params[:name] }%"))                 if params[:name].present?
    q.where(djs[:rate_per_hour].gteq(params[:price_from]))  if params[:price_from].present?
    q.where(djs[:rate_per_hour].lteq(params[:price_to]))      if params[:price_to].present?


    event_categories_users = Arel::Table.new(:event_categories_users)

    params[:event_types].to_a.each do |id|
      q.where(Arel::Nodes::SqlLiteral.new("#{ id } IN (#{ event_categories_users.project(event_categories_users[:event_category_id]).where(event_categories_users[:user_id].eq(users[:id])).to_sql })"))
    end

    genres_users = Arel::Table.new(:genres_users)

    params[:genres].to_a.each do |id|
      q.where(Arel::Nodes::SqlLiteral.new("#{ id } IN (#{ genres_users.project(genres_users[:genre_id]).where(genres_users[:user_id].eq(users[:id])).to_sql })"))
    end

    if params[:favorite].present?
      favorite_djs = Arel::Table.new(:favorite_djs)
      q.where(Arel::Nodes::SqlLiteral.new("djs.id IN (#{ favorite_djs.project(favorite_djs[:dj_id]).where(favorite_djs[:organizer_id].eq(current_user.organizer.id)).to_sql })"))
    end

    if options[:count]
      q.project("COUNT(*)")
    else
      q.project(users[:id],
                users[:name],
                users[:avatar_file_name],
                users[:avatar_content_type],
                users[:avatar_file_size],
                users[:avatar_updated_at],
                users[:personal_url],
                djs[:id].as('dj_id'),
                djs[:city],
                djs[:free_to_hire],
                "(array(SELECT json_build_object(
                       'id', genres.id,
                       'title', genres.title
                     ) FROM genres
                       JOIN genres_users ON genres.id = genres_users.genre_id
                       WHERE genres_users.user_id = users.id
                     )) as genres",
                "COALESCE((SELECT SUM(stars) FROM stars WHERE stars.to_user_id = djs.id), 0) as stars_count",
                "COALESCE((SELECT COUNT(id) FROM stars WHERE stars.to_user_id = djs.id), 0) as votes_count",
      )
    end

  end


end