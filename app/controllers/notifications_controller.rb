class NotificationsController < ApplicationController

  load_and_authorize_resource :notification

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    notifications = Notification.arel_table

    query = notifications
                .project(Arel.star)
                .group(notifications[:id])
                .order(notifications[:created_at].desc)
                .where(notifications[:to_user_id].eq current_user.id)


    if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
      query = query.order(notifications[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    else
      query = query.order(notifications[:created_at].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @notifications = Notification.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Notification.find_by_sql(count_query.to_sql).count
  end

  def update
    if @notification.update_attributes notification_attributes
      render json: {ok: true}
    else
      render json: {errors: @notification.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def notification_attributes
    params.permit :read
  end

end