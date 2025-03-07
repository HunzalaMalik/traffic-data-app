class CreateVehicleTypeTraffics < ActiveRecord::Migration[8.0]
  def change
    create_table :vehicle_type_traffics do |t|
      t.string :vehicle_type
      t.integer :count

      t.timestamps
    end
  end
end
