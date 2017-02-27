class PiningsController < ApplicationController
  def edit
    pining = Pining.find(params[:id])
    boards = pining.user.boards

    # ボード名の配列を生成
    board_array = []
    boards.each do |board|
      board_array << { id: board.id, name: board.name }
    end

    render json: { pining: pining, board_name: pining.board.name, boards: board_array }
  end

  def update
    pining = Pining.find(params[:id])
    pining.update(pining_params)
    render json: { id: current_user.id }
  end

  def destroy
    pining = Pining.find(params[:id])
    pin_id = pining.pin_id
    pining.destroy

    # 他にピンを保存しているユーザーがいなければpinテーブルからデータを消す
    if Pining.where(pin_id: pin_id).empty?
      Pin.find(pin_id).destroy
    end

    render json: { id: current_user.id }
  end

  private
  def pining_params
    params.permit(:board_id, :description)
  end
end
