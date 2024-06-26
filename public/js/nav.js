
var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function removeActiveClass() {
  navLinks.forEach(function(link) {
    link.classList.remove('active');
  });
}


function setActiveClass() {
  removeActiveClass();
  
 
  var hash = window.location.hash;


  navLinks.forEach(function(link) {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    }
  });
}


navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    setTimeout(setActiveClass, 0);
  });
});


setActiveClass();


