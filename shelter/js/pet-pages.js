let listNums = document.querySelector('.page-num');
let leftDbArrow = document.querySelector('.dbl-left');
let leftArrow = document.querySelector('.left');
let rightDbArrow = document.querySelector('.dbl-right');
let rightArrow = document.querySelector('.right');
let maxPage = 6;
let quantityObj = 8;
function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
function updateParam() {
    if (window.outerWidth <= 1279) {
        maxPage=8;
        quantityObj = 6;
    }
    if (window.outerWidth > 1280) {
        maxPage=6;
        quantityObj = 8;
    }
    if (window.outerWidth <= 740) {
        maxPage=16;
        quantityObj = 3;
    }
}
function listLoad() {
    list.innerHTML = "";
    let i = 0;
    shuffle(pet);
    while (pet[i]) {
        let newItem = document.createElement("div");
        newItem.className = "card";
        newItem.innerHTML = "<img src=\"" + pet[i].img + "\" width=\"270\" alt=\"" + pet[i].name + "\"><div class='card-name'>" + pet[i].name + "</div><button class=\"card-butt\">Learn more</button><div></div><div></div>";
        list.appendChild(newItem);
        i++;
        if (i >= 8) break;
    }
    updateEvent();
}
function updateEvent() {
    let linkItems = document.querySelectorAll('.card-butt');
    for (let i = 0; i < linkItems.length; i++) {
        linkItems[i].addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = pet[i].img;
            modalImg.alt = pet[i].name;
            modalTitle.innerHTML = "<h3>" + pet[i].name + "</h3><h4>" + pet[i].type + " - " + pet[i].breed + "</h4>";
            modalText.innerHTML = "<p>" + pet[i].description + "</p>";
            modalList.innerHTML = "<ul><li><b>Age:</b> " + pet[i].age + "</li><li><b>Inoculations:</b> " + pet[i].inoculations + "</li><li><b>Diseases:</b> " + pet[i].diseases + "</li><li><b>Parasites:</b> " + pet[i].parasites + "</li></ul>";
        });
    }
}

function updateStateBtn(temp) {
    if (temp == maxPage) {
        leftDbArrow.disabled = false;
        leftArrow.disabled = false;
        rightDbArrow.disabled = true;
        rightArrow.disabled = true;
    }
    if (temp < maxPage && temp > 1) {
        leftDbArrow.disabled = false;
        leftArrow.disabled = false;
        rightDbArrow.disabled = false;
        rightArrow.disabled = false;
    }
    if (temp == 1) {
        leftDbArrow.disabled = true;
        leftArrow.disabled = true;
        rightDbArrow.disabled = false;
        rightArrow.disabled = false;
    }
}

rightArrow.addEventListener("click", function () {
    let count = +document.querySelector('.page-num').innerText;
    listLoad();
    document.querySelector('.page-num').innerText = count + 1;
    updateStateBtn(count + 1);
});

rightDbArrow.addEventListener("click", function () {
    let count = +document.querySelector('.page-num').innerText;
    listLoad();
    document.querySelector('.page-num').innerText = maxPage;
    updateStateBtn(maxPage);
});

leftDbArrow.addEventListener("click", function () {
    let count = +document.querySelector('.page-num').innerText;
    listLoad();
    document.querySelector('.page-num').innerText = 1;
    updateStateBtn(1);
});

leftArrow.addEventListener("click", function () {
    let count = +document.querySelector('.page-num').innerText;
    listLoad();
    document.querySelector('.page-num').innerText = count - 1;
    updateStateBtn(count - 1);
});


if (pet.length >= 8) {
    let count = Math.ceil(pet.length / 8);
    for (let i = 1; i < count + 1; i++) {
        let num = document.createElement('a');
        if (i == 1) {
            num.className = "active";
        }
        num.innerHTML = i;
        listNums.appendChild(num);
        num.addEventListener("click", function () {
            let temp = +this.innerText;
            document.querySelector('.our-friend__nums .active').removeAttribute("class");
            this.className = "active";
            listLoad();
            updateStateBtn(temp);
        });
    }
    listLoad();
} else {
    listLoad();
}
updateParam();
updateStateBtn(1);