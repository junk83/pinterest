class AddColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string
    add_column :users, :sex, :integer
    add_column :users, :custom_sex, :string
    add_column :users, :age, :integer
    add_column :users, :user_name, :string, null: false
  end
end
