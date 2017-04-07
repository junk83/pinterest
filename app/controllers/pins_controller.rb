class PinsController < ApplicationController
  # require 'nokogiri'
  # require 'open-uri'

  def index
    # @pin = Pin.new
    # 通常の仕様
    # follow_users = current_user.following.ids
    # @recommend_pins = Pining.includes([:board, :user, :pin]).where(user_id: follow_users).order('created_at DESC').page(params[:page]).per(10)


    # 自分以外の全部のピンを表示(暫定の仕様)
    @recommend_pins = Pining.where.not(user_id: current_user.id).includes([:board, :user, :pin ]).order('created_at DESC').page(params[:page]).per(20)

    respond_to do |format|
      format.html
      format.json { render 'index', formats: 'json', handlers: 'jbuilder' }
    end

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

      # urlによるアップロードか否か判断
      if create_params[:image_url].match(/^http/)
        # urlアップロードの場合はurlをそのまま取得
        pin.remote_image_url = create_params[:image_url]
      else
        # urlアップロードでない場合はキャッシュを復元
        pin.image.retrieve_from_cache! create_params[:image_url]
      end

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

  def find
    url = params[:url]

    # urlが「http://」か「https://」で始まらない場合は「http://」をつける
    url = 'http://' << url unless url.start_with?('http://', 'https://')

    charset = nil
    @images = []

    begin
      html = open(url) do |f|
        charset = f.charset
        f.read
      end
    rescue => e
      puts e
      return
    end

    doc = Nokogiri::HTML.parse(html, nil, charset)

    # @image_list = doc.css('img').map{ |img| img.attr('src') }

    images = doc.css('img')

    # images = Nokogiri::HTML(open(url)).css('img')

    if images.present?
      images.each do |image|
        # unless image.nil?
          image_url = image.attr('src')

          unless image_url.nil?
            image_url = URI.join(url, image_url) if !image_url.match(/^http/)

            rm_image = Magick::ImageList.new(image_url)
            @images << image_url if rm_image.columns >= 236
          end
        # end
      end
    end

    respond_to do |format|
      format.html
      format.json { render json: @images }
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
