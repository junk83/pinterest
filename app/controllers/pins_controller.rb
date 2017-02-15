class PinsController < ApplicationController
  def index
    @pin = Pin.new
    follow_users = current_user.following.ids
    @pins = Pin.includes([:board, :user]).where(user_id: follow_users).order('created_at DESC').limit(20)
  end

  def pins
  end

  def upload
    @boards = Board.where(user_id: current_user.id)
    if request.post?
      @pin = Pin.new(upload_params)
      if @pin.image.cache!
        render json: {
                      cash: @pin.image.cache_name,
                      boards: @boards
                     }
      else

      end
    else
      render json: { boards: @boards }
    end
  end

  def create
    original_pin = Pin.where(image: create_params[:image_url]).first
    @pin = Pin.new(description: create_params[:description], user_id: current_user.id, board_id: create_params[:board_id])
    if original_pin.present?
      @pin.image = original_pin.image.file
    else
      @pin.image.retrieve_from_cache! create_params[:image_url]
    end
    if @pin.save!
      render json: { status: 200 }
    else
    end
  end

  private

  def upload_params
    params.permit(:image)
  end

  def create_params
    params.permit(:image_url, :description, :board_id, :format)
  end
end
