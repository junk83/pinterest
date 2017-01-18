class UsersController < ApplicationController
  before_action :get_user, only: [:show, :edit]

  def show
  end

  def edit

  end

  def update
  end

  private

  def get_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :user_name, :gender, :image, :about, :location, :website_url)
  end
end
