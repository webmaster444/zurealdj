class Dj < ActiveRecord::Base

  def country_flag
    CountryFlag.find(country_flag_code)
  end
  attr_accessor :sample

  def sample_attachments
    Attachment.where entity_id: self.id, entity_type: 'dj_sample'
  end
  attr_accessor :photo

  def photo_attachments
    Attachment.where entity_id: self.id, entity_type: 'dj_photo'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    sample_attachments.destroy_all
    photo_attachments.destroy_all
  end

  def update_attachments
    update_sample_attachments
    update_photo_attachments
  end


  def update_sample_attachments
    self.sample ||= {}
    if self.sample[:id]
      Attachment.find_by_id_and_entity_type(self.sample[:id], 'dj_sample').destroy if self.sample[:removed] == true || self.sample[:removed] == 'true'
    elsif self.sample[:file]
      Attachment.create file: self.sample[:file], entity_type: 'dj_sample', entity_id: self.id
    end
    end

  def update_photo_attachments
    self.photo ||= {}
    if self.photo[:id]
      Attachment.find_by_id_and_entity_type(self.photo[:id], 'dj_photo').destroy if self.photo[:removed] == true || self.photo[:removed] == 'true'
    elsif self.photo[:file]
      Attachment.create file: self.photo[:file], entity_type: 'dj_photo', entity_id: self.id
    end
    end
end
