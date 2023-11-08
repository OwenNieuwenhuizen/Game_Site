window.onscroll = function(){myScroll()};
const header = document.getElementById("myHead");
const sticky = header.offsetTop;
function myScroll() {
    if(window.scrollY >= sticky) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }
}