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

  private

  def boards_params
    params.permit(:id, :name, :description).merge(user_id: current_user.id)
  end

  def update_params
    params.permit(:name, :description)
  end
end
