const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleMouseFollower() {
    const miniCircle = document.querySelector('#miniCircle');
    let scrollY = 0; // Initialize scroll offset
    let mouseX = 0; // Mouse X position
    let mouseY = 0; // Mouse Y position

    // Update scrollY on Locomotive Scroll's scroll event
    scroll.on('scroll', (position) => {
        scrollY = position.scroll.y; // Update the virtual scroll position
    });

    // Track mouse movement and store coordinates
    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX; // Update X position
        mouseY = event.clientY; // Update Y position
    });

    // Smoothly update the circle's position
    function updateCirclePosition() {
        miniCircle.style.transform = `translate(${mouseX}px, ${mouseY + scrollY}px)`;
        requestAnimationFrame(updateCirclePosition); // Continuously update position
    }

    // Start the update loop
    updateCirclePosition();
}

function firstPageAnimation(){
    var tl = gsap.timeline()
    
    tl.from('#nav', {
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1,
    })
    .to('.boundingelem', {
        y: 0,
        // opacity: 0,
        ease: Expo.easeInOut,
        duration: 1.2,
        delay : -.7,
        stagger: .2     //for delay in animation after first animation
    })
    .from('#heroFooter', {
        z: -10,
        opacity: 0,
        ease: Expo.easeInOut,
        duration: .9,
        delay: -.7
    })
}

circleMouseFollower();
firstPageAnimation()