(() => {
  window.stopIsraelFlag?.();
  document.getElementById(`bibi-overlay`)?.remove();

  let timer;
  const flags = new Set();

  function fly() {
    const flag = document.createElement(`div`);
    const reverse = Math.random() < .5;
    const size = Math.min(100, Math.max(48, innerWidth * .12));
    const y1 = Math.random() * Math.max(0, innerHeight - size);
    const y2 = Math.random() * Math.max(0, innerHeight - size);
    const x1 = reverse ? innerWidth + 150 : -150;
    const x2 = reverse ? -150 : innerWidth + 150;
    const angle = (Math.random() - .5) * 90;

    flag.textContent = `🇮🇱`;
    flag.style.cssText = `
      all:initial;
      position:fixed;
      left:0;
      top:0;
      font-size:${size}px;
      line-height:1;
      pointer-events:none;
      user-select:none;
      z-index:2147483647;
    `;

    document.documentElement.append(flag);
    flags.add(flag);

    const animation = flag.animate([
      { transform: `translate(${x1}px,${y1}px) rotate(${angle}deg)` },
      { transform: `translate(${x2}px,${y2}px) rotate(${angle}deg)` }
    ], {
      duration: 2500,
      easing: `linear`,
      fill: `forwards`
    });

    animation.onfinish = () => {
      flag.remove();
      flags.delete(flag);
    };

    timer = setTimeout(fly, 5000 + Math.random() * 5000);
  }

  window.stopIsraelFlag = () => {
    clearTimeout(timer);
    flags.forEach(flag => {
      flag.getAnimations().forEach(animation => animation.cancel());
      flag.remove();
    });
    flags.clear();
  };

  fly();
})();
