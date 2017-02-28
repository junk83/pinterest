$(function(){
  var preName;
  var preFunc;

  // 検索結果の生成
  function resultListHTML(user_list, board_list){
    var user_list_html = '',
        board_list_html = '';

    // 検索結果が空の場合はリストの生成をしない
    if(user_list.length !== 0){
      user_list_html = userList(user_list);
    }
    if(board_list.length !== 0){
      board_list_html = boardList(board_list);
    }

    var html =
    '<ul class="results" style="max-height: 353px; overflow-y: auto;">' +
      user_list_html +
      board_list_html +
    '</ul>' +
  '</div>';

    return html;
  }

  // ユーザーの検索結果リスト生成
  function userList(users) {
    var html =
    '<li>' +
      '<a class="titleItem" style="background-color: inherit; cursor: default;">' +
        '<span class="typeaheadName">ユーザー</span>' +
      '</a>' +
    '</li>';

    $.each(users, function(index, user) {
      var last_name = user.last_name;
      if(user.last_name === null){
        last_name = '';
      }

      html +=
      '<li role="listitem">' +
        '<a class="user" href="/users/' + user.id + '">' +
          '<span class="typeaheadImg">' +
            '<img alt="" role="presentation" src="' + user.image + '">' +
          '</span>' +
          '<span class="typeaheadName">' +
            '<div class="label">' + user.first_name + " " + last_name + '</div>' +
            '<div class="subLabel">' + user.user_name + '</div>' +
          '</span>' +
        '</a>' +
      '</li>';
    });

    return html;
  }

  // ボードの検索結果リスト生成
  function boardList(boards) {
    var html =
    '<li>' +
      '<a class="titleItem" style="background-color: inherit; cursor: default;">' +
        '<span class="typeaheadName">ボード</span>' +
      '</a>' +
    '</li>';

    $.each(boards, function(index, board) {

      html +=
      '<li role="listitem">' +
        '<a class="board" href="/boards/' + board.id + '">' +
          '<span class="typeaheadImg">' +
            '<img alt="" role="presentation" src="' + board.board_image + '">' +
          '</span>' +
          '<span class="typeaheadName">' +
            '<div class="label">' + board.name + '</div>' +
            '<div class="subLabel">' + board.user_name + '</div>' +
          '</span>' +
        '</a>' +
      '</li>';
    });

    return html;
  }

  // インクリメンタルサーチ
  $(document).on('keyup', '.Input.field',
  function() {
    $('.Typeahead.guided').removeClass('open');
    $('.appContent').find('.typeaheadOverlay').remove();

    var name = $(this).val();

    // ユーザー検索ajax
    var ajaxUserSearch = function(){
      var defer = new $.Deferred();

      $.ajax({
        type: 'GET',
        url: '/users/search.json',
        data: {
          keyword: name
        },
        dataType: 'json',
        // Deferredの状態をresolveとする。
        // これによりコールバック関数は.done()となる。
        success: function(data){
          defer.resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Deferredの状態をrejectとする。
          // これによりコールバック関数は.fail()となる。
          defer.reject(jqXHR, textStatus, errorThrown);
        }
      });

      return defer.promise();
    };

    // ボード検索ajax
    var ajaxBoardSearch = function(){
      var defer = new $.Deferred();

      $.ajax({
        type: 'GET',
        url: '/boards/search.json',
        data: {
          keyword: name
        },
        dataType: 'json',
        // Deferredの状態をresolveとする。
        // これによりコールバック関数は.done()となる。
        success: function(data){
          defer.resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Deferredの状態をrejectとする。
          // これによりコールバック関数は.fail()となる。
          defer.reject(jqXHR, textStatus, errorThrown);
        }
      });

      return defer.promise();
    };

    // ユーザー検索ajaxとボード検索ajaxを並列処理する
    var ajaxSearch = function(){
      $.when(
        ajaxUserSearch(),
        ajaxBoardSearch())
        .done(function(data_1, data_2) {
          if(data_1[0] !== undefined || data_2[0] !== undefined){
            $('.appContent').append('<div class="typeaheadOverlay"></div>');
            $('.Typeahead.guided').addClass('open');
            $('.Typeahead.guided').html(resultListHTML(data_1, data_2));
          }
        })
        .fail(function() {
          console.log("通信エラーが発生しました。");
        });
    };

    // 0.5秒待ってからajaxを叩く
    if (name != preName && name.length !== 0){
      clearTimeout(preFunc);
      preFunc = setTimeout(ajaxSearch, 500);
    }
    preName = name;
  });

  // 検索フォームの領域外が押されたらメニューを閉じる
  $(document).on("click", '.AppBase', function(e) {
    if($(e.target).closest('.SearchForm').length === 0){
      $('.Typeahead.guided').removeClass('open');
      $('.appContent').find('.typeaheadOverlay').remove();
      $('.Input.field').val('');
    }
  });

});
