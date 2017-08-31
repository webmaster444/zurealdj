class EquipmentsStreamer
  include Enumerable
  def initialize(params)
    @params = params
  end
  def each
    yield CSV::Row.new([], [
        'Id',
        'Title',
        'Created date'
    ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
    query = Equipment.search_query(@params)
    offset = 0
    limit = 1000
    results_present = true
    while results_present
      results = Equipment.find_by_sql(query.take(limit).skip(offset))
      offset += limit
      results_present = results.size > 0
      results.each do |equipment|
        yield CSV::Row.new([], [
            equipment.id,
            equipment.title,
            equipment.created_at.try(:strftime, "%d/%m/%Y")
        ], true).to_csv(col_sep: ",", row_sep: "\r\n", quote_char: "\"")
      end
    end
  end
end