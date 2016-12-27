class OrganizerStar < ApplicationRecord
  belongs_to :dj
  belongs_to :organizer

  validates :stars, :numericality => { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :organizer_id, uniqueness: {scope: :dj_id}
end