import confetti from 'canvas-confetti';

export function fireHeartBurst() {
  const count = 35;
  const defaults = {
    origin: { y: 0.7 },
    spread: 360,
    ticks: 80,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 25,
  };

  // Multiple bursts with warm rose and gold colors
  confetti({
    ...defaults,
    particleCount: count,
    scalar: 1.3,
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#fbbf24', '#ffffff'],
    shapes: ['circle'],
  });

  confetti({
    ...defaults,
    particleCount: count / 2,
    scalar: 1.8,
    colors: ['#e11d48', '#be123c', '#f43f5e'],
  });
}

export function fireCelebrationConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ['#e11d48', '#f43f5e', '#fda4af', '#f59e0b', '#ffffff'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ['#e11d48', '#f43f5e', '#fda4af', '#f59e0b', '#ffffff'],
    });
  }, 250);
}
