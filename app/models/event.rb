class Event < ActiveRecord::Base

  def country_flag
    CountryFlag.find(country_flag_code)
  end
  attr_accessor :image

  def image_attachments
    Attachment.where entity_id: self.id, entity_type: 'event_image'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    image_attachments.destroy_all
  end

  def update_attachments
    update_image_attachments
  end


  def update_image_attachments
    self.image ||= {}
    if self.image[:id]
      Attachment.find_by_id_and_entity_type(self.image[:id], 'event_image').destroy if self.image[:removed] == true || self.image[:removed] == 'true'
    elsif self.image[:file]
      Attachment.create file: self.image[:file], entity_type: 'event_image', entity_id: self.id
    end
    end
end
