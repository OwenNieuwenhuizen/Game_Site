// window.onscroll = function(){myFuntion()};
const header = document.getElementById("myHead");
const sticky = header.offsetTop;
function myFuntion() {
    if(window.scrollY >= sticky) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }
}