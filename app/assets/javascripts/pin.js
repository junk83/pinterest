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

    $('.modalHasClose').remove();
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
              '<div class="Module Pin cloned hideHoverUI pinActionBarStickyContainer summary">' +
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
                      '<textarea maxlength="500" class="content autogrow pinDescriptionInput pinCreateDescription" placeholder="このピンの説明を入力..."></textarea>' +
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

  var successHTML = function(data){
    var html =
   '<div class="Module PinCreateSuccess noBody inModal">' +
      '<div class="standardForm" data-component-type="6">' +
        '<h1>' +
          '<em>' + data.board.name + 'にアップロードしました</em>' +
          '<div class="BoardIcons Module pinCreate"></div>' +
        '</h1>' +
        '<div class="Module PinCreateSuccessBoard"></div>' +
        '<div class="formFooter">' +
          '<div class="formFooterButtons">' +
            '<a href="/boards/' + data.board.id + '/">' +
              '<button class="Button Module NavigateButton btn hasText primary rounded seeItNow small" type="button">' +
                '<span class="buttonText">今すぐ見る</span>' +
              '</button>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    return html;
  };

  var buildModal = function(){
    var html =
    '<div class="Modal Module modalHasClose webNewContentNewRepin absoluteCenter show">' +
      '<div class="modalMask webNewContentNewRepin"></div>' +
      '<div class="modalScroller">' +
        '<div class="modalContainer webNewContentNewRepin">' +
          '<span class="positionModuleCaret"></span>' +
          '<div class="modalContent">' +
            '<div class="modalModule">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    $('.ModalManager').append(html);
  };

  // 保存元選択画面生成
  var pinAddHTML = function(){
    var html =
    '<div class="Modal Module modalHasClose absoluteCenter show">' +
      '<div class="modalMask show"></div>' +
      '<div class="modalScroller">' +
        '<div class="modalContainer show">' +
          '<span class="positionModuleCaret"></span>' +
          '<div class="modalContent">' +
            '<div class="modalModule">' +
              '<div class="AddPin Module inModal" data-component-type="7">' +
                '<form class="standardForm addPinForm">' +
                  '<h1>保存元：</h1>' +
                  '<div class="addPinContent">' +
                    '<button class="Button Module addPinButton addPinURL borderless hasIcon hasText" data-element-type="452" type="button">' +
                      '<em></em>' +
                      '<span class="buttonText">ウェブ </span>' +
                    '</button>' +
                    '<button class="Button Module addPinButton addPinUpload borderless hasIcon hasText" data-element-type="451" type="button">' +
                      '<em></em>' +
                      '<span class="buttonText">お使いのデバイス </span>' +
                    '</button>' +
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

    return html;
  };

  // 追加したピンの生成
  function pinHTML(data){
    var description = (data.pin.description !== undefined) ? data.pin.description : "";

    var credit = creditHTML(data);

    var html =
    '<div class="item">' +
      '<div class="Module Pin pinActionBarStickyContainer pinWithSocialCounts summary">' +
        '<div class="pinWrapper">' +
          '<div class="bulkEditPinWrapper"></div>' +
          '<div class="pinImageActionButtonWrapper">' +
            '<div class="leftSideButtonsWrapper">' +
              '<button class="Button Module ShowModalButton btn hasIcon hasText isBrioFlat primary primaryOnHover repinSmall rounded" type="button">' +
                '<em></em>' +
                '<span class="buttonText">保存 </span>' +
              '</button>' +
            '</div>' +
            '<div class="rightSideButtonsWrapper didItWrapper">' +
              '<button class="Button DropdownButton Module btn didIt isBrioFlat medium rounded square Button Module btn hasIcon rounded" type="button">' +
                '<em></em>' +
                '<span class="accessibilityText">試してみた！</span>' +
              '</button>' +
              '<button class="Button Module ShowModalButton btn editPin hasIcon isBrioFlat rounded" type="button">' +
                '<em></em>' +
                '<span class="accessibilityText">編集</span>' +
                '<input value="' + data.pining_id + '" type="hidden" name="pining[id]" id="pining_id">' +
              '</button>' +
            '</div>' +
            '<div class="pinHolder">' +
              '<a href="#" class="pinImageWrapper draggable" style="background: #c7e5f8;" >' +
                '<div class="pinDomain">dummy</div>' +
                '<div class="fadeContainer">' +
                  '<div class="hoverMask"></div>' +
                  '<div class="Image Module pinUiImage" style="width: 236px">' +
                    '<div class="heightContainer" style="padding-bottom: 100%;">' +
                      '<img class="pinImg fullBleed loaded fade" src="' + data.pin.image.url + '">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</a>' +
            '</div>' +
          '</div>' +
          '<div class="pinMetaWrapper">' +
            '<div class="pinMeta ">' +
              '<p class="pinDescription">' + description + '</p>' +
            '</div>' +
            '<div class="pinDpSocialCounts">' +
              '<div class="Module SocialIconsCounts">' +
                '<div class="pinSocialMeta">' +
                    '<em class="repinIconSmall"></em>' +
                    '<em class="socialMetaCount repinCountSmall">' +
                      '<span class="visuallyHidden">保存回数：</span>' + data.repin +
                    '</em>' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pinCredits">' +
            credit +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';



    return html;
  }

  function creditHTML(data){
    var html;
    if(location.pathname.match(/users/)){
      html =
      '<a href="/boards/' +  data.board.id + '">' +
        '<div class="pinCreditWrapper ">' +
          '<div class="creditItem ">' +
            '<div class="Image Module creditImg unknownImage">' +
              '<div class="heightContainer" >' +
                '<img src="' + data.board_image + '">' +
              '</div>' +
            '</div>' +
            '<div class="pinCreditNameTitleWrapper">' +
              '<div class="creditName">保存先ボード：</div>' +
              '<div class="creditTitle">' + data.board.name + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }else{
      html =
      '<div class="creditItem ">' +
        '<div class="pinCreditNameTitleWrapper">' +
          '<div class="creditName">保存したユーザー：</div>' +
            '<div class="creditTitle">' +
              data.user.first_name + ' '+ data.user.last_name +
             '</div>' +
           '</div>' +
        '</div>';
    }

    return html;
  }

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
    var imagePath = $('.cloned img.pinImg').attr('src');
    // var path = imagePath.split('/');
    // var imageUrl = path.pop();
    var imageUrl = imagePath.replace(/\/uploads\/pin\/image\//, "");
    imageUrl = imageUrl.replace(/\/uploads\/tmp\/pin\//, "");
    var description = $('.pinDescriptionInput').val();
    var boardId = $(this).find('#board_id').val();
    var formData = new FormData();
    formData.append('image_url', imageUrl);
    formData.append('description', description);
    // formData.append('bord_id', boardId);

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
      $('.modalModule').append(successHTML(data));

      // ユーザーのボード一覧画面のidを正規表現にかける
      regexp = new RegExp('/users/' + data.user.id + '/pins', 'g');
      // 表示中のボードにピンを追加した場合とログイン中のユーザページでピンを追加した場合はピンを画面に表示する
      if(boardId == location.pathname.match(/\d+$/) ||
         location.pathname.match(regexp) ){
        $('.activeItem').after(pinHTML(data));
      }

      setTimeout(function(){
        $('.modalHasClose').fadeOut();
        $('body').removeClass('noScroll');
        gridLayout();
      }, 2000);


      // location.reload();
    })
    .fail(function() {
      console.log("error");
    });
  };

  // ピンの保存画面表示
  var repin = function(){
    // var form = $('.standardForm').get(0);
    // var formData = new FormData(form);
    var pinUiImage = $(this).parent().siblings('.pinHolder').find('.pinUiImage').clone();
    var pinDescription = $(this).parents('.pinImageActionButtonWrapper').siblings('.pinMetaWrapper').find('.pinDescription').text();

    $.ajax({
      url: '/pins/upload.json',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(data) {
      buildModal();
      // 新たなHTMLを描画
      $('.modalModule').append(newPinHTML(data));
      $('.left.pane .pinImg').remove();
      $('.left.pane .fadeContainer').append(pinUiImage);
      $('.left.pane .pinDescriptionInput').text(pinDescription);
      $('.left.pane .pinDescription').text(pinDescription);
    })
    .fail(function() {
      console.log("error");
    });
  };

  // 説明文を編集可能にする
  var editDescription = function(){
    $('.pinActionBarStickyContainer').addClass('editingDescription');
    $('.Field.Module.TextField').addClass('active');
    $('.pinDescriptionInput').select();
  };

  // 保存元選択画面を表示
  var pinAdd = function(){
    $('body').addClass('noScroll');
    $('.ModalManager').append(pinAddHTML);

  };





  // ピンアップロードメニュー選択時
  $(document).on('click', '.pinUpload, .addPinUpload', pinUploadHTML);

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
  $(document).on('click', '.pinCreate li.item', pinCreate);

  // 保存ボタン押下時にピンを保存する
  $(document).on('click', '.repinSmall', repin);

  // 編集ボタン押下時に説明文を編集可能にする
  $(document).on('click', '.editPinDescription, .pinDescription', editDescription);

  // 説明文を確定する
  // $(document).on('click', '.modalModule', function(e) {
  //   if (!$.contains($(".editPinDescription")[0], e.target)) {
  //     // クラス除去
  //     $('.pinActionBarStickyContainer').removeClass('editingDescription');
  //     $('.Field.Module.TextField').removeClass('active');
  //     // 編集後の説明文を反映する
  //     $('.left.pane .pinDescription').text($('.left.pane .pinDescriptionInput').val());
  //   }
  // });

  // ボード一覧画面で「ピンを保存する」ボタンが押された場合
  $(document).on('click', '.AddPinRep', function(e){
    e.preventDefault();
    pinAdd();
  });
});
