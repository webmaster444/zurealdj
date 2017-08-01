FactoryGirl.define do
    factory :role do
        trait :admin do
            name 'admin'
        end
        trait :dj do
            name 'dj'
        end
        trait :organizer do
            name 'organizer'
        end
    end
end
