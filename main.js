(() => {
  document.getElementById(`bibi-overlay`)?.remove();

  const host = document.createElement(`div`);
  host.id = `bibi-overlay`;
  host.style.cssText = `position:fixed;inset:0;z-index:2147483647`;
  document.documentElement.append(host);

  const root = host.attachShadow({ mode: `open` });

  root.innerHTML = `
    <style>
      * { box-sizing: border-box }
      .screen {
        position: absolute;
        inset: 0;
        overflow: auto;
        overscroll-behavior: contain;
        background: #f4f8ff;
        color: #0038b8;
        font-family: Arial, sans-serif;
        text-align: center;
        display: grid;
        place-items: center;
        padding: 80px 20px 30px;
      }
      button {
        position: absolute;
        top: max(16px, env(safe-area-inset-top));
        right: max(16px, env(safe-area-inset-right));
        width: 48px;
        height: 48px;
        border: 0;
        border-radius: 50%;
        background: #0038b8;
        color: white;
        font-size: 32px;
        cursor: pointer;
        z-index: 1;
        touch-action: manipulation;
      }
      main { width: min(100%, 600px) }
      h1 { font-size: clamp(28px, 8vw, 56px) }
      p { font-size: clamp(18px, 5vw, 26px) }
      .stage { padding-top: 55px }
      .bibi {
        display: inline-block;
        animation: jump .8s ease-in-out infinite alternate;
      }
      .face {
        font-size: clamp(90px, 28vw, 170px);
        line-height: 1.2;
      }
      .name {
        background: #0038b8;
        color: white;
        padding: 8px 20px;
        border-radius: 14px;
        font-size: 22px;
      }
      @keyframes jump {
        from { transform: translateY(0) rotate(-6deg) }
        to { transform: translateY(-50px) rotate(6deg) }
      }
      @media (prefers-reduced-motion: reduce) {
        .bibi { animation: none }
      }
    </style>
    <section class='screen' role='dialog' aria-modal='true'
      aria-label='Меню' dir='rtl'>
      <button aria-label='Закрити'>×</button>
      <main>
        <h1>🇮🇱 עם ישראל חי 🇮🇱</h1>
        <div class='stage'>
          <div class='bibi'>
            <div class='face'>👨🏻‍💼</div>
            <div class='name'>בנימין נתניהו</div>
          </div>
        </div>
        <p>למען ישראל חזקה ובטוחה</p>
      </main>
    </section>
  `;

  const previousFocus = document.activeElement;
  const close = () => {
    host.remove();
    document.removeEventListener(`keydown`, onKey, true);
    previousFocus?.focus?.();
  };
  const onKey = event => {
    if (event.key === `Escape`) close();
    if (event.key === `Tab`) {
      event.preventDefault();
      root.querySelector(`button`).focus();
    }
  };

  root.querySelector(`button`).onclick = close;
  document.addEventListener(`keydown`, onKey, true);
  root.querySelector(`button`).focus();
})();
