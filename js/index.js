
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
$(document).ready(function () {
    $('.selectboxss').selectbox();
    if ($(window).width() < 705) {
        $('.button:eq(0)').text('point 1');
        $('.button:eq(1)').text('point 2');
        $('.button:eq(2)').text('point 3');
    } else {
        $('.button:eq(0)').text('Mounting point 1');
        $('.button:eq(1)').text('Mounting point 2');
        $('.button:eq(2)').text('Mounting point 3');
    }
    $(window).resize(function () {
        if ($(window).width() < 705) {
            $('.button:eq(0)').text('point 1');
            $('.button:eq(1)').text('point 2');
            $('.button:eq(2)').text('point 3');
        } else {
            $('.button:eq(0)').text('Mounting point 1');
            $('.button:eq(1)').text('Mounting point 2');
            $('.button:eq(2)').text('Mounting point 3');
        }
    })
}
);

new PerfectScrollbar('#accessories1', {
    maxScrollbarLength: 109,
    minScrollbarLength: 70,
    useBothWheelAxes: true,
    scrollingThreshold: 5000,
    wheelSpeed: 0.5,
});
new PerfectScrollbar('#accessories2', {
    maxScrollbarLength: 109,
    minScrollbarLength: 70,
    useBothWheelAxes: true,
    scrollingThreshold: 5000,
    wheelSpeed: 0.5,
}); new PerfectScrollbar('#accessories3', {
    maxScrollbarLength: 109,
    minScrollbarLength: 70,
    useBothWheelAxes: true,
    scrollingThreshold: 5000,
    wheelSpeed: 0.5,
});
const models = JSON.parse($.getJSON({ 'url': "../data/models.json", 'async': false }).responseText);
const acces = JSON.parse($.getJSON({ 'url': "../data/accessories.json", 'async': false }).responseText);
let brackets = [[], [], []];
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
            models.forEach((element, index) => {
                if (index == 0) {
                    $('#models').append('<span class="model__title model__active" data-id="' + index + '">' + element.nameEN + '</span>');
                    $('#modelIMG').remove();
                    $('.scooter-images').append($('<img>', { id: 'modelIMG', src: models[$('.models').find('.model__active').attr('data-id')].img }));
                } else {
                    $('#models').append('<span class="model__title" data-id="' + index + '">' + element.nameEN + '</span>');
                }
            });

            $('.model__title').click(function () {
                $('.models').find('.model__active').removeClass('model__active');
                $(this).addClass('model__active');
                Seacraft.accessories.load($('.models').find('.model__active').attr('data-id'));
                $('.scooter-images').empty();
                $('.scooter-images').append($('<img>', { id: 'modelIMG', src: models[$('.models').find('.model__active').attr('data-id')].img }));
            });
            $('.button').click(function () {
                $('.scooter-points').find('.active-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                $('.mainblock__accessories').find('.accessories_active').removeClass('accessories_active');
                $('#accessories' + $(this).attr('data-point')).addClass('accessories_active');
            });
            Seacraft.accessories.load($('.models').find('.model__active').attr('data-id'));
        },
    },
    accessories: {
        load: function (modelID) {
            $('#accessories1').html('');
            $('#accessories2').html('');
            $('#accessories3').html('');
            brackets[0] = [];
            brackets[1] = [];
            brackets[2] = [];
            models[modelID].accessories.forEach((element, index) => {
                acces.forEach((el) => {
                    if (el.id == element) {
                        let acs = '<div class="items-image"><img src="./assets/images/accessory/icons/' + el.img + '.png" alt=""></div><div div class="items-name"><span>' + el.nameEN + '</span></div>';
                        if (el.point1 == "1") {
                            if (el.bracket == true) {
                                brackets[0].push(el);
                            }
                            $('<div />', {
                                "class": 'accessories__items',
                                'data-id': el.id,
                                "html": acs,
                            }).appendTo('#accessories1');
                        }
                        if (el.point2 == "1") {
                            if (el.bracket == true) {
                                brackets[1].push(el);
                            }
                            $('<div />', {
                                "class": 'accessories__items',
                                'data-id': el.id,
                                "html": acs,
                            }).appendTo('#accessories2');
                        }
                        if (el.point3 == "1") {
                            if (el.bracket == true) {
                                brackets[2].push(el);
                            }
                            $('<div />', {
                                "class": 'accessories__items',
                                'data-id': el.id,
                                "html": acs,
                            }).appendTo('#accessories3');
                        }
                    }
                });
            });
            $('.accessories__items').click(function () {
                if ($(this).hasClass('active-access')) {
                    $(this).removeClass('active-access');
                    Seacraft.accessories.choise($(this), $(this).parent().attr('data-access'));
                } else {
                    $('#' + $(this).parent().attr('id')).find('.active-access').removeClass('active-access');
                    $(this).addClass('active-access');
                    Seacraft.accessories.choise($(this), $(this).parent().attr('data-access'), $(this).attr('data-id'));
                }
            });
        },
        choise: function (elem, point, id = null, type = null) {
            $('.accessory' + point + 'IMG').remove();
            let myAccessry = acces.find(obj => {
                return obj.id == id
            });
            if (id != null) {
                if (myAccessry.bracket == true || myAccessry.withBracket == false || brackets[point - 1].length < 2) {
                    $('.scooter-images').append($('<img>', { class: 'accessory' + point + 'IMG', 'data-id': id, src: '../../assets/images/accessory/models/' + $('.models').find('.model__active').attr('data-id') + '/point' + point + '/' + myAccessry.img + '.png' }));
                } else {
                    let htmlTool = '<div class="title-tool">Select a bracket</div>';
                    brackets[point - 1].forEach((el) => {
                        htmlTool += '<div class="accessories__items itemsTool" data-id="' + el.id + '"><div class="items-image"><img src="./assets/images/accessory/icons/' + el.img + '.png" alt=""></div><div div class="items-name"><span>' + el.nameEN + '</span></div></div>';
                    });
                    htmlTool += '';
                    tippy(elem[0], {
                        arrow: false,
                        content: htmlTool,
                        trigger: 'click',
                        // hideOnClick: true,
                        showOnCreate: true,
                        interactive: true,
                        maxWidth: 'none',
                        allowHTML: true,
                        appendTo: () => $('.mainblock__accessories')[0],
                        placement: 'top',
                        zIndex: 9999,
                        onHidden(instance) {
                            $(".mainblock__accessories").find(`[data-tippy-root]`).remove();
                            elem[0]._tippy.destroy();
                        },
                        onClickOutside() {
                            elem.removeClass('active-access');
                            elem[0]._tippy.destroy();
                            Seacraft.accessories.choise(elem, point);
                        },
                    });
                    $('.itemsTool').click(function () {
                        elem[0]._tippy.destroy();
                        $(".mainblock__accessories").find(`[data-tippy-root]`).remove();
                        $('.accessory' + point + 'IMG').remove();
                        Seacraft.accessories.withBracket(point, $(this).attr('data-id'));
                        Seacraft.accessories.withBracket(point, id);
                    });
                }
            }
        },
        withBracket: function (point, id) {
            let myAccessry = acces.find(obj => {
                return obj.id == id
            });
            $('.scooter-images').append($('<img>', { class: 'accessory' + point + 'IMG', 'data-id': id, src: '../../assets/images/accessory/models/' + $('.models').find('.model__active').attr('data-id') + '/point' + point + '/' + myAccessry.img + '.png' }));
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