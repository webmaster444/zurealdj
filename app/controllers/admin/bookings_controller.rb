class Admin::BookingsController < ApplicationController

  load_and_authorize_resource :booking

  def index
    bookings = Booking.arel_table

    query = bookings
            .project(Arel.star)
            .group(bookings[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(bookings[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(bookings[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @bookings = Booking.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Booking.find_by_sql(count_query.to_sql).count
  end

    def create
    @booking = Booking.new booking_params

    if @booking.save
      render json: { message: I18n.t('booking.messages.success_upsert') }
    else
      render json: {errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @booking.update_attributes booking_params
      render json: { message: I18n.t('booking.messages.success_upsert') }
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @booking.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  def events
    @events = Event.all.select :id, :title
  end

  def users
    @users = User.all.select :id
  end

  private 

  def booking_params
    params.require(:booking).permit!
  end

end