(function ($) {
    $.fn.extend({
        addClear: function (options) {
            var options = $.extend({
                closeSymbol: "&#10006;",
                color: "#CCC",
                top: 1,
                right: 4,
                returnFocus: true,
                showOnLoad: false,
                onClear: null
            }, options);

            $(this).wrap("<span style='position:relative;' class='add-clear-span'>");
            $(this).after("<a href='#clear'>" + options.closeSymbol + "</a>");
            $("a[href='#clear']").css({
                color: options.color,
                'text-decoration': 'none',
                display: 'none',
                'line-height': 1,
                overflow: 'hidden',
                position: 'absolute',
                right: options.right,
                top: options.top
            }, this);

            if ($(this).val().length >= 1 && options.showOnLoad === true) {
                $(this).siblings("a[href='#clear']").show();
            }

            $(this).keyup(function () {
                if ($(this).val().length >= 1) {
                    $(this).siblings("a[href='#clear']").show();
                } else {
                    $(this).siblings("a[href='#clear']").hide();
                }
            });

            $("a[href='#clear']").click(function () {
                $(this).siblings("input").val("");
                $(this).hide();
                if (options.returnFocus === true) {
                    $(this).siblings("input").focus();
                }
                if (options.onClear) {
                    options.onClear($(this).siblings("input"));
                }
                return false;
            });
            return this;
        }
    });
}
)(jQuery);

var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
var count = 60;
var InterValObj1;
var curCount1;
function sendMessage1() {
    curCount1 = count;
    var phone = $.trim($('#phone1').val());
    if (!phoneReg.test(phone)) {
        alert(" 请输入有效的手机号码");
        return false;
    }
    $("#btnSendCode1").attr("disabled", "true");
    $("#btnSendCode1").val(+curCount1 + "秒再获取");
    InterValObj1 = window.setInterval(SetRemainTime1, 1000);

}
function SetRemainTime1() {
    if (curCount1 == 0) {
        window.clearInterval(InterValObj1);
        $("#btnSendCode1").removeAttr("disabled");
        $("#btnSendCode1").val("重新发送");
    } else {
        curCount1--;
        $("#btnSendCode1").val(+curCount1 + "秒再获取");
    }
}
function binding() {
    alert(1)
}
