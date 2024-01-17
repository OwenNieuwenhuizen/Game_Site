light=true;
dark=false;
function onStart() {
  if(light==true) {
    const lightMode = document.getElementById('lightM');
    const darkMode = document.getElementById('darkM');
    lightMode.removeAttribute('disabled');
    darkMode.setAttribute('disabled','true');
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const lightMode = document.getElementById('lightM');
    const darkMode = document.getElementById('darkM');
  
    themeToggle.addEventListener('click', function () {
      if(lightMode.disabled) {
        lightMode.removeAttribute('disabled');
        darkMode.setAttribute('disabled','true');
      }
      else {
        darkMode.removeAttribute('disabled');
        lightMode.setAttribute('disabled','true');
      }
    });
  });
  