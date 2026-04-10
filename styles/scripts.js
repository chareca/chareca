document.addEventListener('DOMContentLoaded', function() {
    
    // GSAP Reveal Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15
    })
    .to(".hero-line-left", {
        width: "80px",
        duration: 0.8,
    }, "-=0.8");

    // High-performance Mouse Glow Follower
    const glow = document.querySelector('.mouse-glow');
    const setGlowX = gsap.quickSetter(glow, "left", "px");
    const setGlowY = gsap.quickSetter(glow, "top", "px");

    window.addEventListener("mousemove", e => {
        setGlowX(e.clientX);
        setGlowY(e.clientY);
    });

    // Intersection Observer for fade-up animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});