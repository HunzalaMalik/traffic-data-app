Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :country_traffics do
        resources :vehicle_type_traffics
      end
    end
  end  
end
