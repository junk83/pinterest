class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  def self.find_for_oauth(auth)
    user = User.where(provider: auth.provider, uid: auth.uid).first
    unless user
      user = User.create( first_name: auth.info.first_name,
                          last_name: auth.info.last_name,
                          provider: auth.provider,
                          uid: auth.uid,
                          email: auth.info.email,
                          gender: auth.extra.raw_info.gender,
                          password: Devise.friendly_token[0,20],
                          user_name: auth.uid,
                          age: auth.extra.raw_info.age
                        )
    end
     return user
  end
end
