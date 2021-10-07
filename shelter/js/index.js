document.getElementById("trigger").onclick = function () { open() };
document.getElementById("overlay").onclick = function () { open() };


function open() {
    let timer = null;
    let a = document.getElementById('cozy'), b = document.getElementById('menu');
    b.classList.toggle("show");
    a.classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
    document.getElementById("trigger").classList.toggle("trigger-active");
    a.classList.toggle("headClSm");
    if (a.classList.contains('headClSm')) {
        b.appendChild(a);
        b.animate([
            // keyframes
            { right: '-330px' },
            { right: '0' }
        ], {
            // timing options
            duration: 300,
        })
    } else {
        document.getElementById('header').appendChild(a);
        document.getElementById('header').appendChild(b);
    }
    if (!b.classList.contains('show')) {
        b.classList.toggle("show");
        b.animate([
            // keyframes
            { right: '0' },
            { right: '-320px' }
        ], {
            // timing options
            duration: 300,
        })
        setTimeout(() => { b.classList.toggle("show"); }, 280);
    }
}   