class FollowUser < ApplicationRecord
  belongs_to :follower, class_name: "User"
  belongs_to :following, class_name: "User"
  # has_many :follow_pins, class_name: "Pin"
  validates :follower_id, presence: true
  validates :following_id, presence: true
end
