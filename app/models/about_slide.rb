class AboutSlide < ApplicationRecord

    validates :content, presence: true

    def self.search_query(params)
        slides = AboutSlide.arel_table

        fields = [
            slides[:id],
            slides[:content],
            slides[:created_at]
        ]

        query = slides
                    .project(Arel.star)
                    .group(fields)

        if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
            query = query.order(slides[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
        else
            query = query.order(slides[:id].desc)
        end

        query
    end
end
