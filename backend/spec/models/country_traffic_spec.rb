require 'rails_helper'

RSpec.describe CountryTraffic, type: :model do
  let!(:country_traffic) { create(:country_traffic) }

  it { should have_many(:vehicle_type_traffics).dependent(:destroy) }
  it { should validate_presence_of(:country) }
  it { should validate_uniqueness_of(:country) }
  it { should validate_numericality_of(:count).is_greater_than(0) }
end