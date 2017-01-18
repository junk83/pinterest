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
end
