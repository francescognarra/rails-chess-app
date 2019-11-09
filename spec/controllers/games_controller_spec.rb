require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  describe "games#index action" do
    it "should successfully show the page" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      expect(response).to have_http_status(:success)
    end

    it "should require users to be logged in" do
      get :index
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "games#edit action" do
    it "should successfully show the edit page" do
      game = FactoryBot.create(:game)
      sign_in game.user
      get :edit, params: { id: game.id }
      expect(response).to have_http_status(:success)
    end

    it "should require users be logged in" do
      game = FactoryBot.create(:game)
      get :edit, params: { id: game.id }
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "games#create action" do
    it "should be able to create a new game" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: { game: { name: 'name' } }
      expect(response).to have_http_status(:found)
    end
  end

end
