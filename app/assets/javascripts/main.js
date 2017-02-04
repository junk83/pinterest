$(function() {
  // メニュー表示判定フラグ
  var flag = 0;
  /**
  * ピン登録メニューの表示
  */
  var addPinOpen = function(){
    // ピン登録メニューにクラスを付与
    $('.PositionModule').addClass('hide positionFixed defaultCaret active positionModuleElement positionLeft slideIn');
    // 「+」ボタンをactiveにする
    $('.addPinFooter').addClass('active');
    // 「+」ボタンの位置を取得し、メニューの表示位置を指定する
    var position = $('.addPinFooter').offset();
    $('.PositionModule').css({ left: position.left - 232, top: position.top - 151 });
    // メニュー表示フラグを1にする
    flag = 1;
  };

  /**
  * ピン登録メニューを閉じる
  */
  var addPinClose = function(){
    $('.PositionModule').removeClass('active slideIn');
    $('.addPinFooter').removeClass('active');
    $('.PositionModule').attr('style', '');
    // メニュー表示フラグを0にする
    flag = 0;
  };

  /**
  * ボード選択メニューを表示
  */
  var selectBoardOpen = function(){
     $('.PinUploader').remove();
  };

  // 実行
  $(document).on('click', function(e){
    if(flag === 0 && $.contains($('.addButtonWrapper')[0], e.target)){
      addPinOpen();
    }else if(!$(e.target).closest('.addPinDropdown').length){
      addPinClose();
    }
  });

  $(document).on('change', '#pin_image', selectBoardOpen);
});
