class Pin < ApplicationRecord
  mount_uploader :image, ImageUploader

  # belongs_to :user
  # belongs_to :board
  has_many :pinings, dependent: :destroy, inverse_of: :pin
  accepts_nested_attributes_for :pinings
  # belongs_to :active_follow_user, class_name: "User"
  # belongs_to :follow_pin, class_name: "User"
end
