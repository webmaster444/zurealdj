class OrganizersStreamer
  include Enumerable
  require 'csv'
  def initialize()

  end

  def each
    yield CSV::Row.new([], [
                            'Id', 
                            'Name',
                            'Email',
                            'City',
                            'Country',
                            'About',
                            'Created Date',
                          ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")

    query = Organizer.query

    offset = 0
    limit = 1000
    results = Organizer.find_by_sql(query.take(limit).skip(offset))

    while results.size > 0
      results = Organizer.find_by_sql(query.take(limit).skip(offset))
      offset += limit
      results.each do |organizer|
        yield CSV::Row.new([], [
            organizer.id,
            organizer.name,
            organizer.email,
            organizer.city,
            CountryFlag.name_by_id(organizer.country_flag_code),
            organizer.about,
            organizer.created_at.strftime("%d/%m/%Y"),
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end
