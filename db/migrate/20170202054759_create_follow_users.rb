class CreateFollowUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :follow_users do |t|
      t.integer :follower_id
      t.integer :following_id

      t.timestamps
    end
    add_index :follow_users, :follower_id
    add_index :follow_users, :following_id
    add_index :follow_users, [:follower_id, :following_id], unique: true
  end
end
