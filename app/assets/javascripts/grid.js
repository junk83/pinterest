// $(function() {
  var gridLayout = function(){
    // 画像読み込み完了後に実行
    // $(window).on('load', function() {
      elements = $('.ItemItems');
      winObject = $(window);

      setCol();
      applyPinterestItem();


      winObject.unbind('resize').resize(function() {
        var containerWidth;
        var winWidth = winObject.width(); //- offsetX * 2;
        if(winWidth < colWidth * numOfCol) {
            setCol();
            containerWidth =  colWidth * (numOfCol - 1);
        } else if (winWidth > colWidth * (numOfCol + 1)) {
            setCol();
            containerWidth =  colWidth * (numOfCol + 1);
        }
        if (containerWidth) {
            var current = elements.width();
            elements.width(colWidth * numOfCol);
            applyPinterestItem();
        }
      });
    // });
  };

    var itemArray = [], // ※補足2
        colWidth,
        offsetX = 0,
        offsetY = 0,
        numOfCol = 4,
        elements,
        winObject;

    // Pinterest風グリッドレイアウト適用
    function applyPinterestItem() {
      // 最初にitemArrayを初期化
      itemArray = [];
      // 空のitemArrayを作成する
      for (var i=0; i<numOfCol; i++) {
        pushItemArray(i, 0, 1, -offsetY);
      }

      $('.item').each(function(index) {
        setPosition($(this));
      });

      //最後にエレメントの高さを設定
      var heightarr = getHeightArray(0, itemArray.length);
      elements.height(heightarr.max + offsetY);
    }

    // カラムの数とwidthを設定する
    function setCol() {
      colWidth = $('.item').outerWidth() + offsetX * 2;
      numOfCol = Math.floor((winObject.width() - offsetX * 2) / colWidth);
    }

    // itemArrayに新しいitemを追加
    function pushItemArray(x, y, size, height) {
      for (var i=0; i<size; i++) {
          var item = [];
          item.x = x + i;
          item.endY = y + height + offsetY * 2;

          itemArray.push(item);
      }
    }

    // itemArrayから指定したx位置にあるitemを削除
    function removeItemArray(x, size) {
        for (var i=0; i<size; i++) {
            var idx = getItemIndex(x + i);
            itemArray.splice(idx, 1);
        }
    }

    // itemArray内にある高さの最小値と最大値および最小値のあるx値を取得
    function getHeightArray(x, size) {
      var heightArray = [];
      var temps = [];
      for (var i=0; i<size; i++) {
          var idx = getItemIndex(x + i);
          temps.push(itemArray[idx].endY);
      }
      heightArray.min = Math.min.apply(Math, temps);
      heightArray.max = Math.max.apply(Math, temps);
      heightArray.x = temps.indexOf(heightArray.min);

      return heightArray;
    }

    // itemのx値を基準にitemのインデックスを検索
    function getItemIndex(x) {
      for (var i=0; i<itemArray.length; i++) {
          var obj = itemArray[i];
          if (obj.x === x) {
              return i;
          }
      }
    }

    // itemを配置
    function setPosition(item) {
      if(!item.data('size') || item.data('size') < 0) {
        item.data('size', 1);
      }

      // itemの情報を定義
      var pos = [];
      var tempHeight = getHeightArray(0, itemArray.length);
      pos.x = tempHeight.x;
      pos.y = tempHeight.min;

      var itemWidth = colWidth - (item.outerWidth() - item.width());

      // itemのスタイルを更新
      item.css({
        'left': pos.x * colWidth,
        'top': pos.y,
        // 'transition': 'none',
        'opacity': '1'
      });

      // オリジナル画像の高さを取得
      var img = new Image();
      img.src = item.find('img').attr('src');
      var imageHeight = img.height;

      // 表示画像の高さを計算
      var paddingBottom = imageHeight / colWidth * 100;
      item.find('.heightContainer').css('padding-bottom', paddingBottom + '%');

      // itemArrayを新しいitemで更新
      removeItemArray(pos.x, item.data('size'));
      pushItemArray(pos.x, pos.y, item.data('size'), item.outerHeight());
    }
  // };
$(function() {
  $(window).on('load', function(){
    // var url = location.href;
    // if(url == "http://localhost:3000/" || url == "http://52.68.15.9/"){
      // gridLayout();
    // }
  });

});
