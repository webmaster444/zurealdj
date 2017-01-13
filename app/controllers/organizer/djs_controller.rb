class Organizer::DjsController < Organizer::BaseController

  #load_and_authorize_resource :dj

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    @djs = User.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = User.find_by_sql(query(count: true)).first.try(:[], :count)
  end

  def rate
    @vote = DjStar.new stars: params[:rating], dj: @dj, organizer: current_user.organizer
    if @vote.save
      render json: {message: "Vote saved."}
    else
      render json: {errors: @vote.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def show
    #@user = @dj.user
    @user = User.find params[:id]
    @dj = Dj.find_by_user_id @user.id
  end

  private

  def query(options={})
    users = User.arel_table
    djs = Dj.arel_table

    q = users
            .join(djs).on(djs[:user_id].eq(users[:id]))

    q.where(users[:name].matches("%#{ params[:name] }%"))                 if params[:name].present?
    q.where(djs[:weekday_rate_from].gteq(params[:price_from])
                .or(djs[:weekend_rate_from].gteq(params[:price_from])))  if params[:price_from].present?
    q.where(djs[:weekday_rate_to].lteq(params[:price_to])
                .or(djs[:weekend_rate_to].lteq(params[:price_to])))      if params[:price_to].present?


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
                djs[:id].as('dj_id'),
                djs[:city],
                djs[:country_flag_code],
                "(array(SELECT json_build_object(
                       'id', genres.id,
                       'title', genres.title
                     ) FROM genres
                       JOIN genres_users ON genres.id = genres_users.genre_id
                       WHERE genres_users.user_id = users.id
                     )) as genres",
                "COALESCE((SELECT SUM(stars) FROM dj_stars WHERE dj_stars.dj_id = djs.id), 0) as stars_count",
                "COALESCE((SELECT COUNT(id) FROM dj_stars WHERE dj_stars.dj_id = djs.id), 0) as votes_count",
      )
    end

  end
end