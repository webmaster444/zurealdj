class Dj::BookingsController < Dj::BaseController

  def update
    @booking = Booking.find params[:id]

    render render json: {  }, status: :not_found and return unless current_user.dj.bookings.include? @booking

    @booking.assign_attributes params.permit :status
    if @booking.save
      render json: { message: (params[:status] == 'true' ? 'Successfully confirmed' : 'Successfully cancelled') }
    else
      render json: { validation_errors: @booking.errors }, status: :unprocessable_entity
    end

  end

end