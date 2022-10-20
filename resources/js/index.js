const menuToggle = document.querySelector('.menu-togle input');
const nav = document.querySelector('.nav-list ul');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('slide');
});

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("navbar").style.backgroundColor = "rgb(255, 255, 255)";
        document.getElementById("navbar").style.color = "rgb(0, 0, 0)";
    } else {
        document.getElementById("navbar").style.backgroundColor = "rgba(255, 255, 255, 0)";
        document.getElementById("navbar").style.color = "rgb(255, 255, 255)";
    }
}