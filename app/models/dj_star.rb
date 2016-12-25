class DjStar < ApplicationRecord
  belongs_to :dj
  belongs_to :organizer

  validates :stars, :numericality => { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :dj_id, uniqueness: {scope: :organizer_id}
end