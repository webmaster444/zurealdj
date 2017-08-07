class FavDj < ApplicationRecord

  has_attached_file :image, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/images/missing_picture.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user, foreign_key: 'dj_id'

  def self.search_query(params)

    params[:per_page] ||= 10
    fav_djs = FavDj.arel_table

    fields = [
        fav_djs[:id],
        fav_djs[:dj_id],
        fav_djs[:detail]
    ]

    query = fav_djs
                .project(Arel.star)
                .group(fields)

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(fav_djs[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(fav_djs[:id].desc)
    end

    query.where(fav_djs[:dj_id].matches("%#{ params[:dj_id] }%"))                                if params[:dj_id].present?
    query.where(fav_djs[:detail].matches("%#{ params[:detail] }%"))                              if params[:detail].present?

    query
  end

end
