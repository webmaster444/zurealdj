class Course < ApplicationRecord

  has_attached_file :icon, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/images/missing_picture.png'
  validates_attachment_content_type :icon, content_type: /\Aimage\/.*\Z/

  has_and_belongs_to_many :users

  def self.search_query(params)
    params[:per_page] ||= 10
    courses = Course.arel_table

    fields = [
        courses[:id],
        courses[:title],
        courses[:detail],
        courses[:created_at]
    ]

    query = courses
                .project(Arel.star)
                .group(fields)

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(courses[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(courses[:id].desc)
    end

    query.where(courses[:title].matches("%#{ params[:title] }%"))                                if params[:title].present?
    query.where(courses[:detail].matches("%#{ params[:detail] }%"))                              if params[:detail].present?
    query.where(courses[:created_at].gteq(Date.parse(params[:date_from]).beginning_of_day))      if params[:date_from].present?
    query.where(courses[:created_at].lteq(Date.parse(params[:date_to]).end_of_day))              if params[:date_to].present?

    query
  end

end
