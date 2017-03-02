$(function() {
  /**
  * ページ内スクロール
  */
  var pageScroll = function(){
    if(location.pathname.match(/users\/\d+\/edit/)){

      var href = $(this).attr("href");
      var target = $(href == "#" || href === "" ? 'html' : href);
      var position = target.offset().top - 114;
      $("html, body").animate({scrollTop:position}, 'slow', "swing");
      return false;
    }
  };

  /**
  * 現在スクロール位置によるグローバルナビのアクティブ表示
  */

  // 配列宣言
  // ここにスクロールで点灯させる箇所のidを記述する
  // 数値は全て0でOK
  var array = {
    '#accountBasics': 0,
    '#profile': 0,
    '#notifications': 0,
    '#homefeedCustomization': 0,
    '#socialNetworks': 0,
    '#apps': 0
  };

  var $globalNavi = [];


  var scrollMenu = function() {
    if(location.pathname.match(/users\/\d+\/edit/)){

      // 各要素のスクロール値を保存
      for (var key in array) {
        if ($(key).offset()) {
          array[key] = $(key).offset().top - 10; // 数値丁度だとずれるので10px余裕を作る
          $globalNavi[key] = $('a[href="' + key + '"]').parent();
        }
      }

      // スクロールイベントで判定
      for (var key in array) {
        if ($(window).scrollTop() > array[key] - 114) {
          $('.toc li').each(function() {
            $(this).removeClass('selected');
          });
          $globalNavi[key].addClass('selected');
        }
      }
    }
  };

  /**
  * モーダルウインドウの表示
  */
  function changePassHTML(){
    var html =
    '<div class="ReactModalPortal">' +
      '<div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after-open">' +
        '<div class="ReactModal__Content ReactModal__Content--after-open UserChangePassword Module ReactModal__Content inModal modalHasClose" tabindex="-1">' +
          '<form class="standardForm" method="post" style="padding: 0px; margin: 0px;">' +
            '<h1>パスワードを変更する</h1>' +
            '<ul style="margin: 0px; border-radius: 0px; box-shadow: none;">' +
              '<li>' +
                '<h3>' +
                  '<label class="settingLabel">現在のパスワード</label>' +
                '</h3>' +
                '<div>' +
                  '<input type="password" class="oldPass" id="changePasswordOld" name="old" value="">' +
                  '<button aria-label="お忘れになりましたか？" class="Button Module hasText rounded borderless" type="button">' +
                    '<span class="buttonText">お忘れになりましたか？</span>' +
                  '</button>' +
                '</div>' +
              '</li>' +
              '<li>' +
                '<h3>' +
                  '<label class="settingLabel">新しいパスワード</label>' +
                '</h3>' +
                '<div>' +
                  '<input type="password" class="changePass" id="changePasswordNew" name="new" value="">' +
                '</div>' +
              '</li>' +
              '<li>' +
                '<h3>' +
                  '<label class="settingLabel">再入力してください</label>' +
                '</h3>' +
                '<div>' +
                  '<input type="password" class="confPass" id="changePasswordNewConfirm" name="new_confirm" value="">' +
                '</div>' +
              '</li>' +
            '</ul>' +
            '<div class="formFooter" style="border-top-left-radius: 0px; border-top-right-radius: 0px; box-shadow: none;">' +
              '<div class="formFooterButtons">' +
                '<button aria-label="キャンセル" class="Button Module btn hasText rounded cancelButton" type="button">' +
                  '<span class="buttonText">キャンセル</span>' +
                '</button>' +
                '<button aria-label="パスワードの変更" class="Button Module btn hasText rounded disabled updatePassButton primary" disabled="" type="button">' +
                  '<span class="buttonText">パスワードの変更</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</form>' +
          '<button class="Button Module borderless cancelButton closeModal inModal show" type="button">' +
            '<em></em>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    return html;
  }

  function completeHTML(){
    var html =
    '<div class="ReactModal__Content ReactModal__Content--after-open Module ReactModal__Content inModal modalHasClose ConfirmDialog" tabindex="-1">' +
      '<form class="standardForm" method="post" style="padding: 0px; margin: 0px;">' +
        '<h1>パスワードを変更しました！</h1>' +
        '<p class="body">パスワードを変更しました。</p>' +
        '<div class="formFooter" style="border-top-left-radius: 0px; border-top-right-radius: 0px; box-shadow: none;">' +
          '<div class="formFooterButtons">' +
            '<button aria-label="OK" class="Button Module cancelButton btn hasText rounded primary" type="button">' +
              '<span class="buttonText">OK</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</form>' +
      '<button class="Button Module borderless cancelButton closeModal inModal show" type="button">' +
        '<em></em>' +
      '</button>' +
    '</div>';

    return html;
  }

  var changePass = function(){
    $('body').addClass('ReactModal__Body--open');
    $('body').append(changePassHTML);

    // var current_scrollY = $(window).scrollTop();
    // $('.Modal__Overlay').css('display', 'flex');
    // // 背景を固定する
    // $('.UserSettingsPage').css({ position: 'fixed', width: '100%', top: -current_scrollY + 64 });
  };

  // パスワードの入力チェック処理
  var passValid = function(){
    var pass = $.trim($(this).val());
    if(pass.length !== 0){
      // 作成ボタンを有効化
      // $('.saveBoardButton, .updateBoardButton').removeClass('disabled');
      // $('.saveBoardButton, .updateBoardButton').removeAttr('disabled');
      // エラー表示を除去
      $(this).removeClass('hasError');
      $(this).parent('div').prev().find('.settingLabel').removeClass('hasError');
      $(this).closest('div').find('.formFieldMessage').remove();
    }else{
      // エラーメッセージを消す
      // $('.formFieldMessage').remove();
      // 作成ボタンを無効化
      // $('.saveBoardButton, .updateBoardButton').addClass('disabled');
      // $('.saveBoardButton, .updateBoardButton').attr('disabled');
      // エラー表示
      $(this).addClass('hasError');
      $(this).parent('div').prev().find('.settingLabel').addClass('hasError');
      $(this).closest('div').append('<p class="formFieldMessage formErrorMessage">必須</p>');
    }
  };

  // 新しいパスワードの長さチェック
  var newPassValid = function(){
    var pass = $.trim($(this).val());
    if(pass.length >= 6){
      // エラー表示を除去
      $(this).removeClass('hasError');
      $(this).parent('div').prev().find('.settingLabel').removeClass('hasError');
      $(this).closest('div').find('.formFieldMessage').remove();
    }else if(pass.length === 0){
      $(this).closest('div').find('.formFieldMessage:first').remove();
    }else{
      // エラー表示
      $(this).addClass('hasError');
      $(this).parent('div').prev().find('.settingLabel').addClass('hasError');
      $(this).closest('div').append('<p class="formFieldMessage formErrorMessage">短すぎます</p>');
    }
  };

  // 確認パスワードのチェック
  var confirmPassValid = function(){
    var conf_pass = $('.confPass').val();
    var pass = $('.changePass').val();

    if(conf_pass == pass){
      // エラー表示を除去
      $('.confPass').removeClass('hasError');
      $('.confPass').parent('div').prev().find('.settingLabel').removeClass('hasError');
      $('.confPass').closest('div').find('.formFieldMessage').remove();
    }else{
      // エラー表示を除去
      $('.confPass').closest('div').find('.formFieldMessage').remove();
      // エラー表示
      $('.confPass').addClass('hasError');
      $('.confPass').parent('div').prev().find('.settingLabel').addClass('hasError');
      $('.confPass').closest('div').append('<p class="formFieldMessage formErrorMessage">パスワードが一致しません</p>');
    }
  };

  // パスワード変更ボタンの活性化チェック
  var activeButton = function(){
    var current_pass = $('.oldPass').val();
    var new_pass = $('.changePass').val();
    var conf_pass = $('.confPass').val();

    // エラーが無く入力されていることをチェックしボタンを活性化する
    if(current_pass.length !== 0 &&
       new_pass.length !== 0 &&
       conf_pass.length !== 0 &&
       !$('input[type=password].hasError').length
     ){
      $('.updatePassButton').removeClass('disabled');
      $('.updatePassButton').removeAttr('disabled');
    }else{
      $('.updatePassButton').addClass('disabled');
      $('.updatePassButton').attr('disabled');
    }
  };

  // パスワード変更処理
  var updatePass = function(){
    var formData = new FormData();
    formData.append("user[current_password]", $('.oldPass').val());
    formData.append("user[password]", $(".changePass").val());
    formData.append("user[password_confirmation]", $(".confPass").val());


    $.ajax({
      url: '/users/update_password.json',
      type: 'PUT',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      if(data.status == '200'){
        // 変更完了モーダルを表示
        $('.ReactModal__Content').html(completeHTML);
      }else{
        // バリデーションエラー時はエラーメッセージを表示
        $('.oldPass').parent('div').prev().find('.settingLabel').addClass('hasError');
        $('.oldPass').closest('div').append('<p class="formFieldMessage formErrorMessage">' + data.error_message + '</p>');
      }
    })
    .fail(function() {
      console.log("error");
    });
  };

  /**
  * モーダルウインドウを閉じる
  */
  var modalClose = function(){
    $('.Modal__Overlay').css('display', 'none');
    // 背景の固定を解除する
    $('.UserSettingsPage').attr({style: ''});

    $('body').find('.modalHasClose').filter(":last").remove();
  };

  // ユーザー写真の変更処理
  var imageChange = function(e){
    var file = e.target.files[0],
        reader = new FileReader(),
        $imageWrapper = $(".profileImageWrapper");
        t = this;

    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }

    // ファイル読み込みが完了した際のイベント登録
    reader.onload = (function(file) {
      return function(e) {
        //既存のプレビューを削除
        $imageWrapper.empty();
        // .imageWrapperの領域の中にロードした画像を表示するimageタグを追加
        $imageWrapper.append($('<img>').attr({
                  src: e.target.result,
                  class: "profileImage",
              }));
      };
    })(file);

    reader.readAsDataURL(file);
  };

  // スクロールによるメニュー点灯処理
  $(document).on('click', 'a[href^="#"]', pageScroll);
  $(document).on('scroll', scrollMenu);

  // パスワード変更ボタン
  $(document).on('click', '.changePasswordButton', changePass);

  // パスワードの入力チェック
  $(document).on('keyup', '#changePasswordOld, #changePasswordNew, #changePasswordNewConfirm', passValid);

  // 新しいパスワード,確認パスワードの長さチェック
  $(document).on('keyup', '#changePasswordNew', newPassValid);

  // 確認パスワードの入力チェック
  $(document).on('keyup', '#changePasswordNew, #changePasswordNewConfirm', confirmPassValid);

  // パスワード変更ボタンの活性化チェック
  $(document).on('keyup', '#changePasswordOld, #changePasswordNew, #changePasswordNewConfirm', activeButton);

  // パスワード変更ボタンをクリック
  $(document).on('click', '.updatePassButton', updatePass);

  // $(document).on('click', '.modalScroller, .cancelButton', modalClose);

  // モーダルの範囲外クリックでモーダルを閉じる
  $(document).on('click', '.modalModule', function(e){
    e.stopPropagation();
  });

  // 性別でカスタムが選択された場合、性別入力フォームを表示
  $(document).on('click', 'input[type=radio]', function() {
    if ($('input[type=radio]:eq(2)').prop('checked')) {
        $('.formInlineCheckedSet:first').append('<input class="customGender" placeholder="性別を入力" type="text" value="" name="user[gender]" id="user_gender">');
    } else {
        $('.customGender').remove();
    }
});

  // ユーザー写真の変更
  $(document).on('change', 'input[type="file"]#user_image', function(e){
    imageChange(e);
  });


});
