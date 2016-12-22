class Equipment < ApplicationRecord

  has_attached_file :icon, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/images/missing_picture.png'
  validates_attachment_content_type :icon, content_type: /\Aimage\/.*\Z/

  has_and_belongs_to_many :users

end
