/**
 * 绑定事件
 */
function bindEvent() {
    // 点击发送
    $('#btn').click(function (e) {
        var val = $('#inp').val();
        if (!val) {
            return;
        }
        renderData('mine', val);
        $('.inp #inp').val('');
        getData(val);
    })
    // 回车键入
    $('.inp #inp').on('keydown', function (e) {
        if(e.keyCode == 13) {
            $('#btn').trigger('click');
        }
    })
}
bindEvent();

/**
 * 向后端传递数据，并且收到机器人的响应
 */
function getData(val) {
    $.ajax({
        type: 'get',
        url: 'http://temp.duyiedu.com/api/chat',
        // dataType: 'json',
        data: {
            text: val,
        },
        success: function (res) {
            var data = JSON.parse(res);
            renderData('robot', data.text);
        },
        error: function (e) {
            console.log(e.status, e.statusText);
        }
    })
}

/**
 * 渲染页面内容
 */
function renderData(who, text) {
    if (who == 'mine') {
        $('<div class="mine">\
                <div class="pic"></div>\
                <div class="text">'+ text + '</div>\
          </div>').appendTo('.wrapper .content');
    } else {
        $('<div class="robot">\
                <div class="pic"></div>\
                <div class="text">'+ text + '</div>\
          </div>').appendTo('.wrapper .content');
    }

    // 以下两种方法效果是一样的
    var scrollTop = $('.content')[0].scrollHeight - $('.content').innerHeight();
    // var scrollTop = $('.content')[0].scrollHeight;
    $('.content').scrollTop(scrollTop);
}