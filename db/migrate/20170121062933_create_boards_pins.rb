class CreateBoardsPins < ActiveRecord::Migration[5.0]
  def change
    create_table :boards_pins do |t|
      t.references :board, foreign_key: true
      t.references :pin, foreign_key: true
      t.timestamps
    end
  end
end
