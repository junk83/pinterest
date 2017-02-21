class Board < ApplicationRecord
  belongs_to :user
  has_many :pins, through: :pinings
  has_many :pinings, dependent: :destroy
end
