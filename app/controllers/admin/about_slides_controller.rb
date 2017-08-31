class Admin::AboutSlidesController < Admin::BaseController

    load_and_authorize_resource :about_slide

    def index
        page = params[:page].to_i
        page = 1 if page < 1

        per_page = params[:per_page].to_i
        per_page = 10 if per_page < 1

        query = AboutSlide.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @slides = AboutSlide.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = AboutSlide.find_by_sql(count_query.to_sql).count
    end

    def show

    end

    def create
        @about_slide = AboutSlide.new slide_params

        if @about_slide.save
            render json: { message: 'Slide saved.' }
        else
            render json: { validation_errors: @about_slide.errors }, status: :unprocessable_entity
        end
    end

    def update
        if @about_slide.update_attributes slide_params
            render json: { message: 'Slide saved.' }
        else
            render json: { validation_errors: @about_slide.errors }, status: :unprocessable_entity
        end
    end

    def destroy
        @about_slide.destroy
        render json: {ok: true}
    end

    private

    def slide_params
        params.require(:slide).permit :content
    end
end