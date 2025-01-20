const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// circleMouseFollower(xScale, yScale)
// function circleMouseFollower() {
//     const miniCircle = document.querySelector('#miniCircle');
//     let scrollY = 0; // Initialize scroll offset
//     let mouseX = 0; // Mouse X position
//     let mouseY = 0; // Mouse Y position

//     // Update scrollY on Locomotive Scroll's scroll event
//     scroll.on('scroll', (position) => {
//         scrollY = position.scroll.y; // Update the virtual scroll position
//     });

//     // Track mouse movement and store coordinates
//     window.addEventListener('mousemove', (event) => {
//         mouseX = event.clientX; // Update X position
//         mouseY = event.clientY; // Update Y position
//     });

//     // Smoothly update the circle's position
//     function updateCirclePosition() {
//         miniCircle.style.transform = `translate(${mouseX}px, ${mouseY + scrollY}px)`;
//         requestAnimationFrame(updateCirclePosition); // Continuously update position
//     }

//     // Start the update loop
//     updateCirclePosition();
// }

function circleDraggingEffect() {
    const miniCircle = document.querySelector('#miniCircle');
    let xScale = 1;
    let yScale = 1;
    let xPrev = 0;
    let yPrev = 0;
    let scrollY = 0;

    scroll.on('scroll', (position) => {
        scrollY = position.scroll.y;
    });

    let resetTimeout;

    window.addEventListener('mousemove', (dets) => {
        const xDiff = dets.clientX - xPrev;
        const yDiff = dets.clientY - yPrev;

        xScale = gsap.utils.clamp(0.6, 1.4, xDiff);
        yScale = gsap.utils.clamp(0.6, 1.4, yDiff);

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        miniCircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY + scrollY}px) scale(${xScale}, ${yScale})`;

        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
            miniCircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY + scrollY}px) scale(1, 1)`;
        }, 100);
    });
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

circleDraggingEffect();
firstPageAnimation()


document.querySelectorAll('.elem').forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener('mouseleave', function() {
        const img = elem.querySelector("img");
        gsap.to(img, {
            opacity: 0,
            ease: Power3,
            onComplete: function() {
                img.style.top = '';
                img.style.left = '';
                img.style.transform = '';
            }
        });
    });

    elem.addEventListener('mousemove', function(dets) {
        // Hide images of all other elements
        document.querySelectorAll('.elem img').forEach(function(otherImg) {
            if (otherImg !== elem.querySelector('img')) {
                gsap.to(otherImg, {
                    opacity: 0,
                    ease: Power3,
                    onComplete: function() {
                        otherImg.style.top = '';
                        otherImg.style.left = '';
                        otherImg.style.transform = '';
                    }
                });
            }
        });

        var diff = dets.clientY - elem.getBoundingClientRect().top;

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        const img = elem.querySelector('img');
        const imgWidth = img.offsetWidth / 2;
        const imgHeight = img.offsetHeight / 2;
        img.style.borderRadius = '27px';

        gsap.to(img, {
            opacity: 1,
            ease: Power1,
            top: diff - imgHeight,
            left: dets.clientX - imgWidth,
            rotate: gsap.utils.clamp(-20, 20, diffrot)
        });
    });
});