class BoardsController < ApplicationController

  def index

  end

  def boards
  end

  def create
    @board = Board.new(boards_params)
    if @board.save
      @boards = Board.where(user_id: current_user.id)
      render json: @boards
    else
      render json: { alert: "接続に問題があるか、ナビゲーションによりキャンセルされました。" }
    end
  end

  private

  def boards_params
    params.permit(:name).merge(user_id: current_user.id)
  end
end
