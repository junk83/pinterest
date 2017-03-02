$(function() {

  // 処理対象のボードid
  var board_id = "";

  // 新規ボード作成画面HTML生成(ピンアップロード画面にて)
  function boardNewHTML(){
    var html =
    '<div class="BoardCreate BoardEditBase Module multiSelect pinCreate simple" style="height: 100%;">' +
      '<form class="modalPinCreate" method="post">' +
        '<h1 class="createTitle">新規ボードを作成 </h1>' +
        '<ul>' +
          '<li>' +
            '<h3>' +
              '<label for="boardEditName" class="hasError">名前</label>' +
            '</h3>' +
            '<div>' +
              '<input id="boardEditName" class="boardEditName hasError" name="name" type="text" autofocus="" placeholder="例：「行きたい場所」「レシピ集」" value="">' +
            '</div>' +
          '</li>' +
          '<li class="secretToggleWrapper">' +
            '<h3>' +
             '<label for="secret">シークレット</label>' +
            '</h3>' +
            '<div>' +
              '<div class="Checkbox Module fancyToggle styledToggle">' +
                '<div class="slider"></div>' +
                '<p class="onText status">Yes</p>' +
                '<p class="offText status">No</p>' +
                '<input class="Checkbox Module" id="secret" name="secret" type="checkbox">' +
              '</div>' +
            '</div>' +
          '</li>' +
        '</ul>' +
        '<div class="formFooter">' +
          '<div class="formFooterButtons">' +
            '<button class=" Button Module btn cancelButton hasText rounded closePane" type="button">' +
              '<span class="buttonText">キャンセル </span>' +
            '</button>' +
            '<button class="Button Module btn hasText primary rounded saveBoardButton disabled" disabled="" type="submit" >' +
              '<span class="buttonText">作成 </span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</form>' +
    '</div>';

    return html;
  }

  // 新規ボード作成画面HTML生成(ボード一覧画面にて)
  function cardNewHTML(){
    var html =
    '<div class="ReactModalPortal">' +
      '<div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after-open">' +
        '<div class="ReactModal__Content ReactModal__Content--after-open BoardCreate BoardEditBase Module ReactModal__Content inModal modalHasClose" tabindex="-1">' +
          '<form class="standardForm" method="post">' +
            '<h1>新規ボードを作成</h1>' +
            '<ul>' +
              '<li>' +
                '<h3>' +
                  '<label class="" for="boardEditName">名前</label>' +
                '</h3>' +
                '<div>' +
                  '<input type="text" class="boardEditName " id="boardEditName" name="name" placeholder="例：「行きたい場所」「レシピ集」" value="">' +
                '</div>' +
              '</li>' +
              '<li class="secretToggleWrapper">' +
                '<h3>' +
                  '<label for="secret">シークレット</label>' +
                  '<a class="external learnMore learnAboutBoardInvites" href="#">詳細</a>' +
                '</h3>' +
                '<div>' +
                  '<label>' +
                    '<div class="Module Checkbox fancyToggle fancyToggle styledToggle">' +
                      '<div class="slider"></div>' +
                      '<p class="onText status">Yes</p>' +
                      '<p class="offText status">No</p>' +
                      '<input type="checkbox" class="Module Checkbox" id="secret" name="secret" value="on">' +
                    '</div>' +
                  '</label>' +
                '</div>' +
              '</li>' +
            '</ul>' +
            '<div class="formFooter">' +
              '<div class="formFooterButtons">' +
                '<button aria-label="キャンセル" class="cancelButton Button Module btn hasText rounded" id="cancelButton" type="button">' +
                  '<span class="buttonText">キャンセル</span>' +
                '</button>' +
                '<button aria-label="作成" class="saveBoardButton Button Module btn hasText rounded primary disabled"   disabled="" id="submitButton" type="button">' +
                  '<span class="buttonText">作成</span>' +
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

  // 新規ボード作成画面HTML生成(ボード一覧画面にて)
  function boardEditHTML(data){
    var description = (data.description !== null) ? data.description : "";

    var html =
    '<div class="ReactModalPortal">' +
      '<div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after-open">' +
        '<div class="ReactModal__Content ReactModal__Content--after-open BoardEdit BoardEditBase Module ReactModal__Content inModal modalHasClose" tabindex="-1">' +
          '<div>' +
            '<form class="standardForm" method="post">' +
              '<h1>' +
                '<span>' +
                  '<strong>ボードを編集</strong>' +
                '</span>' +
              '</h1>' +
              '<ul>' +
                '<li>' +
                  '<h3>' +
                    '<label class="" for="boardEditName">名前</label>' +
                  '</h3>' +
                  '<div>' +
                    '<input type="text" class="boardEditName " id="boardEditName" name="name" placeholder="例：「行きたい場所」「レシピ集」" value="' + data.name + '">' +
                  '</div>' +
                '</li>' +
                '<li class="descriptionWrapper">' +
                  '<h3>' +
                    '<label class="" for="boardEditDescription">説明</label>' +
                  '</h3>' +
                  '<div>' +
                    '<textarea class="boardEditDescription" id="boardEditDescription" name="description" placeholder="このボードについて">' + description + '</textarea>' +
                  '</div>' +
                '</li>' +
                '<li class="categoryWrapper">' +
                  '<h3>' +
                    '<label for="boardEditCategory">カテゴリ</label>' +
                  '</h3>' +
                  '<div>' +
                    '<div>' +
                      '<select class="Module Select" id="boardEditCategory" name="category">' +
                        '<option value="other">ボードの種類</option>' +
                        '<option value="art">アート</option>' +
                        '<option value="photography">アートフォト</option>' +
                        '<option value="outdoors">アウトドア</option>' +
                        '<option value="geek">アニメ・フィギュア</option>' +
                        '<option value="illustrations_posters">イラスト・ポスター</option>' +
                        '<option value="home_decor">インテリア</option>' +
                        '<option value="weddings">ウェディング</option>' +
                        '<option value="film_music_books">エンターテイメント</option>' +
                        '<option value="gardening">ガーデニング</option>' +
                        '<option value="science_nature">科学・自然</option>' +
                        '<option value="education">教育関連</option>' +
                        '<option value="architecture">建築物</option>' +
                        '<option value="kids">子供・子育て</option>' +
                        '<option value="cars_motorcycles">車・バイク</option>' +
                        '<option value="sports">スポーツ</option>' +
                        '<option value="products">生活雑貨</option>' +
                        '<option value="celebrities">セレブ・有名人</option>' +
                        '<option value="diy_crafts">DIY・ハンドメイド</option>' +
                        '<option value="design">デザイン</option>' +
                        '<option value="animals">動物・ペット</option>' +
                        '<option value="food_drink">フード・ドリンク</option>' +
                        '<option value="hair_beauty">ヘア・ビューティー</option>' +
                        '<option value="health_fitness">ヘルス・フィットネス</option>' +
                        '<option value="holidays_events">ホリデー・イベント</option>' +
                        '<option value="quotes">名言</option>' +
                        '<option value="mens_fashion">メンズファッション</option>' +
                        '<option value="humor">ユーモア</option>' +
                        '<option value="travel">旅行</option>' +
                        '<option value="history">歴史</option>' +
                        '<option value="womens_fashion">レディースファッション</option>' +
                        '<option value="other">その他</option>' +
                      '</select>' +
                    '</div>' +
                  '</div>' +
                '</li>' +
                '<li class="boardEditCover">' +
                  '<h3>カバー</h3>' +
                  '<div>' +
                    '<button aria-label="変更" class="boardCoverEditButton Button Module btn hasText rounded" type="button">' +
                      '<span class="buttonText">変更</span>' +
                    '</button>' +
                  '</div>' +
                '</li>' +
                '<li class="secretToggleWrapper">' +
                  '<h3>' +
                    '<label for="secret">シークレット</label>' +
                    '<a class="external learnMore learnAboutBoardInvites" href="#">詳細</a>' +
                  '</h3>' +
                  '<div>' +
                    '<label>' +
                      '<div class="Module Checkbox fancyToggle fancyToggle styledToggle">' +
                        '<div class="slider"></div>' +
                        '<p class="onText status">Yes</p>' +
                        '<p class="offText status">No</p>' +
                        '<input type="checkbox" class="Module Checkbox" id="secret" name="secret" value="on">' +
                      '</div>' +
                    '</label>' +
                  '</div>' +
                '</li>' +
                '<li class="boardCollaboratorsWrapper">' +
                  '<h3>' +
                    '<label>ボード参加者</label>' +
                    '<a class="external learnMore learnAboutBoardInvites" href="#">詳細</a>' +
                  '</h3>' +
                  '<div class="fieldWrapper">' +
                    '<div>' +
                      '<div class="BoardInviteForm">' +
                        '<div class="inviteWrapper">' +
                          '<div class="fillWidth" style="position: relative;">' +
                            '<div class="reactSocialTypeahead">' +
                              '<div>' +
                                '<div class="TypeaheadField userSelect inputContainer">' +
                                  '<input type="text" class="Input field collaboratorInviterTypeahead" placeholder="名前またはメールアドレス" value="">' +
                                '</div>' +
                                '<div class="Typeahead userSelect" style="z-index: 1000;">' +
                                  '<ul>' +
                                    '<li role="button" tabindex="0">' +
                                      '<div class="sendToEmail unclickable">' +
                                        '<a class="selectableEmailItem" role="button">' +
                                          '<div class="left">' +
                                            '<div class="icon typingEmail">' +
                                              '<em></em>' +
                                            '</div>' +
                                          '</div>' +
                                          '<div class="right">' +
                                            '<h4 class="title">を招待</h4>' +
                                            '<p class="subtitle">入力する</p>' +
                                          '</div>' +
                                        '</a>' +
                                      '</div>' +
                                    '</li>' +
                                    '<li role="button" tabindex="0">' +
                                      '<div class="socialConnect">' +
                                        '<a role="button">' +
                                          '<div class="left">' +
                                            '<div class="icon socialConnect-facebook">' +
                                              '<em></em>' +
                                            '</div>' +
                                          '</div>' +
                                          '<div class="right">' +
                                            '<h4 class="title">Facebook の友達を探す</h4>' +
                                          '</div>' +
                                        '</a>' +
                                      '</div>' +
                                    '</li>' +
                                    '<li role="button" tabindex="0">' +
                                      '<div class="socialConnect">' +
                                        '<a role="button">' +
                                          '<div class="left">' +
                                            '<div class="icon socialConnect-gplus">' +
                                              '<em></em>' +
                                            '</div>' +
                                          '</div>' +
                                          '<div class="right">' +
                                            '<h4 class="title">Google+ の友達を探す</h4>' +
                                          '</div>' +
                                        '</a>' +
                                      '</div>' +
                                    '</li>' +
                                    '<li role="button" tabindex="0">' +
                                      '<div class="socialConnect">' +
                                        '<a role="button">' +
                                          '<div class="left">' +
                                            '<div class="icon socialConnect-twitter">' +
                                              '<em></em>' +
                                            '</div>' +
                                          '</div>' +
                                          '<div class="right">' +
                                            '<h4 class="title">Twitter の友達を探す</h4>' +
                                          '</div>' +
                                        '</a>' +
                                      '</div>' +
                                    '</li>' +
                                    '<li role="button" tabindex="0">' +
                                      '<div class="socialConnect">' +
                                        '<a role="button">' +
                                          '<div class="left">' +
                                            '<div class="icon socialConnect-yahoo">' +
                                              '<em></em>' +
                                            '</div>' +
                                          '</div>' +
                                          '<div class="right">' +
                                            '<h4 class="title">Yahoo の友達を探す</h4>' +
                                          '</div>' +
                                        '</a>' +
                                      '</div>' +
                                    '</li>' +
                                  '</ul>' +
                                '</div>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                          '<button aria-label="招待" class="inviteButton Button Module btn hasText rounded" type="button">' +
                            '<span class="buttonText">招待</span>' +
                          '</button>' +
                        '</div>' +
                      '</div>' +
                      '<div class="boardEditCollaborators">' +
                        '<div class="Module User hasText thumb small">' +
                          '<a class="profileSource" data-element-type="64" href="/users/' + data.user_id + '">' +
                            '<div class="thumbImageWrapper">' +
                              '<div>' +
                                '<img alt="' + data.first_name + '" src="' + data.image + '" title="' + data.first_name + ' からの他のピン">' +
                              '</div>' +
                            '</div>' +
                            '<div class="subtitle">このボードの作成者はあなたです</div>' +
                          '</a>' +
                        '</div>' +
                        '<div></div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</li>' +
              '</ul>' +
              '<div class="formFooter">' +
                '<div class="formFooterDelete">' +
                  '<button aria-label="ボードを削除" class="deleteBoardButton Button Module btn hasText rounded" id="deleteBoardButton" type="button">' +
                    '<span class="buttonText">ボードを削除</span>' +
                  '</button>' +
                '</div>' +
                '<div class="formFooterButtons">' +
                  '<button aria-label="キャンセル" class="cancelButton Button Module btn hasText rounded" id="cancelButton" type="button">' +
                    '<span class="buttonText">キャンセル</span>' +
                  '</button>' +
                  '<button aria-label="保存" class="updateBoardButton Button Module btn hasText rounded primary" id="submitButton" type="button">' +
                    '<span class="buttonText">保存</span>' +
                  '</button>' +
                '</div>' +
              '</div>' +
            '</form>' +
          '</div>' +
          '<button class="Button Module borderless cancelButton closeModal inModal show" type="button">' +
            '<em></em>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    return html;
  }

  function confirmHTML() {
    var html =
    '<div class="ReactModalPortal">' +
      '<div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after-open">' +
        '<div class="ReactModal__Content ReactModal__Content--after-open ConfirmDialog Module ReactModal__Content inModal modalHasClose" tabindex="-1">' +
          '<form class="standardForm">' +
            '<h1>設定の変更</h1>' +
            '<div class="body">' +
              '<p>ボードとそのボードに保存されているピンを削除すると復元できません！</p>' +
            '</div>' +
            '<div class="formFooter">' +
              '<div class="formFooterButtons">' +
                '<button aria-label="キャンセル" class="cancelButton Button Module btn hasText rounded" type="button">' +
                  '<span class="buttonText">キャンセル</span>' +
                '</button>' +
                '<button aria-label="ボードを削除" class="confirm Button Module btn hasText rounded primary boardDelete" type="button">' +
                  '<span class="buttonText">ボードを削除</span>' +
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

  // 新規ボードの要素生成
  function itemHTML(data){
    var html =
    '<li class="item selected">' +
      '<div class="BoardLabel Module pinCreate">' +
        '<button class="Button Module btn hasIcon hasText isBrioFlat primary primaryOnHover repinSmall repinBtn rounded" type="button">' +
          '<em></em>' +
          '<span class="buttonText">保存</span>' +
        '</button>' +
        '<div class="boardImg emptyBoardImg"></div>' +
        '<span class="nameAndIcons">' +
          '<div class="BoardIcons Module pinCreate"></div>' +
          '<span class="name">' + data.name + '</span>' +
          '<input id="board_id" type="hidden" value="' + data.id + '">' +
        '</span>' +
      '</div>' +
    '</li>';

    return html;
  }

  // 新規ボード作成画面生成(ピンアップロード画面にて)
  var boardNew = function(){
    $('.right.pane').append(boardNewHTML).hide().fadeIn(1000);
  };

  // 新規ボード作成画面(ボード一覧画面にて)
  var cardNew = function(){
    $('body').addClass('ReactModal__Body--open');
    $('body').append(cardNewHTML);
  };

  // ボード作成処理
  var boardCreate = function(e){
    e.preventDefault();
    var flag = '0';
    var form = $('.modalPinCreate').get(0);
    // ボード一覧画面の場合
    if($(this).parents().hasClass('standardForm')) {
      form = $('.standardForm').get(0);
      flag = '1';
    }
    var formData = new FormData(form);

    $.ajax({
      url: '/boards.json',
      type: 'POST',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      $('.BoardCreate').remove();
      // ボード一覧画面の場合はボード詳細画面に遷移させる
      if(flag === '1') {
        window.location.href = "/boards/" + data.id;
      }else{
        // 作成したボードをリストに追加
        $('.allBoards .sectionItems').append(itemHTML(data));
        // 一番下にスクロール
        $('.SelectList').scrollTop($('.SelectList')[0].scrollHeight);
        // 作成したボードを選択
        setTimeout(function(){
          $('.allBoards .sectionItems li.item:last').trigger('click');
        }, 1000);
      }
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ボード名の入力チェック
  var nameValid = function(){
    var name = $.trim($(this).val());
    if(name.length !== 0){
      // 作成ボタンを有効化
      $('.saveBoardButton, .updateBoardButton').removeClass('disabled');
      $('.saveBoardButton, .updateBoardButton').removeAttr('disabled');
      // エラー表示を除去
      $('label[for="boardEditName"]').removeClass('hasError');
      $('.boardEditName').removeClass('hasError');
      $('.formFieldMessage').remove();
    }else{
      // エラーメッセージを消す
      $('.formFieldMessage').remove();
      // 作成ボタンを無効化
      $('.saveBoardButton, .updateBoardButton').addClass('disabled');
      $('.saveBoardButton, .updateBoardButton').attr('disabled');
      // エラー表示
      $('label[for="boardEditName"]').addClass('hasError');
      $('.boardEditName').addClass('hasError');
      $('.boardEditName').after('<p class="formFieldMessage formErrorMessage">ボードの名前は必須事項です。</p>');
    }
  };

  // ボード編集画面
  var boardEdit = function(){
    var board_path;
    if(location.pathname.match(/boards/)){
      board_path = location.pathname.match(/\/boards\/\d+/)[0];
    }else{
      board_path = $('.selected').siblings('.boardLinkWrapper').attr('href');
    }

    board_id = board_path.replace(/\/boards\//, "");

    $.ajax({
      url: '/boards/' + board_id + '/edit.json',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(data) {
      $('body').addClass('ReactModal__Body--open');
      $('body').append(boardEditHTML(data));
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ボード削除確認画面
  var boardDeleteConfirm = function(){
    $('body').append(confirmHTML);
  };

  // ボード削除処理
  var boardDelete = function(){
    $.ajax({
      url: '/boards/' + board_id + '.json',
      type: 'DELETE',
      dataType: 'json',
    })
    .done(function(data) {
      window.location.href = "/users/" + data.id;
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ボード更新処理
  var boardUpdate = function(){
    var formData = new FormData();
    formData.append("name", $("#boardEditName").val());
    formData.append("description", $("#boardEditDescription").val());

    $.ajax({
      url: '/boards/' + board_id + '.json',
      type: 'PUT',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      location.reload();
    })
    .fail(function() {
      console.log("error");
    });
  };



  // ピンアップロード画面で「新規ボードを作成」ボタンが押された場合
  $(document).on('click', '.createBoard', boardNew);

  // ボード一覧画面で「新規ボードを作成」ボタンが押された場合
  $(document).on('click', '.BoardCreateRep', cardNew);

  // 「作成」ボタンが押された場合
  $(document).on('click', '.saveBoardButton', boardCreate);

  // 「キャンセル」ボタンが押された場合
  $(document).on('click', '.cancelButton', function(){
    // ピンアップロード時の新規ボード作成のキャンセル
    if($(this).hasClass('closePane')){
      $('.BoardCreate.BoardEditBase.Module.multiSelect.pinCreate.simple').fadeOut('fast', function(){
        $(this).remove();
      });
    }else if($(this).hasClass('redirect')){
      // ユーザー編集のキャンセルはユーザー詳細画面へ遷移させる
      var url = $('.UserNavigateButton').attr('href');
      window.location.href = url;
    }else{
      $('.BoardCreate').remove();
      $('body').removeClass('ReactModal__Body--open noScroll');
      $('body').find('.ReactModalPortal').filter(":last").remove();
      $('.modalHasClose').remove();
    }
    // ユーザー編集画面の場合はユーザー詳細画面へ遷移
    // if(location.pathname.match(/\/users\/\d+\/edit/)){
    //   var url = $('.UserNavigateButton').attr('href');
    //   window.location.href = url;
    // }
  });

  // ボード名の入力チェック
  $(document).on('keyup', '.boardEditName', nameValid);

  // 「編集」ボタンが押された場合
  $(document).on('click', '.editBoardButton, .boardEditButton', boardEdit);

  // ボード編集画面で「ボード削除」ボタンが押された場合
  $(document).on('click', '.deleteBoardButton', boardDeleteConfirm);

  // ボード削除確認画面で「ボード削除」ボタンが押された場合
  $(document).on('click', '.confirm.Button.boardDelete', boardDelete);

  // ボード編集画面で「保存」ボタンが押された場合
  $(document).on('click', '.updateBoardButton', boardUpdate);

});
