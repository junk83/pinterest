class AddBoardRefAndUserRefToPins < ActiveRecord::Migration[5.0]
  def change
    add_reference :pins, :board, foreign_key: true
    add_reference :pins, :user, foreign_key: true
  end
end
