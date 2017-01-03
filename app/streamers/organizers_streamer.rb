class OrganizersStreamer
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
                            'Instagram Link',
                            'Facebook Link',
                            'Soundcloud Link',
                            'Created Date',
                          ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")

    query = Organizer.search_query(@params)

    offset = 0
    limit = 1000
    results = Organizer.find_by_sql(query.take(limit).skip(offset))

    while results.size > 0
      results = Organizer.find_by_sql(query.take(limit).skip(offset))
      offset += limit
      results.each do |organizer|
        yield CSV::Row.new([], [
            organizer.id,
            organizer.first_name,
            organizer.last_name,
            organizer.city,
            CountryFlag.find(organizer.country_flag_code)[:title],
            organizer.about,
            organizer.instagram_link,
            organizer.facebook_link,
            organizer.soundcloud_link,
            organizer.created_at.strftime("%d/%m/%Y"),
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end
