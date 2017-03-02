$(function() {
  // タブの「a要素hrefの値」と「現在のページURL」が一致していればa要素にclass="active"を追加
  $(document).on('ready turbolinks:load',function() {
    if(location.pathname.match(/^\/users\/\d+/)) {
      $('.tabs a[href="' + location.pathname + '"]').addClass('active');
    }
  });
});
