class UsersController < ApplicationController
  before_action :get_user
  layout 'profile', except: :edit

  def show
    @boards = Board.includes([:pinings, :pins]).where(user_id: params[:id])
  end

  def edit
    if @user.gender != 'male' && @user.gender != 'female'
      @checked = true
    end
  end

  def update
    if @user.update(user_params)
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  def update_password
    if @user.update_with_password(user_params)
      sign_in(@user, bypass: true)
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  def boards
    redirect_to action: :show
  end

  def pins
    @pinings = Pining.includes([:pin, :board]).where(user_id: params[:id])
  end

  def followers
    @followers = @user.followers
  end

  def following
    @followings = @user.following
  end

  private

  def get_user
    # @user = User.find(current_user)
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :user_name, :gender, :image, :about, :location, :website_url, :current_password, :password, :password_confirmation)
  end
end
