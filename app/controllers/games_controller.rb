class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :update ]

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
    @game = current_user.games.create(game_params)
    redirect_to edit_game_path(@game)
  end

  def edit
    @game = Game.find(params[:id])
  end

  def update
    game = Game.find(params[:id])
    game.update_attributes(:name, :board)
    render json: game.as_json()
  end

  private

  def game_params
    params.require(:game).permit(:name, :board)
  end

end
