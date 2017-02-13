class Organizer::BookingsController < Organizer::BaseController

  def create
    @booking = Booking.new booking_params

    if @booking.save
      render json: { message: "Book request sent !"}
    else
      render json: {errors: @booking.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @booking = Booking.find params[:id]
    render json: { }, status: :not_found and return unless @booking.event.organizer_id == current_user.organizer.id

    @booking.destroy
    render json: { message: "DJ successfully removed from event." }
  end

  private

  def booking_params
    allowed_params = params.permit :dj_id, :event_id, :from_date, :from_time, :to_date, :to_time, :rate

    from_date = nil

    if params[:from_date].present? && params[:from_time].present?
      from_date = Date.parse(params[:from_date])

      /^(?<hour>.*):(?<minute>.*)\s(?<meridiem>.*)/i =~ params[:from_time]

      from_date = DateTime.new  from_date.year, from_date.month, from_date.day, hour.to_i + (meridiem == 'AM' ? 0 : 12), minute.to_i
    end

    allowed_params[:from_date] = from_date

    to_date = nil
    if params[:to_date].present? && params[:to_time].present?
      to_date = Date.parse(params[:to_date])

      /^(?<hour>.*):(?<minute>.*)\s(?<meridiem>.*)/i =~ params[:to_time]

      to_date = DateTime.new  to_date.year, to_date.month, to_date.day, hour.to_i + (meridiem == 'AM'? 0 : 12), minute.to_i
    end

    allowed_params[:to_date] = to_date

    user = User.find(allowed_params[:dj_id])

    {
        dj_id: user.dj.try(:id),
        event_id: allowed_params[:event_id],
        from_date: from_date,
        to_date: to_date,
        rate: allowed_params[:rate]
    }
  end
end