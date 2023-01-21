let arrowButtons = document.querySelectorAll('button')

const tl = gsap.timeline({
    id: 'Timeline'
});

function strokes (node) {
    let path = node;
    const length = path.getTotalLength();

    path.setAttribute('stroke', 'black');

    tl.set(path, {
        strokeDasharray: length + 0.5,
        strokeDashoffset: length + 0.6,
        autoRound: false
    }, 0);

    tl.to(path, {
        strokeDashoffset: 0,
        autoRound: false,
        duration: 1.7,
        ease: `power${3 - 0}.out`
      }, 0);

    tl.to(path, {
        fill: 'black',
        strokeWidth: 0,
        duration: 0.4,
        ease: "none.none"
      }, 1.7)

      arrowButtons.forEach((btn) => {
        tl.to(btn, {
            opacity: 0.4,
            duration: 1,
            ease: "none.none"
          }, 2)
      })
}

document.querySelectorAll('.header-container > svg path').forEach(p => {strokes(p)});
