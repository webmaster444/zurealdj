class Admin::SubscriptionsController < Admin::BaseController

  load_and_authorize_resource :subscription

  def index
    @subscriptions = Subscription.order(:position)
  end

  def create
    @subscription = Subscription.new subscription_params
    if @subscription.save
      render json: {message: 'Subscription has been successfully saved.'}
    else
      render json: {errors: @subscription.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @subscription.update_attributes subscription_params
      render json: {message: 'Subscription has been successfully saved.'}
    else
      render json: {errors: @subscription.errors}, status: :unprocessable_entity
    end
  end

  def show

  end

  def destroy
    @subscription.destroy
    render json: {ok: true}
  end

  def update_order
    params[:subscriptions].each_with_index do |s, index|
      Subscription.find(s[:id]).update_attribute :position, index
    end
    render json: {message: "Order updated."}
  end

  private

  def subscription_params
    params.permit :title, :description, :price, :period_count, :period, :subscription_for, :free,
                  :dj_can_be_visible_for_browsing, :dj_can_confirm_booking, :org_can_book_dj, :org_can_add_dj_to_favorites,
                  :org_can_create_event
  end

  # def query(options = {})
  #   @page = params[:page].to_i
  #   @page = 1 if @page < 1
  #   @per_page = params[:per_page].to_i
  #   @per_page = 10 if @per_page < 1
  #
  #   subscriptions = Subscription.arel_table
  #
  #   q = subscriptions.group(subscriptions[:id])
  #
  #   if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
  #     q.order(subscriptions[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
  #   else
  #     q.order(subscriptions[:id].desc)
  #   end
  #
  #   if options[:count]
  #     q.project('COUNT(*)')
  #   else
  #     q.project(Arel.star)
  #         .take(@per_page)
  #         .skip((@page - 1) * @per_page)
  #   end
  #
  #   q
  # end
end