'use client';

import { useEffect, useRef } from 'react';

const NODE_COUNT = 120;
const MAX_EDGE_DIST = 160;
const MOUSE_REPEL_DIST = 120;
const MOUSE_REPEL_STRENGTH = 0.22;

interface GraphNode {
    x: number; y: number;
    vx: number; vy: number;
}

export default function VertexBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const nodes = useRef<GraphNode[]>([]);
    const raf = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let W = 0, H = 0;

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            nodes.current = Array.from({ length: NODE_COUNT }, () => ({
                x: Math.random() * W, y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            }));
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // gradient background
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, 'rgba(10,10,35,1)');
            bg.addColorStop(0.5, 'rgba(20,10,50,1)');
            bg.addColorStop(1, 'rgba(5,20,45,1)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            const ns = nodes.current;
            const mx = mouse.current.x, my = mouse.current.y;

            // update nodes
            for (const n of ns) {
                const dx = n.x - mx, dy = n.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_REPEL_DIST && dist > 0) {
                    const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
                    n.vx += (dx / dist) * force * MOUSE_REPEL_STRENGTH;
                    n.vy += (dy / dist) * force * MOUSE_REPEL_STRENGTH;
                }

                // slow automatic drift
                n.vx += (Math.random() - 0.5) * 0.02;
                n.vy += (Math.random() - 0.5) * 0.02;

                // gentle damping to maintain slow speed
                const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
                const maxSpeed = 0.8;
                if (speed > maxSpeed) {
                    n.vx *= 0.95;
                    n.vy *= 0.95;
                } else if (speed < 0.2) {
                    // maintain minimum movement
                    n.vx *= 1.05;
                    n.vy *= 1.05;
                }

                n.x += n.vx; n.y += n.vy;
                if (n.x < 0) n.x += W; if (n.x > W) n.x -= W;
                if (n.y < 0) n.y += H; if (n.y > H) n.y -= H;
            }

            // draw edges
            for (let i = 0; i < ns.length; i++) {
                for (let j = i + 1; j < ns.length; j++) {
                    const dx = ns[i].x - ns[j].x, dy = ns[i].y - ns[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < MAX_EDGE_DIST) {
                        const alpha = (1 - d / MAX_EDGE_DIST) * 0.45;
                        ctx.strokeStyle = `rgba(160,130,255,${alpha})`;
                        ctx.lineWidth = (1 - d / MAX_EDGE_DIST) * 1.2;
                        ctx.beginPath();
                        ctx.moveTo(ns[i].x, ns[i].y);
                        ctx.lineTo(ns[j].x, ns[j].y);
                        ctx.stroke();
                    }
                }
                // edges from mouse cursor node
                if (mx > 0) {
                    const dxm = ns[i].x - mx, dym = ns[i].y - my;
                    const dm = Math.sqrt(dxm * dxm + dym * dym);
                    if (dm < MAX_EDGE_DIST * 1.4) {
                        const alpha = (1 - dm / (MAX_EDGE_DIST * 1.4)) * 0.75;
                        ctx.strokeStyle = `rgba(220,180,255,${alpha})`;
                        ctx.lineWidth = (1 - dm / (MAX_EDGE_DIST * 1.4)) * 1.6;
                        ctx.beginPath();
                        ctx.moveTo(ns[i].x, ns[i].y);
                        ctx.lineTo(mx, my);
                        ctx.stroke();
                    }
                }
            }

            // draw nodes
            for (const n of ns) {
                const dxm = n.x - mx, dym = n.y - my;
                const dm = Math.sqrt(dxm * dxm + dym * dym);
                const glow = dm < MAX_EDGE_DIST * 1.4;
                ctx.beginPath();
                ctx.arc(n.x, n.y, glow ? 3 : 2, 0, Math.PI * 2);
                ctx.fillStyle = glow ? 'rgba(230,200,255,0.95)' : 'rgba(160,130,255,0.7)';
                ctx.fill();
            }

            // mouse cursor node
            if (mx > 0) {
                ctx.beginPath();
                ctx.arc(mx, my, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,240,255,0.95)';
                ctx.shadowColor = 'rgba(200,150,255,0.9)';
                ctx.shadowBlur = 14;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // vignette overlay
            const vig = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.28, W / 2, H * 0.42, H * 0.82);
            vig.addColorStop(0, 'rgba(0,0,0,0)');
            vig.addColorStop(1, 'rgba(0,0,0,0.52)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, W, H);

            raf.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ display: 'block' }}
        />
    );
}
