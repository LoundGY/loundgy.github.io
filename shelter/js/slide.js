var width = 340; // ширина изображения
var count = 1; // количество изображений
var tempN = 3; // количество изображений по умолчанию
var temp = 3;
var list1 = document.querySelector('.card-block');
var listElems = document.querySelectorAll(".card");
var position = 0; // текущий сдвиг влево

var nextBtn = document.querySelector(".rig-ar");
var prevBtn = document.querySelector(".lft-ar");

function updateParam() {
    list1.style.marginLeft = "0";
    position = 0;
    prevBtn.disabled = true;
    nextBtn.disabled = false;
    if (window.outerWidth <= 1279) {
        width = 310;
        temp = 2;
        tempN = 2;
    }
    if (window.outerWidth > 1280) {
        width = 340;
        temp = 3;
        tempN = 3;
    }
    if (window.outerWidth <= 740) {
        width =310;
        temp = 1;
        tempN = 1;
    }
}

function next() {
    prevBtn.disabled = false;
    position = Math.max(position - width * count, -width * (listElems.length - count));
    list1.style.marginLeft = position + "px";
    temp++;
    if (listElems.length == temp) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function prev() {
    nextBtn.disabled = false;
    position = Math.min(position + width * count, 0);
    list1.style.marginLeft = position + "px";
    temp--;
    if (temp == tempN) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

window.onresize = function () {
    updateParam();
};

window.onload = function () {
    updateParam();
};