json.pins do |json|
  json.array!(@recommend_pins) do |recommend_pin|
    json.image recommend_pin.pin.image_url
    json.description recommend_pin.description
    json.repin recommend_pin.counts
    json.board_id recommend_pin.board_id
    json.user_image recommend_pin.user.image_url
    json.user_name recommend_pin.user.fullname
    json.board_name recommend_pin.board.name
  end
end
