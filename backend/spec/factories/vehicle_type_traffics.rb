FactoryBot.define do
  factory :vehicle_type_traffic do
    vehicle_type { ["Car", "Bike", "Bus"].sample }
    count { rand(1..300) }
    association :country_traffic
  end
end
