class PinsController < ApplicationController
  def index
    @pin = Pin.new
    follow_users = current_user.following.ids
    # @pins = Pin.includes([:board, :user]).where(user_id: follow_users).order('created_at DESC').limit(20)
    @recommend_pins = Pining.includes([:board, :user, :pin]).where(user_id: follow_users).order('created_at DESC').limit(20)
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
    board = Board.find(create_params[:board_id])
    # 既に登録済みのピンであるか確認
    original_pin = Pin.where(image: create_params[:image_url]).first

    # 既に登録されているピンの場合はpiningオブジェクトを生成する
    if original_pin.present?
      pining = Pining.new(pin_id: original_pin.id, board_id: create_params[:board_id], user_id: current_user.id, description: create_params[:description])

      # piningを保存しjsonを返す
      if pining.save!
        # ピンの保存数
        repin = original_pin.pinings.count
        # ボードのイメージ画像
        board_image = board.pins.first.image_url(:thumb)
        # jsonで返す
        render json: { board: board, pin: original_pin , repin: repin, board_image: board_image, pining_id: pining.id, user: current_user }
      end
    else
      # 初めて登録されるピンの場合はpiningオブジェクトを含むpinオブジェクトを生成
      pin = Pin.new(pinings_attributes: [description: create_params[:description], user_id: current_user.id, board_id: create_params[:board_id]])
      # キャッシュを復元
      pin.image.retrieve_from_cache! create_params[:image_url]

      # ピンの保存しjsonを返す
      if pin.save!
        # ピンの保存数
        repin = pin.pinings.count
        # ボードのイメージ画像
        board_image = board.pins.first.image_url(:thumb)
        # jsonで返す
        render json: { board: board, pin: pin , repin: repin, board_image: board_image, pining_id: pin.pinings.first.id, user: current_user }
      end
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
