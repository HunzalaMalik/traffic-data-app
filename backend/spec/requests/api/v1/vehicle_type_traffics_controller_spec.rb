require 'rails_helper'

RSpec.describe Api::V1::VehicleTypeTrafficsController, type: :controller do
  let(:country_traffic) { create(:country_traffic, count: 300) }
  let!(:vehicle_traffic) { create(:vehicle_type_traffic, country_traffic: country_traffic, count: 100) }

  describe "GET #index" do
    it "returns a list of vehicle traffic records" do
      get :index, params: { country_traffic_id: country_traffic.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).not_to be_empty
    end
  end

  describe "POST #create" do
    let(:valid_params) { { country_traffic_id: country_traffic.id, vehicle_type_traffic: { country_traffic_id: country_traffic.id, vehicle_type: "Bike", count: 100 } } }

    it "creates a new vehicle traffic record" do
      expect {
        post :create, params: valid_params
      }.to change(VehicleTypeTraffic, :count).by(1)
      
      expect(response).to have_http_status(:created)
    end
  end

  describe "PUT #update" do
    let(:update_params) { { country_traffic_id: country_traffic.id, id: vehicle_traffic.id, vehicle_type_traffic: { count: 120 } } }

    it "updates the vehicle traffic" do
      put :update, params: update_params
      vehicle_traffic.reload
      expect(vehicle_traffic.count).to eq(120)
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    it "deletes the vehicle traffic" do
      expect {
        delete :destroy, params: { country_traffic_id: country_traffic.id, id: vehicle_traffic.id }
      }.to change(VehicleTypeTraffic, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end
  end
end
