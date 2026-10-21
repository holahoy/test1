(() => {
  window.stopIsraelFlag?.();
  document.getElementById(`bibi-overlay`)?.remove();

  let timer;
  const flags = new Set();

  function fly() {
    const flag = document.createElement(`div`);
    const w = innerWidth;
    const h = innerHeight;
    const reverse = Math.random() < .5;
    const startY = Math.random() * h;
    const endY = Math.random() * h;
    const startX = reverse ? w + 120 : -120;
    const endX = reverse ? -120 : w + 120;
    const angle = Math.atan2(endY - startY, w + 240) * 180 / Math.PI;

    flag.textContent = `🇮🇱`;
    flag.style.cssText = `
      position:fixed;left:0;top:0;
      font-size:clamp(48px,12vw,100px);
      line-height:1;pointer-events:none;
      z-index:2147483647;user-select:none;
    `;

    document.documentElement.append(flag);
    flags.add(flag);

    const animation = flag.animate([
      { transform: \`translate(${startX}px,${startY}px) rotate(${reverse ? -angle : angle}deg)\` },
      { transform: \`translate(${endX}px,${endY}px) rotate(${reverse ? -angle : angle}deg)\` }
    ], {
      duration: 2500,
      easing: `linear`
    });

    animation.onfinish = () => {
      flags.delete(flag);
      flag.remove();
    };

    timer = setTimeout(fly, 5000 + Math.random() * 5000);
  }

  window.stopIsraelFlag = () => {
    clearTimeout(timer);
    flags.forEach(flag => flag.remove());
    flags.clear();
  };

  fly();
})();
