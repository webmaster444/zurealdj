class Admin::CancellationPolicyController < ApplicationController


  def update
    @article = CancellationPolicy.first_or_create

    if @article.update_attributes cancellation_policy_params
      render json: {message: 'Cancellation policy notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @article = CancellationPolicyPage.first_or_create
  end

  # related models actions

  private 

    def cancellation_policy_params
      params.require(:cancellation_policy).permit!
    end

end