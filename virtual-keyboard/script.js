const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    enRu: false
  },

  init() {
    //Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    //Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    //Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .keyboard-input 
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  keyLayoutRu: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
    "ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shift",
    "ru", "space", "left", "right"
  ],

  keyLayoutEn: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
    "`", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
    "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift",
    "en", "space", "left", "right"
  ],

  keyLayoutShiftEn: [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
    "~", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "enter",
    "done", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "shift",
    "en", "space", "left", "right"
  ],

  keyLayoutShiftRu: [
    "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
    "Ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "shift",
    "ru", "space", "left", "right"
  ],


  _createKeys(keyLayout = this.keyLayoutEn) {
    const fragment = document.createDocumentFragment();

    //Creates HTML for icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };
    let langSt = "en";
    let input = document.getElementById("focus");
    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "ъ", "]", "enter", "shift"].indexOf(key) !== -1;
      //Add atributes/calsses
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            input.focus(); playSound("backspace");
            let selectedTextArea = document.activeElement;
            let cursorSelect = selectedTextArea.selectionStart;

            this.properties.value = this.properties.value.substring(0, selectedTextArea.selectionStart - 1)
              + this.properties.value.substring(selectedTextArea.selectionStart, this.properties.value.length);

            this._triggerEvent("oninput");
            input.setSelectionRange(cursorSelect - 1, cursorSelect - 1);

          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            input.focus(); playSound("caps");
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--toggle");
          keyElement.innerHTML = "shift";

          keyElement.addEventListener("click", () => {
            input.focus(); playSound("shift");
            keyElement.classList.toggle("keyboard__key--activee");
            this._toggleShift();
            // this.properties.shift = !this.properties.shift;
            keyElement.classList.toggle("keyboard__key--shift", this.properties.shift);
          });

          break;

        case "en" || "ru":
          keyElement.classList.add("keyboard__key", "keyboard__key--toggle");
          keyElement.innerHTML = "en";

          keyElement.addEventListener("click", () => {
            playSound("def");
            langSt == "en" ? langSt = "ru" : langSt = "en";
            this._toggleEnRu();
            input.focus();
            keyElement.classList.toggle("keyboard__key--shift", this.properties.enRu, keyElement.innerHTML = this.properties.enRu ? "ru" : "en");
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            input.focus(); playSound("enter");
            let selectedTextArea = document.activeElement;
            let cursorSelect = selectedTextArea.selectionStart;
            let buffer = this.properties.value.substring(selectedTextArea.selectionStart, this.properties.value.length);
            this.properties.value = this.properties.value.substring(0, selectedTextArea.selectionStart);
            this.properties.value += "\n";
            this.properties.value += buffer;
            this._triggerEvent("oninput");
            input.setSelectionRange(cursorSelect + 1, cursorSelect + 1);
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            playSound("def");
            input.focus();
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "left":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = createIconHTML("arrow_left");

          keyElement.addEventListener("click", () => {
            playSound("def");
            input.focus();
            this._selectTextLeft();
          });
          break;

        case "right":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = createIconHTML("arrow_right");

          keyElement.addEventListener("click", () => {
            playSound("def");
            input.focus();
            this._selectTextRight();
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            playSound("def");
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:

          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            playSound("def",langSt);
            input.focus();
            let selectedTextArea = document.activeElement;
            let cursorSelect = selectedTextArea.selectionStart;
            let buffer = this.properties.value.substring(selectedTextArea.selectionStart, this.properties.value.length);
            this.properties.value = this.properties.value.substring(0, selectedTextArea.selectionStart);
            this.properties.value +=
              this.properties.shift
                ? this.properties.enRu
                  ? this.keyLayoutRu.indexOf(key.toLowerCase()) < 13
                    ? this.properties.capsLock
                      ? this.keyLayoutShiftRu[this.keyLayoutEn.indexOf(key)].toLowerCase()
                      : this.keyLayoutShiftRu[this.keyLayoutEn.indexOf(key)].toUpperCase()
                    : this.properties.capsLock
                      ? this.keyLayoutRu[this.keyLayoutEn.indexOf(key)].toLowerCase()
                      : this.keyLayoutRu[this.keyLayoutEn.indexOf(key)].toUpperCase()
                  : this.keyLayoutEn.indexOf(key.toLowerCase()) < 13
                    ? this.properties.capsLock
                      ? this.keyLayoutShiftEn[this.keyLayoutEn.indexOf(key)].toLowerCase()
                      : this.keyLayoutShiftEn[this.keyLayoutEn.indexOf(key)].toUpperCase()
                    : this.properties.capsLock
                      ? this.keyLayoutEn[this.keyLayoutEn.indexOf(key)].toLowerCase()
                      : this.keyLayoutEn[this.keyLayoutEn.indexOf(key)].toUpperCase()
                : this.properties.enRu
                  ? this.properties.capsLock
                    ? this.keyLayoutRu[this.keyLayoutEn.indexOf(key)].toUpperCase()
                    : this.keyLayoutRu[this.keyLayoutEn.indexOf(key)].toLowerCase()
                  : this.properties.capsLock
                    ? key.toUpperCase()
                    : key.toLowerCase();
            this.properties.value += buffer;
            this._triggerEvent("oninput");
            input.setSelectionRange(cursorSelect + 1, cursorSelect + 1);
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    // console.log(`Event Triggered! Event Name ${handlerName}`);
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _selectTextLeft() {
    let input = document.getElementById("focus");
    input.focus();
    let selectedTextArea = document.activeElement;
    if (selectedTextArea.selectionStart != 0) {
      input.setSelectionRange(selectedTextArea.selectionStart - 1, selectedTextArea.selectionEnd - 1);
    }
  },

  _selectTextRight() {
    let input = document.getElementById("focus");
    input.focus();
    let selectedTextArea = document.activeElement;
    input.setSelectionRange(selectedTextArea.selectionStart + 1, selectedTextArea.selectionEnd + 1);
  },

  _toggleCapsLock() {
    // console.log(`Caps Lock Toggled!`);
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = !this.properties.shift
          ? this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
          : this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase()
      }
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    for (i in this.elements.keys) {
      if (this.elements.keys[i].childElementCount === 0 && (i != 0 || i < 13)) {
        if (!this.properties.enRu) {

          this.elements.keys[i].textContent = this.properties.shift ? this.keyLayoutShiftEn[i].toUpperCase()
            : this.keyLayoutEn[i];
        } else {

          this.elements.keys[i].textContent = this.properties.shift ? this.keyLayoutShiftRu[i].toUpperCase()
            : this.keyLayoutRu[i];
        }
      }
      if (this.elements.keys[i].childElementCount === 0 && (i == 0 || i >= 13)) {
        this.elements.keys[i].textContent = !this.properties.shift
          ? this.properties.capsLock ? this.elements.keys[i].textContent.toUpperCase() : this.elements.keys[i].textContent.toLowerCase()
          : this.properties.capsLock ? this.elements.keys[i].textContent.toLowerCase() : this.elements.keys[i].textContent.toUpperCase()
      }
    }
  },

  _toggleEnRu() {
    this.properties.enRu = !this.properties.enRu;

    for (i in this.elements.keys) {
      if (this.elements.keys[i].childElementCount === 0 && (i != 0 || i < 13)) {
        if (!this.properties.enRu) {

          this.elements.keys[i].textContent = this.properties.shift ? this.keyLayoutShiftEn[i].toUpperCase()
            : this.keyLayoutEn[i];
        } else {
          this.elements.keys[i].textContent = this.properties.shift ? this.keyLayoutShiftRu[i].toUpperCase()
            : this.keyLayoutRu[i];
        }
      }

      if (this.elements.keys[i].childElementCount === 0 && (i == 0 || i >= 13)) {
        this.elements.keys[i].textContent = !this.properties.shift
          ? this.properties.enRu
            ? (this.properties.capsLock ? this.keyLayoutRu[i].toUpperCase()
              : this.keyLayoutRu[i])
            : (this.properties.capsLock ? this.keyLayoutEn[i].toUpperCase()
              : this.keyLayoutEn[i])
          : this.properties.enRu
            ? (this.properties.capsLock ? this.keyLayoutRu[i]
              : this.keyLayoutRu[i].toUpperCase())
            : (this.properties.capsLock ? this.keyLayoutEn[i]
              : this.keyLayoutEn[i].toUpperCase())
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(key,langSt="en") {
  let audio;
  if (key == "enter") {
    audio = document.querySelector(`audio[data-key="1"]`);
  } else if (key == "shift") {
    audio = document.querySelector(`audio[data-key="3"]`);
  } else if (key == "backspace") {
    audio = document.querySelector(`audio[data-key="4"]`);
  } else if (key == "caps") {
    audio = document.querySelector(`audio[data-key="5"]`);
  } else {
    if (langSt == "en") {
      audio = document.querySelector(`audio[data-key="2"]`);
    } else {
      audio = document.querySelector(`audio[data-key="6"]`);
    }
  }
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));