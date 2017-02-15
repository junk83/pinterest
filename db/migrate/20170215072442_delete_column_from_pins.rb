class DeleteColumnFromPins < ActiveRecord::Migration[5.0]
  def change
    remove_column :pins, :description
    remove_foreign_key :pins, :users
    remove_index :pins, :user_id
    remove_reference :pins, :user
    remove_foreign_key :pins, :boards
    remove_index :pins, :board_id
    remove_reference :pins, :board
  end
end
