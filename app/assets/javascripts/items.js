$(function() {
  // 追加したピンの生成
  function pinHTML(pins){
    // var description = (data.pin.description !== undefined) ? data.pin.description : "";
    //
    // var credit = creditHTML(data);

    var html;
    $.each(pins, function(index, pin)  {
      html =
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
                '<button class="Button DropdownButton Module btn hasIcon isBrioFlat rounded sendSmall sendPinGrid" type="button">' +
                  '<em></em>' +
                  '<span class="accessibilityText">送信</span>' +
                '</button>' +
                '<button class="Button LikeButton Module PinLikeButton btn hasIcon isBrioFlat likeSmall rounded" type="button">' +
                  '<em></em>' +
                  '<span class="accessibilityText">いいね！</span>' +
                '</button>' +
              '</div>' +
              '<div class="pinHolder">' +
                '<a href="#" class="pinImageWrapper draggable" style="background: #c7e5f8;" >' +
                  '<div class="pinDomain">dummy</div>' +
                  '<div class="fadeContainer">' +
                    '<div class="hoverMask"></div>' +
                    '<div class="Image Module pinUiImage" style="width: 236px">' +
                      '<div class="heightContainer" style="padding-bottom: 100%;">' +
                        '<img class="pinImg fullBleed loaded fade" src="' + pin.image + '">' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="pinMetaWrapper">' +
              '<div class="pinMeta ">' +
                '<p class="pinDescription">' + pin.description + '</p>' +
              '</div>' +
              '<div class="pinDpSocialCounts">' +
                '<div class="Module SocialIconsCounts">' +
                  '<div class="pinSocialMeta">' +
                      '<em class="repinIconSmall"></em>' +
                      '<em class="socialMetaCount repinCountSmall">' +
                        '<span class="visuallyHidden">保存回数：</span>' + pin.repin +
                      '</em>' +
                    '</a>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="pinCredits">' +
              '<div class="pinCreditWrapper ">' +
                '<button class="Button DropdownButton Module borderless hasIcon hidePinInfo" type="button">' +
                  '<em></em>' +
                  '<span class="accessibilityText">詳細</span>' +
                '</button>' +
                '<div class="creditItem ">' +
                  '<a href="/boards/' + pin.board_id + '">' +
                    '<div class="Image Module creditImg user unknownImage">' +
                      '<div class="heightContainer">' +
                        '<img src="' + pin.user_image + '">' +
                      '</div>' +
                    '</div>' +
                    '<div class="pinCreditNameTitleWrapper">' +
                      '<div class="creditName">' + pin.user_name + '</div>' +
                      '<div class="creditTitle">' + pin.board_name + '</div>' +
                    '</div>' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    });

    return html;
  }

  $(window).on('load', function(){
    if(location.pathname == '/'){
      var page = 1;
      var flag = false;
      $(window).scroll( function() {
          var scrollHeight = $(document).height();
          var scrollPosition = $(window).height() + $(window).scrollTop();
          if (scrollHeight - scrollPosition <= 5 && !flag) {


            setTimeout(function(){
              page++;
              // $('.gridLoading').append('<span class="gridFooterSpinner"></span>');
              $.ajax({
                url: "/",
                type: "GET",
                dataType: "json",
                data: {"page": page}
              }).done(function(data){
                $.each(data.pins, function(i, pin){
                  $('.GridItems').append(pinHTML(data.pins));
                });
                flag = false;
                gridLayout();
              }).fail(function(){
                console.log("エラー");
              });

              // $('.gridFooterSpinner').remove();
            }, 500);
          }
      });
    }
  });
});
