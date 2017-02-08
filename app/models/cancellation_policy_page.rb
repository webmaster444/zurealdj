class CancellationPolicyPage < ActiveRecord::Base

  def content_attachments
    Attachment.where entity_id: self.id, entity_type: 'cancellation_policy_content'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    content_attachments.destroy_all
  end

  def update_attachments
    update_content_attachments
  end

  def update_content_attachments
    Attachment.where('created_at <= :day_ago AND entity_id IS NULL', :day_ago  => 1.day.ago ).destroy_all

    Attachment.where(entity_id: nil, entity_type: "cancellation_policy_content").each do |attachment|
        if content.include? attachment.file.url
            attachment.update_attribute :entity_id, id
        end
    end
  end
end
