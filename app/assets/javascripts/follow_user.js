$(function() {

  // ユーザーフォロー処理
  var follow = function(){
    // ユーザー画面のurlからuser_idを取得
    var user_id = location.href.match(/\d+$/);

    // フォロー、フォロワー画面表示時はuser_idをリンクから取得
    if(location.href.match(/following$/) || location.href.match(/followers$/)){
      user_id = $(".userWrapper").attr('href').match(/\d+$/);
    }

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
        $('.selected .buttonText').text('フォローをやめる');
        $('.FollowButton.selected').attr({'aria-label': 'フォローをやめる'});
        $('.FollowButton.selected').addClass('dim followed');
      }else{
        $('.selected .buttonText').text('フォローする');
        $('.FollowButton.selected').attr({'aria-label': 'フォローする'});
        $('.FollowButton.selected').removeClass('dim followed');
      }
    })
    .fail(function() {
      console.log("error");
    });
  };


  // フォローボタンが押された場合
  $(document).on('click', '.UserFollowButton', follow);

  // ボタンをhoverしたときにselectedクラスを付与し、
  // hoverが外れたらselectedクラスを削除する
  $(document).on('ready turbolinks:load',function() {
    $(document).find('.UserFollowButton, .editBoardButton').on({
      'mouseenter':function(){
        $(this).addClass('selected');
      },
      'mouseleave':function(){
        $(this).removeClass('selected');
      }
    });
  });

});
