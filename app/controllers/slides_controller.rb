class SlidesController < ApplicationController
    skip_before_action :authenticate_user

    def index
        @slides = AboutSlide.all
    end
end