require 'rails_helper'

RSpec.describe Api::V1::CountryTrafficsController, type: :controller do
  let!(:country_traffic) { create(:country_traffic) }

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).not_to be_empty
    end
  end

  describe "POST #create" do
    let(:valid_params) { { country_traffic: { country: "Germany", count: 400 } } }

    it "creates a new country traffic" do
      expect {
        post :create, params: valid_params
      }.to change(CountryTraffic, :count).by(1)
      
      expect(response).to have_http_status(:created)
    end
  end

  describe "PUT #update" do
    let(:update_params) { { id: country_traffic.id, country_traffic: { count: 500 } } }

    it "updates the country traffic" do
      put :update, params: update_params
      country_traffic.reload
      expect(country_traffic.count).to eq(500)
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    it "deletes the country traffic" do
      expect {
        delete :destroy, params: { id: country_traffic.id }
      }.to change(CountryTraffic, :count).by(-1)
      
      expect(response).to have_http_status(:no_content)
    end
  end
end
