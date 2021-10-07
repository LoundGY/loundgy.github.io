const pet = [
    {
        "name": "Jennifer",
        "img": "assets/pets/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "assets/pets/pets-katrine-1.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "assets/pets/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "assets/pets/pets-scarlet.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "assets/pets/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "assets/pets/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "assets/pets/pets-katrine-2.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "assets/pets/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
];

let list = document.querySelector('.card-block');

for (let i = 0; i < pet.length; i++) {
    let newItem = document.createElement("div");
    newItem.className = "card";
    newItem.innerHTML = "<img src=\"" + pet[i].img + "\" width=\"270\" alt=\"" + pet[i].name + "\"><div class='card-name'>" + pet[i].name + "</div><button class=\"card-butt\">Learn more</button><div></div><div></div>";
    list.appendChild(newItem);
}

let linkItems = document.querySelectorAll('.card-butt');
let modal = document.querySelector('#modal');
let span = document.querySelector(".close");
let modalImg = document.querySelector('.modal-text img');
let modalTitle = document.querySelector('.pet-info__title');
let modalText = document.querySelector('.pet-info__text');
let modalList = document.querySelector('.pet-info__list');

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

span.onclick = function () {
    modal.style.display = "none";
    modalImg.src = "#";
    modalImg.alt = "#";
    modalTitle.innerHTML = "";
    modalText.innerHTML = "";
    modalList.innerHTML = "";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalImg.src = "#";
        modalImg.alt = "#";
        modalTitle.innerHTML = "";
        modalText.innerHTML = "";
        modalList.innerHTML = "";
    }
};

