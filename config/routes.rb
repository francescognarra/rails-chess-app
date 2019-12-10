Rails.application.routes.draw do
  devise_for :users
  resources :games
  get 'index', to: 'static_pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#show'
end
