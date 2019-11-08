require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  describe "games#index action" do
    it "should successfully show the page" do
      user = User.create(
        email:                 'fakeuser@gmail.com',
        password:              'secretPassword',
        password_confirmation: 'secretPassword'
      )
      sign_in user
      get :index
      expect(response).to have_http_status(:success)
    end

    it "should require users to be logged in" do
      get :index
      expect(response).to redirect_to new_user_session_path
    end
  end

end
