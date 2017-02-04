class FollowUserController < ApplicationController
  def create
    @user = User.find(params[:following_id])
    current_user.follow_user(@user)
    render json: {}
  end

  def destroy
    @user = FollowUser.find(params[:id]).following
    current_user.unfollow_user(@user)
    render json: {}
  end
end
