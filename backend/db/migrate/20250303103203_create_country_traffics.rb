class CreateCountryTraffics < ActiveRecord::Migration[8.0]
  def change
    create_table :country_traffics do |t|
      t.string :country
      t.integer :count

      t.timestamps
    end
  end
end
