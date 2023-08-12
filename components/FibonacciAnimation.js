import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const FibonacciSpiral = ({ fibs }) => {
	const canvasRef = useRef(null);
	let sketchInstance;

	useEffect(() => {
		if (sketchInstance)
			sketchInstance.remove();
		sketchInstance = new p5(sketch);
		return () => {
			sketchInstance.remove();
		};
	}, [fibs]);

	const sketch = (p) => {
		const CANVAS_WIDTH = 600;
		const CANVAS_HEIGHT = 600;
		let scale;

		const colors = ['#EF6F6C', '#59C9A5', '#56E39F', '#5B6C5D'];

		p.setup = () => {
			p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasRef.current);
			p.angleMode(p.DEGREES);
			initFibs();
		};

		p.draw = () => {
			p.background(70, 87, 117);

			p.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

			for (let i = 0; i < fibs.length; i++) {
				const scaledFib = fibs[i] * scale;
				const color = colors[i % 4];
				p.fill(color);
				p.rect(0, 0, scaledFib, scaledFib);
				p.arc(scaledFib, 0, 2 * scaledFib, 2 * scaledFib, 90, 180);
				p.fill(0, 0, 0);
				p.textAlign(p.CENTER, p.CENTER);
				p.textSize(16);
				p.text(fibs[i], scaledFib / 2, scaledFib / 2);
				p.translate(scaledFib, scaledFib);
				p.rotate(-90);
			}
			if (scale > CANVAS_WIDTH / fibs[fibs.length - 1] * 0.4)
				scale *= 0.99;
		};

		function initFibs() {
			scale = 300
		}
	};

	return <div ref={canvasRef}></div>;
};

export default FibonacciSpiral;
