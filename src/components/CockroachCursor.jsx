import { useEffect, useRef } from 'react';

// A small cockroach that trails the cursor anywhere on the site — a nod to
// the Cockroach Janta Party name. Purely decorative; skipped entirely for
// touch devices and for anyone with reduced-motion preferences set.
export default function CockroachCursor() {
  const roachRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const angle = useRef(0);
  const legPhase = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isTouch) return;

    function handleMove(e) {
      target.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', handleMove);

    let frame;
    function animate() {
      const el = roachRef.current;
      if (el) {
        const dx = target.current.x - pos.current.x;
        const dy = target.current.y - pos.current.y;
        pos.current.x += dx * 0.14;
        pos.current.y += dy * 0.14;

        const dist = Math.hypot(dx, dy);
        if (dist > 1) {
          angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
          legPhase.current += Math.min(dist * 0.15, 12);
        }

        const scuttle = Math.sin(legPhase.current * 0.3) * 2;

        el.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 10}px) rotate(${angle.current}deg) translateY(${scuttle}px)`;
      }
      frame = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="roach-cursor" ref={roachRef} aria-hidden="true">
      <svg width="32" height="20" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="10" rx="11" ry="6.2" fill="#3a2a1a" />
        <ellipse cx="24" cy="10" rx="4.2" ry="3.6" fill="#241810" />
        <line x1="25" y1="7" x2="31" y2="2.5" stroke="#241810" strokeWidth="1" strokeLinecap="round" />
        <line x1="25" y1="13" x2="31" y2="17.5" stroke="#241810" strokeWidth="1" strokeLinecap="round" />
        <line x1="9" y1="6" x2="2" y2="1.5" stroke="#3a2a1a" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="4.5" x2="11" y2="-1" stroke="#3a2a1a" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="19" y1="4.5" x2="18" y2="-1" stroke="#3a2a1a" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="9" y1="14" x2="2" y2="18.5" stroke="#3a2a1a" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="15.5" x2="11" y2="21" stroke="#3a2a1a" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="19" y1="15.5" x2="18" y2="21" stroke="#3a2a1a" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="16" cy="10" rx="11" ry="6.2" fill="url(#roachSheen)" opacity="0.4" />
        <defs>
          <linearGradient id="roachSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
