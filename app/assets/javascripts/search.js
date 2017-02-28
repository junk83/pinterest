$(function(){
  var preName;
  var preFunc;

  function resultListHTML(data){
    user_list = userList(data);
    var html =
    '<ul class="results" style="max-height: 353px; overflow-y: auto;">' +
      user_list +
      '<li>' +
        '<a class="titleItem" style="background-color: inherit; cursor: default;">' +
          '<span class="typeaheadName">ボード</span>' +
        '</a>' +
      '</li>' +
      '<li role="listitem">' +
        '<a class="board">' +
          '<span class="typeaheadImg">' +
            '<img alt="" role="presentation" src="https://s-media-cache-ak0.pinimg.com/upload/136445132399453218_board_thumbnail_2016-07-19-00-49-10_86597_60.jpg">' +
          '</span>' +
          '<span class="typeaheadName">' +
            '<div class="label">Tech &amp; Gadgets</div>' +
            '<div class="subLabel">mashable</div>' +
          '</span>' +
        '</a>' +
      '</li>' +
      '<li role="listitem">' +
        '<a class="board">' +
          '<span class="typeaheadImg">' +
            '<img alt="" role="presentation" src="https://s-media-cache-ak0.pinimg.com/upload/344032927723590206_board_thumbnail_2016-12-27-02-28-38_21384_60.jpg">' +
          '</span>' +
          '<span class="typeaheadName">' +
            '<div class="label">手作DIY</div>' +
            '<div class="subLabel">yinmengwu</div>' +
          '</span>' +
        '</a>' +
      '</li>' +
      '<li role="listitem">' +
        '<a class="board">' +
          '<span class="typeaheadImg">' +
            '<img alt="" role="presentation" src="https://s-media-cache-ak0.pinimg.com/upload/14566467483809475_board_thumbnail_2017-02-22-20-23-24_47752_60.jpg">' +
          '</span>' +
          '<span class="typeaheadName">' +
            '<div class="label">&#3898;&#3899; TEX-MEX Cuisine: Pin Your Best!</div>' +
            '<div class="subLabel">csenai</div>' +
          '</span>' +
        '</a>' +
      '</li>' +
    '</ul>' +
  '</div>';

    return html;
  }

  function userList(users) {
    var html =
    '<li>' +
      '<a class="titleItem" style="background-color: inherit; cursor: default;">' +
        '<span class="typeaheadName">ユーザー</span>' +
      '</a>' +
    '</li>';

    $.each(users, function(index, user) {
      html +=
      '<li role="listitem">' +
        '<a class="user" href="/users/' + user.id + '">' +
          '<span class="typeaheadImg">' +
            '<img alt="" role="presentation" src="' + user.image.url + '">' +
          '</span>' +
          '<span class="typeaheadName">' +
            '<div class="label">' + user.first_name + " " + user.last_name + '</div>' +
            '<div class="subLabel">' + user.user_name + '</div>' +
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

    var ajaxSearch = function(){
      $.ajax({
        type: 'GET',
        url: '/users/search.json',
        data: {
          keyword: name
        },
        dataType: 'json',
      })
      .done(function(data) {
        if(data[0] !== undefined){
          console.log(data);
          $('.appContent').append('<div class="typeaheadOverlay"></div>');
          $('.Typeahead.guided').addClass('open');
          $('.Typeahead.guided').html(resultListHTML(data));
        }
      })
      .fail(function() {
        console.log("通信エラーが発生しました。");
      });
    };

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
