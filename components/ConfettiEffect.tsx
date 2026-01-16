
import React, { useEffect, useRef } from 'react';

const ConfettiEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fff1f2', '#fbbf24'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      gravity: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      isHeart: boolean;

      constructor() {
        this.x = canvas!.width / 2;
        this.y = canvas!.height / 2;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity - 5;
        this.gravity = 0.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.opacity = 1;
        this.isHeart = Math.random() > 0.5;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.isHeart) {
          ctx.beginPath();
          const d = this.size;
          ctx.moveTo(0, d / 4);
          ctx.quadraticCurveTo(0, 0, d / 4, 0);
          ctx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
          ctx.quadraticCurveTo(d / 2, 0, (d * 3) / 4, 0);
          ctx.quadraticCurveTo(d, 0, d, d / 4);
          ctx.quadraticCurveTo(d, d / 2, d / 2, d);
          ctx.quadraticCurveTo(0, d / 2, 0, d / 4);
          ctx.fill();
        } else {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }
        ctx.restore();
      }

      update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.005;
      }
    }

    // Initial burst
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Keep adding a few particles for a continuous feel
      if (particles.length < 200 && Math.random() > 0.8) {
        particles.push(new Particle());
      }

      particles = particles.filter(p => p.opacity > 0);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />;
};

export default ConfettiEffect;
