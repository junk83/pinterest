class Pining < ApplicationRecord
  belongs_to :pin
  belongs_to :board
  belongs_to :user

  def counts
    Pining.where(pin_id: self.pin_id).count
  end
end
