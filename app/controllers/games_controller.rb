class GamesController < ApplicationController

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
    @game.update_attribute(:board, [
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      [nil, nil, nil, nil, nil, nil, nil, nil],
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
      [nil, nil, nil, nil, nil, nil, nil, nil],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['♜', '♞', '♝', '♚', '♛', '♝', '♞', '♜']
    ])
    redirect_to edit_game_path(@game)
  end

  def edit
    @game = Game.find(params[:id])
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end

end
