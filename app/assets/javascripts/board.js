$(function() {

  // 新規ボード作成画面HTML生成
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
              '<p class="formFieldMessage formErrorMessage">ボードの名前は必須事項です。</p>' +
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
            '<button class=" Button Module btn cancelButton hasText rounded" type="button">' +
              '<span class="buttonText">キャンセル </span>' +
            '</button>' +
            '<button class="Button Module btn hasText primary rounded saveBoardButton " type="submit" >' +
              '<span class="buttonText">作成 </span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</form>' +
    '</div>';

    return html;
  }

  // 新規ボード作成画面生成
  var boardNew = function(){
    $('.right.pane').append(boardNewHTML).hide().fadeIn(1000);
  };

  // ボード作成処理
  var boardCreate = function(e){
    e.preventDefault();
    var form = $('.modalPinCreate').get(0);
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
      console.log(data);
      $('.BoardCreate').remove();
    })
    .fail(function() {
      console.log("error");
    });
  };

  // 「新規ボードを作成」ボタンが押された場合
  $(document).on('click', '.createBoard', boardNew);

  // 「作成」ボタンが押された場合
  $(document).on('click', '.saveBoardButton', boardCreate);

  // 「キャンセル」ボタンが押された場合
  $(document).on('click', '.cancelButton', function(){
    $('.BoardCreate').remove();
  });

});
