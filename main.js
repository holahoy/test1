(() => {
  window.stopIsraelFlag?.();
  document.getElementById(`bibi-overlay`)?.remove();
  document.getElementById(`minesweeper-overlay`)?.remove();

  const overlay = document.createElement(`div`);
  overlay.id = `minesweeper-overlay`;
  overlay.style.cssText = `
    position:fixed;
    inset:0;
    z-index:2147483647;
    background:#fff;
  `;

  const frame = document.createElement(`iframe`);
  frame.src = `https://minesweeper.online/`;
  frame.title = `Сапер`;
  frame.style.cssText = `
    width:100%;
    height:100%;
    border:0;
    display:block;
  `;

  const close = document.createElement(`button`);
  close.textContent = `×`;
  close.setAttribute(`aria-label`, `Закрити`);
  close.style.cssText = `
    position:absolute;
    top:max(12px,env(safe-area-inset-top));
    right:max(12px,env(safe-area-inset-right));
    width:48px;
    height:48px;
    border:0;
    border-radius:50%;
    background:#222;
    color:#fff;
    font:32px Arial;
    cursor:pointer;
    z-index:1;
  `;
  close.onclick = () => overlay.remove();

  overlay.append(frame, close);
  document.documentElement.append(overlay);
})();
