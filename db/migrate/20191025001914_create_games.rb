class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.text :board, array: true, default: [
        ["♖", "♘", "♗", "♔", "♕", "♗",  "♘", "♖"],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜"]
      ]
      t.integer "user_id"
      t.boolean :black_teams_turn, default: false
      t.timestamps
    end
  end
end
