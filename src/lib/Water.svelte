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
		const c = canvas.getContext('2d', { alpha: false }); // alpha: false optimizes rendering for solid backgrounds

		// 2. Physics Constants (from your original code!)
		const disruption = 0.009;
		const cushion = 0.96;
		const initialHeight = 0.57;
		const gridSize = 200;

		let level = 0;
		let cells = [];
		let cellWidth = 0;
		let cellHeight = 0;

		// 3. Pre-calculate Custom Brand Colors
		// Instead of pure blue, we transition from your dark theme (#0b0c0f) to bright blue (#3b82f6)
		const colors = [];
		for (let i = -10; i < 255; i++) {
			let ratio = Math.max(0, Math.min(1, i / 255));

			// We are adding an exponent here (ratio * ratio).
			// This keeps the water darker for longer, but makes the extreme peaks shoot up in brightness!
			let intenseRatio = Math.pow(ratio, 2.5);

			// Interpolate from dark (#0b0c0f) to a bright glowing neon cyan/white (180, 240, 255)
			let r = Math.floor(11 + (59 - 11) * intenseRatio);
			let g = Math.floor(12 + (133 - 12) * intenseRatio);
			let b = Math.floor(15 + (255 - 15) * intenseRatio);

			colors.push(`rgb(${r}, ${g}, ${b})`);
		}

		// 4. Initialize the Grid
		function initGrid() {
			cells = [];
			for (let i = 0; i < gridSize; i++) {
				for (let j = 0; j < gridSize; j++) {
					// Drop a "pebble" right in the dead center on load
					let isCenter = i === Math.floor(gridSize / 2) && j === Math.floor(gridSize / 2);
					cells.push({
						height: isCenter ? 2 : initialHeight,
						velocity: 0
					});
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
								// Modulo (%) allows the waves to wrap around the edges seamlessly
								let ni = (i + di + gridSize) % gridSize;
								let nj = (j + dj + gridSize) % gridSize;
								let next = cells[ni + nj * gridSize];

								// Pull cell towards its neighbors' heights
								cell.velocity += (disruption + 0.001) * (next.height - cell.height);
							}
						}
					}

					// Apply velocity and cushion (friction)
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

				// Safety check to ensure we are inside the grid
				if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
					let cell = cells[i + j * gridSize];
					cell.height = 5.5; // Disturbs the water
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

					// Map the height to an index in our pre-calculated colors array
					let colorIndex = Math.floor(cell.height * 255);
					// Clamp index between 0 and 264 to prevent array out-of-bounds errors
					colorIndex = Math.max(0, Math.min(colors.length - 1, colorIndex));

					c.fillStyle = colors[colorIndex];
					// We add +1.5 to width/height to overlap the boxes slightly and hide grid lines
					c.fillRect(x, y, cellWidth + 1.1, cellHeight + 2.5);
				}
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
			// Look at the parent element's dimensions instead of the whole window
			const parent = canvas.parentElement;
			width = parent.clientWidth;
			height = parent.clientHeight;

			canvas.width = width;
			canvas.height = height;

			cellWidth = width / gridSize;
			cellHeight = height / gridSize;
		};

		// Kick everything off!
		handleResize();
		window.addEventListener('resize', handleResize);
		initGrid();
		loop();

		// Cleanup when component is destroyed
		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	});

	// Mouse Event Handlers
	function handleMouseMove(e) {
		const rect = canvas.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}

	function handleMouseDown(e) {
		mouseInteract = true;
		handleMouseMove(e); // Trigger immediate splash
	}

	function handleMouseUp() {
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
