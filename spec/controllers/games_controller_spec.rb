require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  describe "games#new action" do
    it "should successfully show the page" do
      user = FactoryBot.create(:user)
      sign_in user
      get :new
      expect(response).to have_http_status(:success)
    end

    it "should require a user be logged in" do
      get :new
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

  describe "games#index action" do
    it "should successfully show the page" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      expect(response).to have_http_status(:success)
    end

    it "should require a user to be logged in" do
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

    it "should require a user be logged in" do
      game = FactoryBot.create(:game)
      get :edit, params: { id: game.id }
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "games#update action" do
    it "should allow boards to be updated" do
      game = FactoryBot.create(:game)
      sign_in game.user
      put :update, params: {id: game.id, game: { board: [
      ["♖", "♘", "♗", "♔", "♕", "♗",  "♘", "♖"],
        ['', "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♙",'','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜"]
      ]} }
      expect(response).to have_http_status(:success)
      game.reload
      expect(game.board[8][0]).to eq ''
      expect(game.board[16][0]).to eq "♙"
    end

    it "should require a user be logged in" do
      game = FactoryBot.create(:game)
      put :update, params: {id: game.id, game: { board: [
      ["♖", "♘", "♗", "♔", "♕", "♗",  "♘", "♖"],
        ['', "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♙",'','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜"]
      ]} }
      expect(response).to redirect_to new_user_session_path
      game.reload
      expect(game.board[1][0]).to eq "♙"
      expect(game.board[2][0]).to eq ''
    end
  end

  describe "games#destroy" do
    it "should work" do
      game = FactoryBot.create(:game)
      sign_in game.user
      delete :destroy, params: { id: game.id }
      game = Game.find_by_id(game.id)
      expect(game).to eq nil
    end
  end

end
