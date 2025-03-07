VehicleTypeTraffic.destroy_all
CountryTraffic.destroy_all

countries = [
  { country: "United States", count: 500 },
  { country: "Canada", count: 300 },
  { country: "United Kingdom", count: 400 },
  { country: "Germany", count: 350 },
  { country: "France", count: 375 },
  { country: "India", count: 700 },
  { country: "Pakistan", count: 600 },
  { country: "Australia", count: 275 },
  { country: "Japan", count: 450 },
  { country: "Brazil", count: 500 }
]

countries.each do |country_data|
  country = CountryTraffic.create!(country_data)

  if country.country == "United States"
    country.vehicle_type_traffics.create!([
      { vehicle_type: "Car", count: 200 },
      { vehicle_type: "Bike", count: 100 }
    ])
  elsif country.country == "United Kingdom"
    country.vehicle_type_traffics.create!([
      { vehicle_type: "Bus", count: 150 },
      { vehicle_type: "Car", count: 100 }
    ])
  elsif country.country == "India"
    country.vehicle_type_traffics.create!([
      { vehicle_type: "Bike", count: 300 },
      { vehicle_type: "Bus", count: 200 }
    ])
  end
end
