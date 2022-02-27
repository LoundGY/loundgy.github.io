$(function () {
  const index = {
    data: null,
    modal: {
      current: null,
      modal: function (type) {
        if ($(".modal").length > 0) {
          $(".modal").remove();
        }
        const my = index.data.find((el) => el.type === type);
        console.log(my);
        $("<div />", {
          class: "modal",
          id: "modal",
          html: `
          <div class="modal__content">
            <div class="title">${my.title}</div>
            <div class="tabs">
              <div class="tabs__tab active" data-type="about">Описание</div>
              ${
                my.schedule.length > 5
                  ? '<div class="tabs__tab" data-type="schedule">Расписание</div>'
                  : ""
              }
            </div>
            <div class="text">${my.text}</div>
            <div class="details">
                <div class="price">${
                  my.price
                }<i class="fas fa-ruble-sign"></i></div>
                <div class="buy"><a href="https://wa.me/89234949517?text=${
                  my.title
                }" target="_blank">Связаться <i class="fab fa-whatsapp"></i></a></div>
            </div>
          </div>`,
          mouseup: function (event) {
            event.stopPropagation();
            if (
              index.modal.current === event.target &&
              index.modal.current === this
            ) {
              $(this).remove();
            }
          },
          mousedown: function (event) {
            event.stopPropagation();
            index.modal.current = event.target;
          },
        }).appendTo(".page");
        $(".modal__form").click(function (event) {
          event.stopPropagation();
        });
        $(".tabs__tab").click(function (event) {
          event.stopPropagation();
          $(".tabs__tab").removeClass("active");
          $(this).addClass("active");
          if ($(this).attr("data-type") === "schedule") {
            $(".modal__content").find(".text").html(my.schedule);
          } else {
            $(".modal__content").find(".text").html(my.text);
          }
        });
      },
    },
    slide_about: {
      current: 1,
      show: function (slide) {
        const slides = $(".examples__items").find(".item");
        const dots = $(".examples__dots").find(".dot");
        if (slide > slides.length) {
          index.slide_about.current = 1;
        } else if (slide < 1) {
          index.slide_about.current = slides.length;
        } else {
          index.slide_about.current = slide;
        }
        Array.from(slides).forEach((el) => {
          $(el).removeClass("active");
        });
        Array.from(dots).forEach((el) => {
          $(el).removeClass("active");
        });
        $(slides[index.slide_about.current - 1]).addClass("active");
        $(dots[index.slide_about.current - 1]).addClass("active");
      },
      events: function () {
        $(".dot").click(function () {
          index.slide_about.show($(this).attr("data-id"));
        });
        $(".next").click(function () {
          index.slide_about.show(Number(index.slide_about.current) + 1);
        });
        $(".prev").click(function () {
          index.slide_about.show(index.slide_about.current - 1);
        });
      },
    },
  };
  $.ajax({
    url: "./js/data/services.json",
    type: "GET",
    success: function (data) {
      index.data = data;
      data.forEach((el) => {
        $("<div />", {
          class: "all__item",
          html: `
            <div class="title">
              <div class="title__icon">
                <img src="./img/service-icons/${el.type}.svg" alt="" />
              </div>
              <div class="title__text">${el.title}</div>
            </div>
            <div class="text">
            ${el.text.length > 260 ? el.text.substr(0, 260) + "..." : el.text}
            </div>
            <div class="details">
              <div class="details__price">
              ${el.price}<i class="fas fa-ruble-sign"></i>
              </div>
              <div class="details__more" data-type="${el.type}">Подробнее</div>
            </div>
          `,
        }).appendTo("#all-servs");
      });
      $(".details__more").on("click", function () {
        index.modal.modal($(this).attr("data-type"));
      });
    },
  });
  index.slide_about.events();
});
