class CreatePinings < ActiveRecord::Migration[5.0]
  def change
    create_table :pinings do |t|
      t.references :pin, foreign_key: true
      t.references :board, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
