import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export function useMagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafId = useRef<number>(0);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.2;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.2;

    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const strength = 0.2;
      targetPos.current.x = distX * strength;
      targetPos.current.y = distY * strength;
    } else {
      targetPos.current.x = 0;
      targetPos.current.y = 0;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    targetPos.current.x = 0;
    targetPos.current.y = 0;

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, []);

  return {
    buttonRef,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
