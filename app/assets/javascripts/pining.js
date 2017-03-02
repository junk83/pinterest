$(function() {
  // 処理対象のpining_id
  var pining_id = '';

  function pinEditHTML(data, pin_image){
    // 説明文がundefの場合
    var description = (data.pining.description !== undefined) ? data.pining.description : "";

    // ボードリストを生成
    var item_list = itemList(data.boards);

    var html =
    '<div class="Modal Module modalHasClose absoluteCenter show">' +
      '<div class="modalMask show"></div>' +
      '<div class="modalScroller">' +
        '<div class="modalContainer show">' +
          '<span class="positionModuleCaret"></span>' +
          '<div class="modalContent">' +
            '<div class="modalModule">' +
              '<div class="Module PinEdit inModal">' +
                '<div class="Module PinForm showLink" data-component-type="MODAL_REPIN">' +
                  '<form class="standardForm" method="post">' +
                    '<h1 class="pinFormHeader">このピンを編集</h1>' +
                    '<div class="Module PinPreview">' +
                      '<img src="' + pin_image + '" class="pinPreviewImg" data-load-state="pending">' +
                    '</div>' +
                    '<ul>' +
                      '<li class="boardWrapper">' +
                        '<h3>' +
                          '<label>ボード</label>' +
                        '</h3>' +
                        '<div>' +


                        '<div class="Module Dropdown2">' +
                          '<div class="BoardPicker Module Picker compact inPopover">' +
                            '<div class="top">' +
                              '<button class="Button Module btn createButton hasText rounded disabled" type="button" disabled="disabled">' +
                                '<span class="buttonText">作成 </span>' +
                              '</button>' +
                              '<div class="nameWrapper">' +
                                '<div class="searchFilterInputIcon"></div>' +
                                '<label>' +
                                  '<span class="visuallyHidden">検索</span>' +
                                  '<input autocomplete="off" class="Input Module name" name="name" placeholder="検索">' +
                                '</label>' +
                              '</div>' +
                            '</div>' +
                            '<div class="selectionBody">' +
                              '<div class="Module SelectList compact" tabindex="0">' +
                                '<div class="sections">' +
                                  // '<ul class="section ">' +
                                  //   '<li class="sectionHeading">' +
                                  //     '<div class="Label Module">最近ピンを追加したボード </div>' +
                                  //   '</li>' +
                                  //   '<ul class="sectionItems">' +
                                  //     '<li class="item">' +
                                  //       '<div class="BoardLabel Module compact">' +
                                  //         '<span class="nameAndIcons">' +
                                  //           '<div class="BoardIcons Module pinCreate"></div>' +
                                  //           '<span class="name">test</span>' +
                                  //         '</span>' +
                                  //       '</div>' +
                                  //     '</li>' +
                                  //   '</ul>' +
                                  // '</ul>' +
                                  '<ul class="section ">' +
                                    '<li class="sectionHeading">' +
                                      '<div class="Label Module">すべてのボード </div>' +
                                    '</li>' +
                                    '<ul class="sectionItems">' +
                                      item_list +
                                      // '<li class="item">' +
                                      //   '<div class="BoardLabel Module compact">' +
                                      //     '<span class="nameAndIcons">' +
                                      //       '<div class="BoardIcons Module pinCreate"></div>' +
                                      //       '<span class="name">test</span>' +
                                      //     '</span>' +
                                      //   '</div>' +
                                      // '</li>' +
                                      // '<li class="item">' +
                                      //   '<div class="BoardLabel Module compact">' +
                                      //     '<span class="nameAndIcons">' +
                                      //       '<div class="BoardIcons Module pinCreate"></div>' +
                                      //       '<span class="name">ボード</span>' +
                                      //     '</span>' +
                                      //   '</div>' +
                                      // '</li>' +
                                    '</ul>' +
                                  '</ul>' +
                                  '<ul class="section ">' +
                                    '<ul class="sectionItems">' +
                                      '<li class="item hidden">' +
                                        '<div class="Module PickerItemCreate normal">' +
                                          '<span class="icon"></span>' +
                                          '<span class="createLabel">作成:</span>' +
                                          '<span class="createName"></span>' +
                                        '</div>' +
                                      '</li>' +
                                    '</ul>' +
                                  '</ul>' +
                                '</div>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +


                          '<button class="  BoardPickerDropdownButton Button DropdownButton Module btn rounded" type="button">' +
                            '<span class="downArrow"></span>' +
                            '<div class="BoardLabel Module compact">' +
                              '<span class="nameAndIcons">' +
                                '<div class="BoardIcons Module pinCreate"></div>' +
                                '<span class="name" id="' + data.pining.board_id + '">' + data.board_name + '</span>' +
                              '</span>' +
                            '</div>' +
                          '</button>' +
                        '</div>' +
                      '</li>' +
                      '<li>' +
                        '<h3>' +
                          '<label for="pinFormDescription">説明</label>' +
                        '</h3>' +
                        '<div>' +
                          '<div class="Field Module TextField">' +
                            '<textarea id="pinFormDescription" name="description" class="content" placeholder="このピンの説明を入力...">' + description + '</textarea>' +
                          '</div>' +
                        '</div>' +
                      '</li>' +
                      '<li>' +
                        '<h3>' +
                          '<label for="pinFormLink">ウェブサイト</label>' +
                        '</h3>' +
                        '<div>' +
                          '<input type="text" name="link" id="pinFormLink" value="">' +
                        '</div>' +
                      '</li>' +
                      '<li class="placeWrapper">' +
                        '<h3>' +
                          '<label>場所</label>' +
                        '</h3>' +
                        '<div>' +
                          '<input type="hidden" class="pinPlaceId" value="">' +
                          '<div class="Module PlaceSelector">' +
                            '<div class="placeFieldWrapper">' +
                              '<em class="searchIcon"></em>' +
                              '<div class="Module TypeaheadField addPlaceToPinForm addPlaceToPinFormField">' +
                                '<input autocomplete="off" class="Input Module field" name="q" placeholder="名前と所在地を入力してください。" type="text">' +
                                '<span class="typeaheadCaret"></span>' +
                                '<div class="Module Typeahead addPlaceToPinForm addPlaceToPinFormField">' +
                                  '<ul class="results" data-component-type="35"></ul>' +
                                '</div>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                          '<button class="Button Module borderless hasText removePlaceButton hidden" data-element-type="168" type="button">' +
                            '<span class="buttonText">場所を削除 </span>' +
                          '</button>' +
                          '<div>' +
                            '<a target="_blank" href="#">詳細</a>' +
                          '</div>' +
                        '</div>' +
                      '</li>' +
                    '</ul>' +
                    '<div class="formFooter">' +
                      '<div class="formFooterDelete">' +
                        '<button class="Button Module btn deletePinButton hasText rounded" type="button">' +
                          '<span class="buttonText">ピンを削除 </span>' +
                        '</button>' +
                      '</div>' +
                      '<div class="formFooterButtons">' +
                        '<button class=" Button Module btn cancelButton hasText rounded" type="button">' +
                          '<span class="buttonText">キャンセル </span>' +
                        '</button>' +
                        '<button class="Button Module btn hasText primary rounded savePinButton" type="button">' +
                          '<span class="buttonText">保存 </span>' +
                        '</button>' +
                      '</div>' +
                    '</div>' +
                  '</form>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button class="Button Module borderless cancelButton closeModal inModal  hasIcon show" type="button">' +
              '<em></em>' +
              '<span class="accessibilityText">閉じる</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    return html;
  }

  // ボードのプルダウンメニューのリスト生成
  function itemList(boards){
    var html = '';
    $.each(boards, function(index, elem){
      html +=
      '<li class="item">' +
        '<div class="BoardLabel Module compact">' +
          '<span class="nameAndIcons">' +
            '<div class="BoardIcons Module pinCreate"></div>' +
            '<span class="name" id="' + elem.id + '">' + elem.name + '</span>' +
          '</span>' +
        '</div>' +
      '</li>';
    });

    return html;
  }

  // ピン削除確認画面生成
  function confirmHTML() {
    var html =
    '<div class="ReactModalPortal">' +
      '<div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after-open">' +
        '<div class="ReactModal__Content ReactModal__Content--after-open ConfirmDialog Module ReactModal__Content inModal modalHasClose" tabindex="-1">' +
          '<form class="standardForm">' +
            '<h1>設定の変更</h1>' +
            '<div class="body">' +
              '<p>ピンを削除すると復元できません。</p>' +
            '</div>' +
            '<div class="formFooter">' +
              '<div class="formFooterButtons">' +
                '<button aria-label="キャンセル" class="cancelButton Button Module btn hasText rounded" type="button">' +
                  '<span class="buttonText">キャンセル</span>' +
                '</button>' +
                '<button aria-label="ピンを削除" class="confirm Button Module btn hasText rounded primary pinDelete" type="button">' +
                  '<span class="buttonText">ピンを削除</span>' +
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

  // ピン編集画面を生成
  var pinEdit = function(){
    pining_id = $(this).children('#pining_id').attr('value');
    var pin_image = $(this).parent().siblings('.pinHolder').find('.pinImg').attr('src');

    $.ajax({
      url: '/pinings/' + pining_id + '/edit.json',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(data) {
      $('body').addClass('noScroll');
      $('.ModalManager').append(pinEditHTML(data, pin_image));
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ピン削除確認画面
  var pinDeleteConfirm = function(){
    $('body').append(confirmHTML);
  };

  // ピン削除処理
  var pinDelete = function(){
    $.ajax({
      url: '/pinings/' + pining_id + '.json',
      type: 'DELETE',
      dataType: 'json',
    })
    .done(function(data) {
      // window.location.href = "/users/" + data.id + "/pins";
      location.reload();
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ピン更新処理
  var pinUpdate = function(){
    var formData = new FormData();
    formData.append("board_id", $(".BoardPickerDropdownButton .name").attr('id'));
    formData.append("description", $("#pinFormDescription").val());


    $.ajax({
      url: '/pinings/' + pining_id + '.json',
      type: 'PUT',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      // window.location.href = "/users/" + data.id + "/pins";
      location.reload();
    })
    .fail(function() {
      console.log("error");
    });
  };




  // ピン一覧画面でペンマーク(編集)ボタンが押された場合
  $(document).on('click', '.editPin', pinEdit);

  // ピン編集画面でボードの表示領域が押された場合
  $(document).on('click', '.BoardPickerDropdownButton', function(){
    $('.Dropdown2').addClass('visible');
  });

  // ボードのプルダウンメニューの領域外が押されたらメニューを閉じる
  $(document).on("click", '.modalModule', function(e) {
    if($(e.target).closest('.BoardPickerDropdownButton').length === 0){
      if ( $('.Dropdown2').hasClass('visible') ){
        if ( $(e.target).closest('.Dropdown2').length === 0){
          $('.Dropdown2').removeClass('visible');
        }
      }
    }
  });

  // ボードのプルダウンメニューでボードを選択した場合
  $(document).on('click', '.Dropdown2 .item', function(){
    // プルダウンメニューを消す
    $('.Dropdown2').removeClass('visible');
    // ボード名を書き換える
    name = $('.item:hover').find('span').html();
    $('.BoardPickerDropdownButton .nameAndIcons').html(name);
  });

  // ピン編集画面で「ピン削除」ボタンが押された場合
  $(document).on('click', '.deletePinButton', pinDeleteConfirm);

  // ピン削除確認画面で「ピン削除」ボタンが押された場合
  $(document).on('click', '.confirm.Button.pinDelete', pinDelete);

  // ピン編集画面で「保存」ボタンが押された場合
  $(document).on('click', '.savePinButton', pinUpdate);


});
