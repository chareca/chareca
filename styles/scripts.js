document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    const homeLink = document.querySelector('.navbar-brand');
    homeLink.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});