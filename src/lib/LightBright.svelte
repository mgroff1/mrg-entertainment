<script>
	import { onMount } from 'svelte';

	let canvas;
	let ctx;
	let animationId;

	// Dimensions and Grid
	let width = 0;
	let height = 0;
	let cols = 70;
	let rows = 25;
	let dots = [];

	// App State
	let selectedColor = $state('#3b82f6'); // Default to blue
	let isPoweredOn = $state(false);
	let isScattering = $state(false);
	let dotScale = $state(0.7); // Default medium

	let isDrawing = false;

	let neonFlicker = 1;

	function updateFlicker() {
		// 95% of the time, keep it perfectly bright
		if (Math.random() > 0.95) {
			// Drop brightness randomly between 50% and 90%
			neonFlicker = 0.5 + Math.random() * 0.2;
		} else {
			// Smoothly return back to full power
			neonFlicker += (1 - neonFlicker) * 0.2;
		}

		// Loop this function inside your requestAnimationFrame loop
	}

	const emptyColor = '#16191e';

	// Modernized Color Palette mapping to your site's theme
	const colors = [
		{ id: 'red', hex: '#8B0000' },
		{ id: 'blue', hex: '#003380' },
		{ id: 'green', hex: '#22c55e' },
		{ id: 'yellow', hex: '#ffea00' }, // Laser Yellow (shifted away from orange)
		{ id: 'orange', hex: '#ff5500' },
		{ id: 'purple', hex: '#8b5cf6' },
		{ id: 'white', hex: '#ffffff' },
		{ id: 'erase', hex: emptyColor }
	];

	function initGrid() {
		dots = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				dots.push({
					r,
					c,
					color: emptyColor,
					ox: 0,
					oy: 0 // offset X and Y for the scatter effect
				});
			}
		}
	}

	function handleResize() {
		if (!canvas) return;
		const isSmall = window.innerWidth <= 768;

		let nextCols = 70;
		let nextRows = 25;

		if (isSmall) {
			nextCols = 40;
			nextRows = 40;
		} else if (dotScale === 0.4) {
			nextCols = 200;
			nextRows = 80;
		}

		const parent = canvas.parentElement;
		width = parent.clientWidth;
		height = parent.clientHeight;
		canvas.width = width;
		canvas.height = height;

		if (nextCols !== cols || nextRows !== rows) {
			cols = nextCols;
			rows = nextRows;
			initGrid();
		}
	}

	function setDotScale(scale) {
		dotScale = scale;
		handleResize();
	}

	onMount(() => {
		ctx = canvas.getContext('2d', { alpha: false });

		function draw() {
			// Clear background
			ctx.fillStyle = '#0b0c0f';
			ctx.fillRect(0, 0, width, height);

			let cellW = width / cols;
			let cellH = height / rows;
			// Calculate dot radius based on screen size and selected scale (S/M/L)
			let radius = (Math.min(cellW, cellH) / 2) * dotScale;

			for (let i = 0; i < dots.length; i++) {
				let dot = dots[i];

				// Scatter Physics
				if (isScattering) {
					// Wander aimlessly
					dot.ox += (Math.random() - 0.5) * 5;
					dot.oy += (Math.random() - 0.5) * 5;
				} else {
					// Magnetic snap back to origin point slowly
					dot.ox *= 0.99;
					dot.oy *= 0.99;
				}

				let x = dot.c * cellW + cellW / 2 + dot.ox;
				let y = dot.r * cellH + cellH / 2 + dot.oy;

				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.fillStyle = dot.color;

				// TRUE GLOW: If powered on, add neon blur to colored pegs
				if (isPoweredOn && dot.color !== emptyColor) {
					// ... your 4-layer bright glowing code from before ...
					ctx.fillStyle = dot.color;
					ctx.shadowColor = dot.color;
					ctx.shadowBlur = 10 * neonFlicker;
					ctx.fillStyle = dot.color;
					ctx.fill();
				} else {
					// Powered off: Kill the glow and apply a 20% opacity alpha suffix
					ctx.shadowBlur = 0;

					if (dot.color === '#ffffff') {
						ctx.fillStyle = '#ffffff22'; // Dims white slightly more so it's greyish
					} else {
						ctx.fillStyle = `${dot.color}33`; // Appends '33' for ~20% opacity
					}
				}
				ctx.fill();
			}
			// requestAnimationFrame(updateFlicker);
			updateFlicker();
			animationId = requestAnimationFrame(draw);
		}

		handleResize();
		window.addEventListener('resize', handleResize);
		initGrid();
		draw();

		const onTouchStart = (e) => {
			e.preventDefault();
			handlePointerDown(e);
		};
		const onTouchMove = (e) => {
			e.preventDefault();
			paint(e);
		};
		const onTouchEnd = (e) => {
			e.preventDefault();
			handlePointerUp(e);
		};

		canvas.addEventListener('touchstart', onTouchStart, { passive: false });
		canvas.addEventListener('touchmove', onTouchMove, { passive: false });
		canvas.addEventListener('touchend', onTouchEnd, { passive: false });
		canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
			canvas.removeEventListener('touchstart', onTouchStart);
			canvas.removeEventListener('touchmove', onTouchMove);
			canvas.removeEventListener('touchend', onTouchEnd);
			canvas.removeEventListener('touchcancel', onTouchEnd);
		};
	});

	// --- Interaction Logic ---

	function paint(e) {
		if (!isDrawing) return;

		// Prevent default scrolling behavior on touch screens
		if (e.type === 'touchmove') e.preventDefault();

		const rect = canvas.getBoundingClientRect();
		// Support both mouse and touch events
		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const clientY = e.touches ? e.touches[0].clientY : e.clientY;

		let x = clientX - rect.left;
		let y = clientY - rect.top;

		let cellW = width / cols;
		let cellH = height / rows;

		let c = Math.floor(x / cellW);
		let r = Math.floor(y / cellH);

		// If within bounds, update the color
		if (r >= 0 && r < rows && c >= 0 && c < cols) {
			let idx = r * cols + c;
			if (dots[idx]) dots[idx].color = selectedColor;
		}
	}

	function handlePointerDown(e) {
		// Prevent default scrolling behavior on touch screens
		if (e.type === 'touchstart') e.preventDefault();

		isDrawing = true;
		paint(e); // Paint initial dot
	}

	function handlePointerUp(e) {
		// Check if the event exists before trying to access its type,
		// as mouseleave might not pass an event object in the same way
		if (e && e.type === 'touchend') e.preventDefault();

		isDrawing = false;
	}

	// --- Button Handlers ---
	function clearBoard() {
		dots.forEach((dot) => {
			dot.color = emptyColor;
			dot.ox = 0;
			dot.oy = 0;
		});
		isScattering = false;
	}
</script>

<div class="lite-brite-wrapper">
	<!-- Tools Dashboard -->
	<div class="dashboard">
		<div class="controls-group">
			<button
				class="util-btn"
				class:active={isPoweredOn}
				onclick={() => (isPoweredOn = !isPoweredOn)}
			>
				I/O
			</button>
			<button class="util-btn" onclick={clearBoard}> Reset </button>
			<button
				class="util-btn"
				class:active={isScattering}
				onclick={() => (isScattering = !isScattering)}
			>
				{isScattering ? 'Stop' : 'Release'}
			</button>
		</div>

		<!-- Color Palette -->
		<div class="palette">
			{#each colors as { id, hex }}
				<button
					class="color-btn"
					class:selected={selectedColor === hex}
					style="background-color: {hex};"
					aria-label="Select {id}"
					onclick={() => (selectedColor = hex)}
				>
					<!-- Erase visual helper -->
					{#if id === 'erase'}
						<span class="erase-icon">✕</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Size Controls -->
		<div class="controls-group size-controls">
			<button class="util-btn bulb" class:active={dotScale === 0.4} onclick={() => setDotScale(0.4)}
				>S</button
			>
			<button class="util-btn bulb" class:active={dotScale === 0.7} onclick={() => setDotScale(0.7)}
				>M</button
			>
			<button class="util-btn bulb" class:active={dotScale === 1.0} onclick={() => setDotScale(1.0)}
				>L</button
			>
		</div>
	</div>

	<!-- Main Canvas -->
	<div class="canvas-container">
		<canvas
			bind:this={canvas}
			onmousedown={handlePointerDown}
			onmousemove={paint}
			onmouseup={handlePointerUp}
			onmouseleave={handlePointerUp}
		></canvas>
	</div>
</div>

<style>
	.lite-brite-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		width: 100vw;
		padding: 20px;
		box-sizing: border-box;
	}

	/* --- Dashboard & Controls --- */
	.dashboard {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 94vw;
		background: #111317;
		padding: 15px 25px;
		border-radius: 12px;
		border: 1px solid #1f2126;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		gap: 20px;
	}

	.controls-group {
		display: flex;
		gap: 10px;
	}

	.util-btn {
		background: #1a1d24;
		color: #9ca3af;
		border: 1px solid #22262c;
		padding: 8px 16px;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.util-btn:hover {
		color: #fff;
		border-color: #3b82f6;
	}

	.util-btn.active {
		background: #3b82f6;
		color: #fff;
		border-color: #60a5fa;
		box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
	}

	.bulb {
		padding: 8px 12px;
	}

	/* --- Palette --- */
	.palette {
		display: flex;
		gap: 12px;
		background: #0b0c0f;
		padding: 10px 20px;
		border-radius: 50px;
		border: 1px solid #1a1d24;
		box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.color-btn {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		border: 2px solid #22262c;
		cursor: pointer;
		box-shadow:
			inset 0 2px 5px rgba(255, 255, 255, 0.2),
			inset 0 -2px 5px rgba(0, 0, 0, 0.4);
		transition:
			transform 0.2s,
			border-color 0.2s,
			box-shadow 0.2s;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.color-btn:hover {
		transform: scale(1.15);
	}

	.color-btn.selected {
		transform: scale(1.2);
		border-color: #fff;
		box-shadow: 0 0 10px currentColor;
	}

	.erase-icon {
		color: #6b7280;
		font-size: 1rem;
		font-weight: bold;
		line-height: 1;
	}

	/* --- Canvas Area --- */
	.canvas-container {
		width: 100%;
		max-width: 97vw;
		height: 70vh;
		min-height: 70vh;
		background: #0b0c0f;
		border-radius: 12px;
		border: 1px solid #1f2126;
		overflow: hidden;
		position: relative;
		box-shadow:
			inset 0 0 40px rgba(0, 0, 0, 0.9),
			0 20px 40px rgba(0, 0, 0, 0.4);
	}

	canvas {
		width: 100%;
		height: 100%;
		display: block;
		cursor: crosshair;
		/* Touch action none prevents scrolling on mobile while trying to draw */
		touch-action: none;
	}

	/* Responsive styling */
	@media (max-width: 768px) {
		.dashboard {
			justify-content: center;
		}
		.palette {
			order: -1; /* Puts palette on top row on mobile */
			width: 100%;
			justify-content: space-around;
		}
	}
</style>
