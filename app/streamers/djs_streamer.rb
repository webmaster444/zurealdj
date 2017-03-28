class DjsStreamer
  include Enumerable
  require 'csv'
  def initialize(params)
    @params = params
  end

  def each
    yield CSV::Row.new([], [
                            'Id', 
                            'Name',
                            'Email',
                            'City',
                            'Country',
                            'About',
                            'Rate per hour',
                            'Created Date',
                          ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")

    query = @params

    offset = 0
    limit = 1000
    results = Dj.find_by_sql(query.take(limit).skip(offset))

    while results.size > 0
      results = Dj.find_by_sql(query.take(limit).skip(offset))
      offset += limit
      results.each do |dj|
        yield CSV::Row.new([], [
            dj.id,
            dj.name,
            dj.email,
            dj.city,
            CountryFlag.name_by_id(dj.country_flag_code),
            dj.about,
            dj.rate_per_hour,
            dj.created_at.strftime("%d/%m/%Y"),
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end
