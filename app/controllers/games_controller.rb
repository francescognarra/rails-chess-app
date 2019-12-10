class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :update, :destroy ]
  before_action :authenticate_user!

  def index
    games = Game.all
    render json: games.as_json()
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
    @game.update_attribute(:player_1, @game.user.email)
    redirect_to edit_game_path(@game)
  end

  def edit
    @game = Game.find(params[:id])
    if @game.player_1 != current_user.email && @game.player_2 == ''
      @game.update_attribute(:player_2, current_user.email)
    end
    if current_user.email != @game.player_1 && current_user.email != @game.player_2
      redirect_to games_path, alert: "Game is full, sorry"
    end
  end

  def update
    game = Game.find(params[:id])
    game.update_attribute(:board, board_param["board"])
    game.update_attribute(:black_teams_turn, !game.black_teams_turn)
    render json: game.as_json()
  end

  def destroy
    game = Game.find_by_id(params[:id])
    redirect_to index_path
    game.destroy if game
  end

  private

  def board_param
    params.require(:game)
  end

end
  