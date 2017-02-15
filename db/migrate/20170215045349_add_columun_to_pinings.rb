class AddColumunToPinings < ActiveRecord::Migration[5.0]
  def change
    add_column :pinings, :description, :text
  end
end
