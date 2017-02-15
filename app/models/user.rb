class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  mount_uploader :image, ImageUploader

  has_many :boards
  # has_many :pins
  has_many :pinings

  # 能動的関係(フォローする)に対して1対多の関連付け
  has_many :active_follow_users, class_name: "FollowUser", foreign_key: "follower_id", dependent: :destroy
  # 受動的関係(フォローされる)に対して1対多の関連付け
  has_many :passive_follow_users, class_name: "FollowUser", foreign_key: "following_id", dependent: :destroy
  # followingの関連付け
  has_many :following, through: :active_follow_users
  # followersの関連付け
  has_many :followers, through: :passive_follow_users

  # has_many :follow_pins, through: :active_follow_users

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

  # ユーザーをフォローする
  def follow_user(other_user)
    active_follow_users.create(following_id: other_user.id)
  end

  # ユーザーをアンフォローする
  def unfollow_user(other_user)
    active_follow_users.find_by(following_id: other_user.id).destroy
  end

  # 現在のユーザーがフォローしてたらtrueを返す
  def following_user?(other_user)
    following.include?(other_user)
  end
end
