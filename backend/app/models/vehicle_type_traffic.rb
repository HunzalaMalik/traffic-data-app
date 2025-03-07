class VehicleTypeTraffic < ApplicationRecord
  belongs_to :country_traffic

  validates :vehicle_type, presence: true, uniqueness: { scope: :country_traffic_id, message: "has already been added for this country" }
  validates :count, numericality: { greater_than_or_equal_to: 0 }
  validate :total_vehicle_count_does_not_exceed_country_traffic

  private

  def total_vehicle_count_does_not_exceed_country_traffic
    return unless country_traffic
  
    existing_traffic = country_traffic.vehicle_type_traffics.where.not(id: id).sum(:count)
    total_count = existing_traffic + count
  
    if total_count > country_traffic.count
      errors.add(:count, "Total vehicle count exceeds country traffic count")
    end
  end
  
end
