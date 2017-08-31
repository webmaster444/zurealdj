class Subscription < ApplicationRecord

  enum subscription_for: {
      dj: 1,
      organizer: 2
  }

  validates :title,            presence: true
  validates :description,      presence: true
  validates :price,            presence: true, unless: -> { free }
  validates :period,           presence: true, inclusion: {in: %w(days weeks months years)}
  validates :period_count,     presence: true
  validates :subscription_for, presence: true, inclusion: {in: Subscription.subscription_fors.keys}

  def full_access
    if subscription_for == 'dj'
      dj_can_be_visible_for_browsing && dj_can_confirm_booking
    elsif subscription_for == 'organizer'
      org_can_add_dj_to_favorites && org_can_book_dj && org_can_create_event
    else
      false
    end
  end

  def self.free_for_dj
    Subscription.where(free: true, subscription_for: 'dj').first_or_create do |s|
      s.title                          = 'Try Us'
      s.description                    = 'Limited functionality'
      s.period_count                   = 100
      s.period                         = 'years'
      s.dj_can_be_visible_for_browsing = false
      s.dj_can_confirm_booking         = false
    end
  end

  def self.free_for_organizer
    Subscription.where(free: true, subscription_for: 'organizer').first_or_create do |s|
      s.title                          = 'Try Us'
      s.description                    = 'Limited functionality'
      s.period_count                   = 100
      s.period                         = 'years'
      s.org_can_book_dj                = false
      s.org_can_create_event           = false
      s.org_can_add_dj_to_favorites    = false
    end
  end
end