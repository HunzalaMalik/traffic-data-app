module Api
  module V1
    class VehicleTypeTrafficsController < Api::V1::ApplicationController
      before_action :set_country_traffic, only: [:index, :create]
      before_action :set_vehicle_traffic, only: [:update, :destroy]

      def index
        render json: @country_traffic.vehicle_type_traffics
      end

      def create
        vehicle_traffic = @country_traffic.vehicle_type_traffics.new(vehicle_traffic_params)
        if vehicle_traffic.save
          render json: vehicle_traffic, status: :created
        else
          render json: { error: vehicle_traffic.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @vehicle_traffic.update(vehicle_traffic_params)
          render json: @vehicle_traffic
        else
          render json: { error: @vehicle_traffic.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @vehicle_traffic.destroy
        head :no_content
      end

      private

      def set_country_traffic
        @country_traffic = CountryTraffic.find(params[:country_traffic_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "CountryTraffic not found" }, status: :not_found
      end

      def set_vehicle_traffic
        @vehicle_traffic = VehicleTypeTraffic.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "VehicleTraffic not found" }, status: :not_found
      end

      def vehicle_traffic_params
        params.require(:vehicle_type_traffic).permit(:vehicle_type, :count)
      end
    end
  end
end
