$(function(){
  // メールアドレス、パスワード入力フォーム用
  var regist_form = $('#new_user');
  var email = $('#user_email');
  var password = $('#user_password');

  // ユーザー名、年齢入力フォーム用
  var commit_form = $('#new_user_commit');
  var first_name = $('#user_first_name');
  var age = $('#user_age');

  // エラーメッセージ
  var error = {
                email:    { empty: '<b>入力されていない項目があります。：</b>メールアドレスを入力してください。',
                            invalid: '<b>エラー：</b>メールアドレスではないようです。'
                          },
                password: {
                            too_short: '<b>パスワードが短すぎます：</b>6文字以上にしてください。'
                          },
                first_name: {
                              empty: '<b>名前を入力してください。</b>'
                            },
                age:      {
                              invalid: '2桁以上の数字を入力してください。'
                          }
              };

  function showIcon(){
    var icon = '<em class="InputField__errorIcon" style="position: absolute; right: 14px; top: 14px;"></em>';
    return icon;
  }
  // エラー表示用ツールチップ生成
  function buildTooltip(key, error_type){
    var tooltip = '<div class="Tooltip_wrapper" data-test-tooltip="true" style="top: 0px; width: 215px;">' +
      '<div class="Tooltip_message" style="background: rgb(255, 255, 255); border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.380392) 0px 0px 2px, rgba(0, 0, 0, 0.317647) 0px 1px 3px; color: rgb(0, 0, 0); font-style: normal; font-weight: normal; line-height: 150%; padding: 8px 14px; text-align: left; max-width: 215px; display: inline-block; float: left;">' +
        '<span>' + error[key][error_type] + '</span>' +
      '</div>' +
    '</div>';
    return tooltip;
  }

  // ツールチップ削除関数
  function removeTooltip(){
    if($('.Tooltip_wrapper').length){
      $('.InputField__errorIcon').remove();
      $('.Tooltip_wrapper').remove();
    }
  }

  // メールアドレス、パスワード入力フォーム
  regist_form.on('submit', function(){
    // submit時にツールチップを消去
    removeTooltip();
    // メールアドレスが空の場合
    if(email[0].validity.valueMissing) {
      email.focus();
      email.after(showIcon() + buildTooltip('email', 'empty'));
      return false;
    // メールアドレスの形式でない場合
    } else if (!email[0].validity.valid) {
      email.focus();
      email.after(showIcon() + buildTooltip('email', 'invalid'));
      return false;
    // パスワードが短すぎる、または空の場合
    } else if (password[0].validity.tooShort || password[0].validity.valueMissing) {
      password.focus();
      password.after(showIcon() + buildTooltip('password', 'too_short'));
      return false;
    }
  });

  // ユーザー名入力フォーム
  commit_form.on('submit', function(){
    // submit時にツールチップを消去
    removeTooltip();
    if(this[name] != 'back'){
      // ユーザー名が空の場合
      if(first_name[0].validity.valueMissing){
        first_name.focus();
        first_name.after(showIcon());
        age.after(buildTooltip('first_name', 'empty'));
        return false;
      } else if(!age[0].validity.valid){
        age.focus();
        age.after(showIcon() + buildTooltip('age', 'invalid'));
        return false;
      }
    }
  });

  // フォーカスが外れた際にチールチップを消去
  email.focusout(function(){
    removeTooltip();
  });

  password.focusout(function() {
    removeTooltip();
  });

  first_name.focusout(function() {
    removeTooltip();
  });

  age.focusout(function() {
    removeTooltip();
  });

});
