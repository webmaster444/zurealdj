class CoursesStreamer
  include Enumerable
  def initialize(params)
    @params = params
  end
  def each
    yield CSV::Row.new([], [
        'Id',
        'Title',
        'Detail',
        'Created date'
    ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
    query = Course.search_query(@params)
    offset = 0
    limit = 1000
    results_present = true
    while results_present
      results = Course.find_by_sql(query.take(limit).skip(offset))
      offset += limit
      results_present = results.size > 0
      results.each do |course|
        yield CSV::Row.new([], [
            course.id,
            course.title,
            course.detail,
            course.created_at.try(:strftime, "%d/%m/%Y")
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end