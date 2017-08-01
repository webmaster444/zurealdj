class EventsStreamer
  include Enumerable
  require 'csv'
  def initialize(query)
    @query = query
  end

  def each
    yield CSV::Row.new([], [
                            'Id', 
                            'Title',
                            'City',
                            'Country',
                            'Start date',
                            'End Date',
                            'DJ slots',
                            'Organizer Id',
                            'Created Date',
                            'Updated Date',
                          ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")


    offset = 0
    limit = 1000
    results_present = true

    while results_present
      results = Event.find_by_sql(@query.take(limit).skip(offset))
      offset += limit
      results_present = results.size > 0
      results.each do |event|
        yield CSV::Row.new([], [
            event.id,
            event.title,
            event.city,
            CountryFlag.find(event.country_flag_code)[:title],
            event.start_date,
            event.end_date,
            event.dj_slots,
            event.organizer_id,
            event.created_at,
            event.updated_at,
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end
