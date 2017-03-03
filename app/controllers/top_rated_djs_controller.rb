class TopRatedDjsController < ApplicationController
  before_action :set_default_response_format
  skip_before_action :authenticate_user
  def index
    users = User.arel_table
    djs = Dj.arel_table
    bookings = Booking.arel_table

    q = bookings
            .join(djs).on(bookings[:dj_id].eq(djs[:id]))
            .join(users).on(djs[:user_id].eq(users[:id]))

    q.where(bookings[:created_at].gt(7.days.ago))
    q.group(bookings[:dj_id],djs[:id],users[:id])
    q.order(bookings[:dj_id].count.desc)
    q.take(3)
    q.project(bookings[:dj_id], djs[:user_id], Arel.sql('users.*'))

    @users = User.find_by_sql(q.to_sql)

  end

  protected
    def set_default_response_format
      request.format = :json
    end

end