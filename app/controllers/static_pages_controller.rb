class StaticPagesController < ApplicationController

  skip_before_action :authenticate_user

  def show
    klass = (params[:id] + '_page').camelcase.constantize
    @page = klass.first_or_create
    render json: {page: @page.content}
  end
end