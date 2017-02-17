class Organizer::MessagesController < Organizer::BaseController
  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    messages = Message.arel_table

    query = messages
                .project(Arel.star)
                .group(messages[:id])
                .where(messages[:event_id].eq(params[:event_id]))
                .where(
                    messages[:from_user_id].in([current_user.id, params[:dj_id]])
                    .and(messages[:to_user_id].in([current_user.id, params[:dj_id]]))
                )
                .order(messages[:created_at].desc)

    query.where(messages[:id].lteq(params[:sync_id])) if params[:sync_id].present?

    count_query = query.clone.project('COUNT(*)')

    @messages = Message.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql).reverse
    @count = Message.find_by_sql(count_query.to_sql).count
  end
end