class BookingsStreamer
  include Enumerable
  require 'csv'
  def initialize(query)
    @query = query
  end

  def each
    yield CSV::Row.new([], [
                            'Id', 
                            'Event Id',
                            'DJ Id',
                            'Rate',
                            'From date',
                            'To date',
                            'Created Date',
                            'Status',
                          ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")


    offset = 0
    limit = 1000
    results_present = true

    while results_present
      results = Booking.find_by_sql(@query.take(limit).skip(offset))
      offset += limit
      results_present = results.size > 0
      results.each do |booking|
        yield CSV::Row.new([], [
            booking.id,
            booking.event_id,
            booking.dj_id,
            booking.rate,
            booking.from_date,
            booking.to_date,
            booking.created_at,
            booking.status,
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end
