FactoryGirl.define do
  factory :user do
    email 'testspec@spec.com'
    name 'spectest'
    password '1234567890'
    password_confirmation '1234567890'
    confirmed true

    trait :admin do
      role_id {FactoryGirl.create(:role, :admin).id}
    end
    trait :dj do
      role_id {FactoryGirl.create(:role, :dj).id}
    end
    trait :organizer do
      role_id {FactoryGirl.create(:role, :organizer).id}
    end
  end
end
