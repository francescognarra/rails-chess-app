class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :update, :destroy ]
  before_action :authenticate_user!

  def index
    @game = Game.all
  end

  def new
    @game = Game.new
  end

  def show
    game = Game.find(params[:id])
    render json: game.as_json()
  end

  def create
    @game = current_user.games.create()
    redirect_to edit_game_path(@game)
  end

  def edit
    @game = Game.find(params[:id])
  end

  def update
    game = Game.find(params[:id])
    game.update_attribute(:board, board_param["board"])
    render json: game.as_json()
  end

  def destroy
    game = Game.find_by_id(params[:id])
    redirect_to root_path
    game.destroy
  end

  private

  def board_param
    params.require(:game)
  end

end
  