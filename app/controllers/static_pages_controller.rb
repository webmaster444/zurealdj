class StaticPagesController < ApplicationController

  skip_before_action :authenticate_user

  def terms_n_conditions
    @page = TermsNConditionsPage.first_or_create
    render json: {page: @page.content}
    end

  def who_we_are
    @page = WhoWeArePage.first_or_create
    render json: {page: @page.content}
  end

  def how_we_work
    @page = HowWeWorkPage.first_or_create
    render json: {page: @page.content}
  end

  def crew
    @page = CrewPage.first_or_create
    render json: {page: @page.content}
  end

  def cancelations
    @page = CancelationsPage.first_or_create
    render json: {page: @page.content}
  end

  def policies
    @page = PoliciesPage.first_or_create
    render json: {page: @page.content}
  end

  def cancellation_policy
    @page = CancellationPolicy.first_or_create
    render json: {page: @page.content}
  end
end