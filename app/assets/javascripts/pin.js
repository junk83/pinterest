$(function() {
  // ピンアップロード画面生成
  var pinUploadHTML = function(){
    var html =
    '<div class="Modal Module modalHasClose absoluteCenter show">' +
      '<div class="modalMask show"></div>' +
      '<div class="modalScroller">' +
        '<div class="modalContainer show">' +
          '<span class="positionModuleCaret"></span>' +
          '<div class="modalContent">' +
            '<div class="modalModule">' +
              '<div class="Module PinUploader inModal">' +
                '<form class="standardForm" method="post">' +
                  '<h1>ピンをアップロード</h1>' +
                  '<div class="ImageUploader Module">' +
                    '<div class="Button Module btn hasText leftRounded mediumLarge primary" type="button" style="position: relative; overflow: hidden; direction: ltr;">' +
                      '<span class="buttonText">画像を選択</span>' +
                      '<input title="file input" type="file" name="image" style="position: absolute; right: 0px; top: 0px; font-family: Arial; font-size: 118px; margin: 0px; padding: 0px; cursor: pointer; opacity: 0; height: 100%;">' +
                    '</div>' +
                    '<div class="uploaderProgress">' +
                      '<span></span>' +
                    '</div>' +
                  '</div>' +
                '</form>' +
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

    $('.ModalManager').append(html);
  };

  // ボード選択画面生成
  var newPinHTML = function(data){
    // ボードのリスト生成
    var item = '';
    for(var i = 0; i < data.boards.length; i++ ){
      item +=
      '<li class="item">' +
        '<div class="BoardLabel Module pinCreate">' +
          '<button class="Button Module btn hasIcon hasText isBrioFlat primary primaryOnHover repinSmall repinBtn rounded" type="button">' +
            '<em></em>' +
            '<span class="buttonText">保存</span>' +
          '</button>' +
          '<div class="boardImg emptyBoardImg"></div>' +
            '<span class="nameAndIcons">' +
              '<div class="BoardIcons Module pinCreate"></div>' +
              '<span class="name">' + data.boards[i].name + '</span>' +
              '<input id="board_id" type="hidden" value="' + data.boards[i].id + '">' +
            '</span>' +
          '</div>' +
      '</li>';
    }
    // ボード選択画面生成
    var html =
    '<div class="Module PinCreate TwoPaneModal inModal" style="height: 540px;">' +
      '<button class="Button Module borderless cancelButton hasIcon twoPaneClose" type="button">' +
        '<em></em>' +
        '<span class="accessibilityText">閉じる</span>' +
      '</button>' +
      '<div class="left pane">' +
        '<div class="Module PinCreatePin">' +
          '<div class="pinContainer">' +
            '<div class="pinModuleHolder">' +
              '<div class="Module Pin cloned editingDescription hideHoverUI pinActionBarStickyContainer summary">' +
                '<div class="pinWrapper">' +
                  '<div class="bulkEditPinWrapper"></div>' +
                  '<div class="pinImageActionButtonWrapper">' +
                    '<div class="leftSideButtonsWrapper">' +
                      '<button class="Button Module ShowModalButton btn hasIcon hasText isBrioFlat primary primaryOnHover repinSmall rounded" data-element-type="0" type="button">' +
                        '<em></em>' +
                        '<span class="buttonText">保存</span>' +
                      '</button>' +
                  '</div>' +
                  '<div class="rightSideButtonsWrapper ">' +
                    '<button class="Button DropdownButton Module btn hasIcon isBrioFlat rounded sendSmall sendPinGrid" data-element-type="98" type="button">' +
                      '<em></em>' +
                      '<span class="accessibilityText">送信</span>' +
                    '</button>' +
                    '<button class="Button LikeButton Module PinLikeButton btn hasIcon isBrioFlat likeSmall rounded" data-element-type="1" data-source-interest-id="" type="button">' +
                      '<em></em>' +
                      '<span class="accessibilityText">いいね！</span>' +
                    '</button>' +
                  '</div>' +
                  '<div class="pinHolder">' +
                   '<div class="pinImageWrapper draggable" data-element-type="35">' +
                     '<div class="fadeContainer">' +
                       '<div class="hoverMask"></div>' +
                       '<img class="pinImg noFade" alt="" src="/uploads/tmp/pin/' + data.cash + '">' +
                       '<input name="image" type="hidden" value="' + data.cash + '">' +
                     '</div>' +
                   '</div>' +
                 '</div>' +
               '</div>' +
               '<div class="pinMetaWrapper">' +
                  '<div class="pinMeta ">' +
                    '<button class="Button Module borderless editPinDescription hasIcon" type="button">' +
                      '<em></em>' +
                      '<span class="accessibilityText">説明を編集</span>' +
                    '</button>' +
                    '<div class="Field Module TextField">' +
                      '<textarea maxlength="500" class="content autogrow            pinDescriptionInput pinCreateDescription" placeholder="このピンの説明を入力..."></textarea>' +
                    '</div>' +
                    '<p class="pinDescription"></p>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="right pane">' +
      '<div class="Module PinCreateBoardPicker">' +
        '<div class="titleContainer">' +
          '<p class="pinCreateTitle">ボードを選択</p>' +
        '</div>' +
        '<div class="boardsWrapper" data-component-type="13025" style="height: 472px;">' +
          '<div class="BoardPicker Module Picker pinCreate" style="visibility: visible;">' +
            '<div class="top">' +
              '<button class="Button Module btn createButton hasText rounded" type="button">' +
                '<span class="buttonText">作成</span>' +
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
              '<div class="bottom">' +
                '<div class="Module PickerItemCreate pinCreate createBoard" data-element-type="249">' +
                  '<span class="icon"></span>新規ボードを作成' +
                '</div>' +
              '</div>' +
              '<div class="Module SelectList pinCreate" tabindex="0" style="height: 411px;">' +
                '<div class="sections">' +
                  // '<ul class="section recentBoards">' +
                  //   '<li class="sectionHeading">' +
                  //     '<div class="Label Module">人気のボード</div>' +
                  //   '</li>' +
                  //   '<ul class="sectionItems">' +
                  //     '<li class="item">' +
                  //       '<div class="BoardLabel Module pinCreate">' +
                  //         '<button class="Button Module btn hasIcon hasText isBrioFlat primary primaryOnHover repinSmall repinBtn rounded" type="button">' +
                  //           '<em></em>' +
                  //           '<span class="buttonText">保存</span>' +
                  //         '</button>' +
                  //         '<div class="boardImg" style="background-image:url(https://s-media-cache-ak0.pinimg.com/200x150/90/0f/96/900f96adce55f6141d2d9b8b08f68467.jpg)"></div>' +
                  //           '<span class="nameAndIcons">' +
                  //           '<div class="BoardIcons Module pinCreate"></div>' +
                  //           '<span class="name">test</span>' +
                  //         '</span>' +
                  //       '</div>' +
                  //     '</li>' +
                  //   '</ul>' +
                  // '</ul>' +
                  '<ul class="section allBoards">' +
                    '<li class="sectionHeading">' +
                      '<div class="Label Module">すべてのボード</div>' +
                    '</li>' +
                    '<ul class="sectionItems">' +
                      item +
                    '</ul>' +
                  '</ul>' +
                  '<ul class="section ">' +
                    '<ul class="sectionItems"></ul>' +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="Module PinCreateShare"></div></div>';

    return html;
  };

  var successHTML = function(){
    var html =
   '<div class="Module PinCreateSuccess noBody inModal">' +
      '<div class="standardForm" data-component-type="6">' +
        '<h1>' +
          '<a href="/drivethruprm/test/">test</a>に<em>アップロードしました</em>' +
          '<div class="BoardIcons Module pinCreate"></div>' +
        '</h1>' +
        '<div class="Module PinCreateSuccessBoard"></div>' +
        '<div class="formFooter">' +
          '<div class="formFooterButtons">' +
            '<button class="Button Module NavigateButton btn hasText primary rounded seeItNow small" type="button">' +
              '<span class="buttonText">今すぐ見る</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    return html;
  };

  // キャッシュアップロード処理
  var cashUpload = function(){
    var form = $('.standardForm').get(0);
    var formData = new FormData(form);

    $.ajax({
      url: '/pins/upload.json',
      type: 'POST',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      // 画面表示されているHTMLのクラスを変更
      $('.modalHasClose').addClass('webNewContentNewRepin');
      $('.modalMask').removeClass('show').addClass('webNewContentNewRepin');
      $('.modalContainer').removeClass('show').addClass('webNewContentNewRepin');
      $('.PinUploader').remove();
      $('.cancelButton .inModal').addClass('closeModal');
      // 新たなHTMLを描画
      $('.modalModule').append(newPinHTML(data));
    })
    .fail(function() {
      console.log("error");
    });

  };

  // ピンの登録処理
  var pinCreate = function(){
    var imagePath = $('.editingDescription img.pinImg').attr('src');
    var imageUrl = imagePath.replace(/\/uploads\/tmp\/pin\//, "");
    var description = $('.pinDescriptionInput').val();
    var boardId = $(this).find('#board_id').val();
    var formData = new FormData();
    formData.append('image_url', imageUrl);
    formData.append('description', description);
    formData.append('bord_id', boardId);

    $.ajax({
      url: '/boards/' + boardId + '/pins.json',
      type: 'POST',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      $('.TwoPaneModal').remove();
      $('.modalModule').append(successHTML);
      setTimeout(function(){
        $('.modalHasClose').fadeOut();
      }, 2000);
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ピンアップロードメニュー選択時
  $(document).on('click', '.pinUpload', pinUploadHTML);

  // ピンのキャッシュにアップロード
  $(document).on('change', 'input[type="file"]', cashUpload);

  // ボードをhoverしたときにselectedクラスを付与し、
  // hoverが外れたらselectedクラスを削除する
  $(document).find('.sectionItems').on({
    'mouseenter':function(){
      $(this).children('.item').addClass('selected');
    },
    'mouseleave':function(){
      $(this).children('.item').removeClass('selected');
    }
  });

  // ボードを選択した時にピンの登録処理を実行する
  $(document).on('click', 'li.item', pinCreate);

});
