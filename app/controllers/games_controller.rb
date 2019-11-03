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
    new_board = []
    board_param.each do |row|
      row.each do |element|
        new_board.push(element)
      end
    end
    game.update_attribute(:board, new_board[1])
    render json: game.as_json()
  end

  private

  def board_param
    params.require(:game)
  end

  def game_params
    params.require(:game).permit(:name, :board)
  end

end
