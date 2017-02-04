class AddFourColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :image, :string
    add_column :users, :about, :text
    add_column :users, :location, :string
    add_column :users, :website_url, :string
  end
end
