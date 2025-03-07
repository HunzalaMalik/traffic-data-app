class CountryTraffic < ApplicationRecord
  has_many :vehicle_type_traffics, dependent: :destroy
  validates :country, presence: true, uniqueness: true
  validates :count, presence: true, numericality: { greater_than: 0 }
end