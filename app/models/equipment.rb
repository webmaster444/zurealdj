class Equipment < ActiveRecord::Base

  attr_accessor :icon

  def icon_attachments
    Attachment.where entity_id: self.id, entity_type: 'equipment_icon'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    icon_attachments.destroy_all
  end

  def update_attachments
    update_icon_attachments
  end


  def update_icon_attachments
    self.icon ||= {}
    if self.icon[:id]
      Attachment.find_by_id_and_entity_type(self.icon[:id], 'equipment_icon').destroy if self.icon[:removed] == true || self.icon[:removed] == 'true'
    elsif self.icon[:file]
      Attachment.create file: self.icon[:file], entity_type: 'equipment_icon', entity_id: self.id
    end
    end
end
