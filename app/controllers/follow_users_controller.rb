class FollowUsersController < ApplicationController
  def create
    @user = User.find(params[:following_id])
    current_user.follow_user(@user)
    render json: {}
  end

  def destroy
    following_user = current_user.active_follow_users.find_by(following_id: params[:following_id])
    user = FollowUser.find(following_user).following
    current_user.unfollow_user(user)
    render json: {}
  end
end
