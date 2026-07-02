<script>
	import { onMount } from 'svelte';

	let canvas;
	let animationFrameId;

	// Dimensions and Mouse State
	let width = 0;
	let height = 0;
	let mouseX = 0;
	let mouseY = 0;
	let mouseInteract = false;

	onMount(() => {
		// 1. Setup Canvas Context
		const c = canvas.getContext('2d', { alpha: false });

		// 2. Physics Constants
		const disruption = 0.009;
		const cushion = 0.96;
		const initialHeight = 0.57;
		const gridSize = 200;
		let level = 0;
		let cells = [];
		let cellWidth = 0;
		let cellHeight = 0;

		// 3. Pre-calculate Custom Brand Colors with a Whitewater Crest
		const colors = [];
		for (let i = 0; i < 256; i++) {
			let ratio = i / 255;

			let r, g, b;
			if (ratio < 0.5) {
				// First 50%: Dark board background (#0b0c0f) expanding to clean theme blue (#3b82f6)
				let normRatio = Math.pow(ratio / 0.5, 1.5);
				r = Math.floor(11 + (59 - 11) * normRatio);
				g = Math.floor(12 + (130 - 12) * normRatio);
				b = Math.floor(15 + (246 - 15) * normRatio);
			} else {
				// Top 50%: Blue exploding up into bright neon cyan and striking pure white (#ffffff)
				let peakRatio = (ratio - 0.5) / 0.5;
				r = Math.floor(59 + (255 - 59) * peakRatio);
				g = Math.floor(130 + (255 - 130) * peakRatio);
				b = Math.floor(246 + (255 - 246) * peakRatio);
			}
			colors.push(`rgb(${r}, ${g}, ${b})`);
		}

		// 4. Initialize the Grid
		function initGrid() {
			cells = [];
			for (let i = 0; i < gridSize; i++) {
				for (let j = 0; j < gridSize; j++) {
					let isCenter = i === Math.floor(gridSize / 2) && j === Math.floor(gridSize / 2);
					cells.push({ height: isCenter ? 2 : initialHeight, velocity: 0 });
				}
			}
		}

		// 5. Calculate Physics (2D Wave Equation)
		function updatePhysics() {
			let avgHeight = 0;
			for (let i = 0; i < gridSize; i++) {
				for (let j = 0; j < gridSize; j++) {
					let cell = cells[i + j * gridSize];

					// Check all 8 neighboring cells
					for (let di = -1; di <= 1; di++) {
						for (let dj = -1; dj <= 1; dj++) {
							if (di !== 0 || dj !== 0) {
								let ni = (i + di + gridSize) % gridSize;
								let nj = (j + dj + gridSize) % gridSize;
								let next = cells[ni + nj * gridSize];
								cell.velocity += (disruption + 0.001) * (next.height - cell.height);
							}
						}
					}

					// Apply velocity and cushion
					cell.height += cell.velocity;
					cell.height += level;
					cell.velocity *= cushion;
					avgHeight += cell.height;
				}
			}
			avgHeight /= gridSize * gridSize;
			level = initialHeight - avgHeight / 1.3;
		}

		// 6. Handle Mouse Interactions
		function applyMouse() {
			if (mouseInteract) {
				let i = Math.floor((gridSize * mouseX) / width);
				let j = Math.floor((gridSize * mouseY) / height);

				if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
					let cell = cells[i + j * gridSize];

					// FIX: Drop the water column to 0.0 (absolute vacuum)
					// Math.abs(0.0 - 0.57) = 0.57 energy, which instantly triggers pure white!
					cell.height = 0.0;
					cell.velocity = 0;
				}
			}
		}

		// 7. Paint the Canvas
		function draw() {
			for (let i = 0; i < gridSize; i++) {
				for (let j = 0; j < gridSize; j++) {
					let cell = cells[i + j * gridSize];
					let x = i * cellWidth;
					let y = j * cellHeight;

					// FIX: Measure the ABSOLUTE energy distance from rest position
					// This treats underwater drops and upward crests with identical glow power!
					let waveEnergy = Math.abs(cell.height - initialHeight);

					// Boost the multiplier so the expanding ripples easily climb into the white zone
					let colorIndex = Math.floor(waveEnergy * 900);

					// Clamp safely between 0 (resting water) and 255 (dazzling white wake)
					colorIndex = Math.max(0, Math.min(255, colorIndex));

					c.fillStyle = colors[colorIndex];

					// Overlap slightly to prevent thin pixel grid dividers
					c.fillRect(x, y, cellWidth + 1.1, cellHeight + 2.5);
				}
			}

			if (mouseInteract) {
				const glowRadius = Math.max(10, Math.min(cellWidth, cellHeight) * 4.5);
				const gradient = c.createRadialGradient(
					mouseX,
					mouseY,
					0,
					mouseX,
					mouseY,
					glowRadius
				);
				gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
				gradient.addColorStop(0.35, 'rgba(240, 250, 255, 0.45)');
				gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

				c.fillStyle = gradient;
				c.fillRect(mouseX - glowRadius, mouseY - glowRadius, glowRadius * 2, glowRadius * 2);
			}
		}

		// 8. Main Render Loop
		function loop() {
			applyMouse();
			updatePhysics();
			draw();
			animationFrameId = requestAnimationFrame(loop);
		}

		// 9. Handle Window Resizing smoothly
		const handleResize = () => {
			const parent = canvas.parentElement;
			width = parent.clientWidth;
			height = parent.clientHeight;
			canvas.width = width;
			canvas.height = height;
			cellWidth = width / gridSize;
			cellHeight = height / gridSize;
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		initGrid();
		loop();

		const onTouchStart = (e) => {
			e.preventDefault();
			handleTouchStart(e);
		};

		const onTouchMove = (e) => {
			e.preventDefault();
			handleTouchMove(e);
		};

		const onTouchEnd = (e) => {
			e.preventDefault();
			handleTouchEnd();
		};

		canvas.addEventListener('touchstart', onTouchStart, { passive: false });
		canvas.addEventListener('touchmove', onTouchMove, { passive: false });
		canvas.addEventListener('touchend', onTouchEnd, { passive: false });
		canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
			canvas.removeEventListener('touchstart', onTouchStart);
			canvas.removeEventListener('touchmove', onTouchMove);
			canvas.removeEventListener('touchend', onTouchEnd);
			canvas.removeEventListener('touchcancel', onTouchEnd);
		};
	});

	function handleInteraction(clientX, clientY) {
		const rect = canvas.getBoundingClientRect();
		mouseX = clientX - rect.left;
		mouseY = clientY - rect.top;
	}

	// Mouse Event Handlers
	function handleMouseMove(e) {
		handleInteraction(e.clientX, e.clientY);
	}

	function handleMouseDown(e) {
		mouseInteract = true;
		handleMouseMove(e);
	}

	function handleMouseUp() {
		mouseInteract = false;
	}

	// Touch Event Handlers
	function handleTouchStart(e) {
		mouseInteract = true;
		if (e.touches && e.touches[0]) {
			handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
		}
	}

	function handleTouchMove(e) {
		if (e.touches && e.touches[0]) {
			handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
		}
	}

	function handleTouchEnd() {
		mouseInteract = false;
	}
</script>

<div class="canvas-container">
	<!-- Svelte 5 Event Directives -->
	<canvas
		bind:this={canvas}
		onmousemove={handleMouseMove}
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmouseleave={handleMouseUp}
	></canvas>

	<!-- Content slot allows you to put text/buttons OVER the water effect -->
	<div class="overlay">
		<slot />
	</div>
</div>

<style>
	.canvas-container {
		position: relative;
		width: 100vw;
		height: 80vh;
		/* Default to a large block so it has space if not put in a flex container */
		min-height: 400px;
		overflow: hidden;
		background: #0b0c0f;
		border-radius: 12px; /* Makes it a nice widget */
		border: 1px solid #1f2126;
	}

	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		cursor: crosshair;
	}

	.overlay {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
		pointer-events: none; /* Lets mouse clicks pass through to the canvas */
	}

	/* Make sure anything passed into the slot is interactive */
	.overlay > :global(*) {
		pointer-events: auto;
	}
</style>
