
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
            $(this).closest(".selectboxss").find('.selectboxssvalue input').val($(this).text());
            $(this).closest(".selectboxss").find('.selectboxssvalue input').attr('data-seaId', $(this).attr('data-seaId'));
            $("#currentSea").change();
        });
    };
})(jQuery);
$(document).ready(function () { $('.selectboxss').selectbox(); });

new PerfectScrollbar('#accessories', {
    maxScrollbarLength: 109,
    useBothWheelAxes: true,
    scrollingThreshold: 5000,
    wheelSpeed: 0.5,
});

let Seacraft = {
    sea: {
        load: function () {
            let seas = JSON.parse($.getJSON({ 'url': "../data/sea.json", 'async': false }).responseText);
            seas.forEach((element, index) => {
                $('#seas').append('<li class="selectoption" data-seaId=' + index + '>' + element.nameEN + '</li>');
            });
            $("#currentSea").change(function () {
                $('#seaSalt').val(seas[$("#currentSea").attr('data-seaId')].salt);
                $('#seaTemp').val(seas[$("#currentSea").attr('data-seaId')].temperature);
            });
            $('#seaSalt').change(function () {
                $("#currentSea").val(seas[seas.length - 1].nameEN);
            });
            $('#seaTemp').change(function () {
                $("#currentSea").val(seas[seas.length - 1].nameEN);
            });
        },
    },
    scooter: {
        load: function () {
            let models = JSON.parse($.getJSON({ 'url': "../data/models.json", 'async': false }).responseText);
            models.forEach((element, index) => {
                if (index == 0) {
                    $('#models').append('<span class="model__title model__active">' + element.nameEN + '</span>');
                } else {
                    $('#models').append('<span class="model__title">' + element.nameEN + '</span>');
                }
            });
            $('.model__title').click(function () {
                $('.models').find('.model__active').removeClass('model__active');
                $(this).addClass('model__active');
            });
        },
    },
    howtouse: function () {
        $('<div />', {
            "class": 'modal',
        }).appendTo('body');
        $('<div />', {
            "class": 'htuCard',
        }).appendTo('.modal');
        $('<div />', {
            "class": 'htuCard__title',
            "html": "How to use this form?",
        }).appendTo('.htuCard');
        $('<div />', {
            "class": 'htuCard__text',
            "html": `<p>The Seacraft balance calculator was designed to assist you in determining the right trim for your PDV with and without accessories.
            Please remember, that you DPV's trim depends on the salinityand temperature of the waters you are diving in, and on the positioning of the accessories. These factors are taken into account.</p>
            
            <p>Please note, that this calculator is based on some simple assumptions and maybe cannot simulate your specific configuration.
            Please do also note, that trimming a DPV is no rocket science, but it will depend largely on you personal preference and dive plan. Some divers prefer a slightly positive trim, others a slightly negative one.
            Hence, always check the correct trim of your DPV BEFORE you dive.
            This tool will support you in developping a hunch for your personal "right trim".</p>
            
            <p>To use the calculator, please proceed as follows:</p>
            
            <p>1. Select your Seacraft DPV model.</p>
            <p>2. Select the waters you are going to dive in.
            You may select one of the presets or enter your custom value for the salinity.</p>
            <p>3. Enter the approx. water temperature (for the depth level, you will spend most of your diving time on).</p>
            <p>4. If you are using accessory components on your DPV, select one of the pre-defined mounting points, then select the Seacraft accessory shown at the bottom of the screen.
                Repeat this step as required for other accessory components.</p>
            
                <p>In the right upper corner, you will now see the expected buoyancy of yor DPV and information on how much trimming weight to remove or to add.
            Remember, that the 1mm trimming weights can be easily cut with scissors, in case you need to make very small adjustments.</p>
            
            <p>Please note, that this version of the calculator does not take into account the battery and trimming weight positions inside the DPV.
            Since these positions are variable, it might give you more flexibility when choosing the right mounting point for your purposes.</p>
            
            <p>We wish you much fun and success trimming your DPV according to your personal requirements, and look forward to your comments, suggestions and feedback regarding this calculator.</p>`,
        }).appendTo('.htuCard');
        $('<div />', {
            "class": 'htuCard__сlose',
            "html": '×',
            'click': function () {
                $('.modal').remove();
            }
        }).appendTo('.htuCard');
        new PerfectScrollbar('.htuCard', {
            maxScrollbarLength: 109,
            useBothWheelAxes: true,
            scrollingThreshold: 5000,
            wheelSpeed: 0.2,
        });
        $(document).mouseup(function (e) {
            var container = $(".modal");
            if (container.has(e.target).length === 0) {
                $('.modal').remove();
            }
        });
    }
};
Seacraft.sea.load();
Seacraft.scooter.load();
$('#howtouse').click(function () {
    Seacraft.howtouse();
});