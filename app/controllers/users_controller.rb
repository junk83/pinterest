class UsersController < ApplicationController
  before_action :get_user, except: :search
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
    @pinings = Pining.includes([:pin, :board]).where(user_id: params[:id]).order('id DESC')
  end

  def followers
    @followers = @user.followers
  end

  def following
    @followings = @user.following
  end

  def search
    # 検索文字列を前方一致検索
    name = "%#{params[:keyword]}%"
    users = User.where('first_name LIKE ? or last_name LIKE ?', name, name).limit 5

    user_list = []

    users.each do |user|

      # ユーザー画像がない場合はデフォルトの画像を設定する
      user_image = ActionController::Base.helpers.asset_path("default_30.png")
      if user.image_url(:thumb).present?
        user_image = user.image_url(:thumb)
      end

      user_list << {
                     id: user.id,
                     image: user_image,
                     first_name: user.first_name,
                     last_name: user.last_name,
                     user_name: user.user_name
                   }
    end

    render json: user_list
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
