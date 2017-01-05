class Users::RegistrationsController < Devise::RegistrationsController

  def register
    @user = User.new(sign_up_params)
    @user.user_name = @user.email.split("@")[0]
    if @user.valid?
      render :register
    else
      render :new
    end
  end

  def create
    if params[:back]
      @user = User.new(sign_up_params)
      render :new
    else
      super
    end
  end
end
