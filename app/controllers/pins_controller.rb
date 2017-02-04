class PinsController < ApplicationController
  def index
    @pin = Pin.new
    @pins = Pin.includes([:board, :user]).all.limit(20)
  end

  def pins
  end

  def upload
    @pin = Pin.new(upload_params)
    @boards = Board.where(user_id: current_user.id)
    if @pin.image.cache!
      render json: {
                    cash: @pin.image.cache_name,
                    boards: @boards
                   }
    else

    end
  end

  def create
    @pin = Pin.new(description: create_params[:description], user_id: current_user.id, board_id: create_params[:board_id])
    @pin.image.retrieve_from_cache! create_params[:image_url]
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
