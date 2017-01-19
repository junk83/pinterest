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
  var modalOpen = function(){
    var current_scrollY = $(window).scrollTop();
    $('.Modal__Overlay').css('display', 'flex');
    // 背景を固定する
    $('.UserSettingsPage').css({ position: 'fixed', width: '100%', top: -current_scrollY + 64 });
  };

  /**
  * モーダルウインドウを閉じる
  */
  var modalClose = function(){
    $('.Modal__Overlay').css('display', 'none');
    // 背景の固定を解除する
    $('.UserSettingsPage').attr({style: ''});
  };

  // 実行
  $(document).on('click', 'a[href^="#"]', pageScroll);
  $(document).on('scroll', scrollMenu);
  $(document).on('click', '.changePasswordButton', modalOpen);
  $(document).on('click', '.cancelButton', modalClose);

});
