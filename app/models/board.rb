class Board < ApplicationRecord
  belongs_to :user
  # has_many :pins
  has_many :pinings
end
