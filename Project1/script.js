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


// document.querySelectorAll('.elem').forEach(function(elem){
//     elem.addEventListener('mousemove', function(dets){
//         // console.log(dets.clientX, dets.clientY)
//         // console.log(dets.clientY - elem.getBoundingClientRect().top);
//         var diff = dets.clientY - elem.getBoundingClientRect().top;

//         gsap.to(elem.querySelector('img'), {
//             opacity: 1,
//             ease: Power1,
//             top: diff,
//             left: dets.clientX,
//         });
//     });
// });
