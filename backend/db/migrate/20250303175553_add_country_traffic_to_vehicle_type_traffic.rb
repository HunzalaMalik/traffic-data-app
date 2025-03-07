class AddCountryTrafficToVehicleTypeTraffic < ActiveRecord::Migration[8.0]
  def change
    add_reference :vehicle_type_traffics, :country_traffic, null: false, foreign_key: true
  end
end
