class CreatePins < ActiveRecord::Migration[5.0]
  def change
    create_table :pins do |t|
      t.text :description
      t.string :image, null: false
      t.timestamps
    end
  end
end
