
(function ($) {
    $.fn.selectbox = function () {
        let selectDefaultHeight = $('.selectboxss').height();
        let menuHeight = $('.selectboxssmenu').height() + 36;
        $('.selectboxss .selectboxssvalue').click(function () {
            let currentHeight = $(this).closest(".selectboxss").height();
            if (currentHeight < 100 || currentHeight == selectDefaultHeight) {
                $(this).closest(".selectboxss").height(menuHeight + "px");
                $(this).find('.arrowselect').attr("style", "transition: 0.2s;transform: rotate(180deg);padding: 0px 0px 13px 13px;");
            }
            if (currentHeight >= 50) {
                $(this).closest(".selectboxss").height(selectDefaultHeight);
                $(this).find('.arrowselect').attr("style", "rotate(0deg);padding: 13px 13px 0px 0px;");
            }
        });
        $('li.selectoption').click(function () {
            $(this).closest(".selectboxss").height(selectDefaultHeight);
            $(this).closest(".selectboxss").find('.arrowselect').attr("style", "rotate(0deg);padding: 13px 13px 0px 0px;");
            $(this).closest(".selectboxss").find('.selectboxssvalue span').text($(this).text());
        });
    };
})(jQuery);
$(document).ready(function () { $('.selectboxss').selectbox(); });

new PerfectScrollbar('#accessories', {
    maxScrollbarLength: 109,
    useBothWheelAxes: true,
    scrollingThreshold: 5000,


});

