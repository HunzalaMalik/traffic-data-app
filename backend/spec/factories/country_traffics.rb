FactoryBot.define do
  factory :country_traffic do
    sequence(:country) { |n| "Country #{n}" }
    count { rand(100..1000) }
  end
end
