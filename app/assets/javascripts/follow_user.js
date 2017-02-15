$(function() {

  // ユーザーフォロー処理
  var follow = function(){
    var user_id = location.href.match(/\d+$/);
    var formData = new FormData();

    // フォロー済みか否かで処理を分ける
    var method;
    if($(this).hasClass('followed')){
      method = 'DELETE';
      formData.append('following_id', user_id);
    }else{
      method = 'POST';
      formData.append('following_id', user_id);
    }

    $.ajax({
      url: '/follow_users.json',
      type: method,
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      if(method == 'POST'){
        $('.buttonText').text('フォローをやめる');
        $('.FollowButton').attr({'aria-label': 'フォローをやめる'});
        $('.FollowButton').addClass('dim followed');
      }else{
        $('.buttonText').text('フォローする');
        $('.FollowButton').attr({'aria-label': 'フォローする'});
        $('.FollowButton').removeClass('dim followed');
      }
    })
    .fail(function() {
      console.log("error");
    });
  };


  // フォローボタンが押された場合
  $(document).on('click', '.UserFollowButton', follow);


});
