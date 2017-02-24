class PinsController < ApplicationController
  def index
    @pin = Pin.new
    follow_users = current_user.following.ids
    # @pins = Pin.includes([:board, :user]).where(user_id: follow_users).order('created_at DESC').limit(20)
    @recommend_pins = Pining.includes([:board, :user, :pin]).where(user_id: follow_users).order('created_at DESC').limit(20)
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
    @board = Board.find(create_params[:board_id])
    # 既に登録済みのピンであるか
    original_pin = Pin.where(image: create_params[:image_url]).first
    @pin = ''

    if original_pin.present?
      @pin = Pining.new(pin_id: original_pin.id, board_id: create_params[:board_id], user_id: current_user.id, description: create_params[:description])
    else
      # pinオブジェクトを生成
      @pin = Pin.new(pinings_attributes: [description: create_params[:description], user_id: current_user.id, board_id: create_params[:board_id]])
      # キャッシュを復元
      @pin.image.retrieve_from_cache! create_params[:image_url]
    end
    if @pin.save!
      # ピンの保存数
      repin = @pin.pinings.count
      # ボードのイメージ画像
      board_image = @board.pins.first.image_url(:thumb)
      # jsonで返す
      render json: { board: @board, pin: @pin , repin: repin, board_image: board_image }
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
