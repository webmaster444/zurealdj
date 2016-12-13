class Language
  def self.all
    [
        {title: 'England', code: 'england', short_code: 'en'},
    ].sort{|a,b| a[:title] <=> b[:title]}
  end

  def self.find(code)
    all.select{|hash| hash[:code] == code }.try(:first)
  end

  def self.codes
    all.map{|c| c[:code] }
  end
end