class DjsStreamer
  include Enumerable
  require 'csv'
  def initialize(params)
    @params = params
  end

  def each
    yield CSV::Row.new([], [
                            'Id', 
                            'First Name',
                            'Last Name',
                            'City',
                            'Country',
                            'About',
                            'Weekday Price From',
                            'Weekday Price To',
                            'Weekend Price From',
                            'Weekend Price To',
                            'Created Date',
                          ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")

    query = Dj.search_query(@params)

    offset = 0
    limit = 1000
    results = Dj.find_by_sql(query.take(limit).skip(offset))

    while results.size > 0
      results = Dj.find_by_sql(query.take(limit).skip(offset))
      offset += limit
      results.each do |dj|
        yield CSV::Row.new([], [
            dj.id,
            dj.first_name,
            dj.last_name,
            dj.city,
            CountryFlag.find(dj.country_flag_code)[:title],
            dj.about,
            dj.rate_per_hour,
            dj.created_at.strftime("%d/%m/%Y"),
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end
