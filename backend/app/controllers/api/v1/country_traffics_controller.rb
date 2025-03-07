module Api
  module V1
    class CountryTrafficsController < Api::V1::ApplicationController
      before_action :set_country_traffic, only: [:update, :destroy]

      def index
        countries = CountryTraffic.includes(:vehicle_type_traffics).order(:id)
        render json: countries.as_json(include: :vehicle_type_traffics)
      end
      
      def create
        country_traffic = CountryTraffic.new(country_traffic_params)
        if country_traffic.save
          render json: country_traffic, status: :created
        else
          render json: { error: country_traffic.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @country_traffic.update(country_traffic_params)
          render json: @country_traffic
        else
          render json: { error: @country_traffic.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @country_traffic.destroy
        head :no_content
      end

      private

      def set_country_traffic
        @country_traffic = CountryTraffic.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "CountryTraffic not found" }, status: :not_found
      end

      def country_traffic_params
        params.require(:country_traffic).permit(:country, :count)
      end
    end
  end
end
