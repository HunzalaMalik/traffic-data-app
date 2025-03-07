require 'rails_helper'

RSpec.describe VehicleTypeTraffic, type: :model do
  let!(:country_traffic) { create(:country_traffic, count: 300) }
  let!(:vehicle_traffic) { create(:vehicle_type_traffic, country_traffic: country_traffic, vehicle_type: "Bike", count: 200) }

  it { should belong_to(:country_traffic) }
  it { should validate_uniqueness_of(:vehicle_type).scoped_to(:country_traffic_id).with_message("has already been added for this country") }
  it { should validate_presence_of(:vehicle_type) }
  it { should validate_numericality_of(:count).is_greater_than_or_equal_to(0) }

  it "should not allow vehicle count to exceed country traffic count" do
    country_traffic.reload
    invalid_vehicle = country_traffic.vehicle_type_traffics.build(vehicle_type: "Car", count: 150)
    
    expect(invalid_vehicle).not_to be_valid
    expect(invalid_vehicle.errors[:count]).to include("Total vehicle count exceeds country traffic count")
  end
end