class Organizer::DjsController < Organizer::BaseController

  load_and_authorize_resource :dj

  def index

    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1




    @djs = User.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @has_more = User.find_by_sql(query(count: true))
  end

  def rate
    @vote = DjStar.new stars: params[:rating], dj: @dj, organizer: current_user.organizer
    if @vote.save
      render json: {message: "Vote saved."}
    else
      render json: {errors: @vote.errors.full_messages}, status: :unprocessable_entity
    end

  end

  private

  def query(options={})
    users = User.arel_table
    djs = Dj.arel_table

    q = users
            .join(djs).on(djs[:user_id].eq(users[:id]))

    q.where(users[:name].matches("%#{ params[:name] }%")) if params[:name].present?

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