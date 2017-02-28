class BoardsController < ApplicationController

  def index

  end

  def show
    @board = Board.includes([:user, :pinings, :pins]).find(params[:id])
  end

  def create
    @board = Board.new(boards_params)
    if @board.save
      # @boards = Board.where(user_id: current_user.id)
      render json: @board
    else
      render json: { alert: "接続に問題があるか、ナビゲーションによりキャンセルされました。" }
    end
  end

  def edit
    board = Board.includes(:user).find(boards_params[:id])
    render json: { id: board.id,
                   name: board.name,
                   description: board.description,
                   user_id: board.user_id,
                   first_name: board.user.first_name,
                   image: board.user.image_url(:thumb)
                 }
  end

  def update
    board = Board.find(boards_params[:id])
    board.update(update_params)
    render json: { id: current_user.id }
  end

  def destroy
    Board.find(boards_params[:id]).destroy
    render json: { id: current_user.id }
  end

  def search
    # 検索文字列を前方一致検索
    name = "%#{params[:keyword]}%"
    boards = Board.includes(:user, :pinings).where('name LIKE ?', name).limit 5

    board_list = []

    boards.each do |board|

      # ボードに画像が登録されていない場合はデフォルトの画像を設定する
      board_image = ActionController::Base.helpers.asset_path("board_thumbnail.jpg")
      board_image = board.pins.first.image_url(:thumb) if board.pins.first.present?

      board_list << {
                      id: board.id,
                      name: board.name,
                      user_name: board.user.first_name + board.user.last_name,
                      board_image: board_image
                    }
    end
    render json: board_list
  end

  private

  def boards_params
    params.permit(:id, :name, :description).merge(user_id: current_user.id)
  end

  def update_params
    params.permit(:name, :description)
  end
end
