Rails.application.routes.draw do
  devise_for :users
  resources :games
  get 'games_as_json' => 'games#games_as_json', :as => :games_as_json
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'
end
