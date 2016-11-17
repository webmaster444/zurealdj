class AttachmentsController < ApplicationController

  load_and_authorize_resource :attachment
  skip_before_filter :verify_authenticity_token

  def create
    params.permit!
    @attachment = Attachment.create attacment_params

    render json: { filelink: @attachment.file.url }
  end

  private

  def attacment_params
    params.permit(:file, :entity_type)
  end
end