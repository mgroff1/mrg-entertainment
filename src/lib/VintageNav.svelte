<script>
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	// Svelte 5 state for the menu toggle
	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function navigate(e, path) {
		e.preventDefault();
		isOpen = false; // Close menu when navigating
		goto(`${base}${path}`);
	}

	// Splitting your links into the left and right lists
	const leftLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Apps', path: '/apps' },
		{ name: 'About', path: '/about' }
	];

	const rightLinks = [
		{ name: 'Contact', path: '/contacts' },
		{ name: 'LightBright', path: '/lightbright' }, // Update with real links
		{ name: 'Fluid', path: '/water' }
	];

	const centerLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Apps', path: '/apps' },
		{ name: 'About', path: '/about' },
		{ name: 'Contact', path: '/contacts' },
		{ name: 'LightBright', path: '/lightbright' },
		{ name: 'Fluid', path: '/water' }
	];
</script>

<header class="vintage-header">
	<div class="nav-container">
		<!-- Brand Logo/Text -->
		<div class="logo-wrapper">
			<a href={`${base}/`} onclick={(e) => navigate(e, '/')} class="logo-text">
				<span class="full-text">MRG Entertainment</span>
				<span class="short-text">MRG</span>
			</a>
		</div>

		<!-- DESKTOP ONLY: Left List -->
		<div class="list-wrapper list-left desktop-only">
			{#if isOpen}
				<ul class="dropdown-ul" transition:slide={{ duration: 1200 }}>
					{#each leftLinks as link}
						<li class="dd">
							{#if link.path.startsWith('http')}
								<a href={link.path} target="_blank" rel="noopener noreferrer" onclick={toggleMenu}
									>{link.name}</a
								>
							{:else}
								<a href={`${base}${link.path}`} onclick={(e) => navigate(e, link.path)}
									>{link.name}</a
								>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- ALWAYS VISIBLE: Center Pie Button -->
		<div class="center-wrapper">
			<button class="pie-button" class:open={isOpen} onclick={toggleMenu} aria-label="Toggle Menu">
				<div class="hoop"></div>
				<div class="pie-container">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="pie-icon"
					>
						<path
							d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"
						/>
					</svg>
				</div>
			</button>
		</div>

		<!-- DESKTOP ONLY: Right List -->
		<div class="list-wrapper list-right desktop-only">
			{#if isOpen}
				<ul class="dropdown-ul" transition:slide={{ duration: 1200 }}>
					{#each rightLinks as link}
						<li class="dd">
							{#if link.path.startsWith('http')}
								<a href={link.path} target="_blank" rel="noopener noreferrer" onclick={toggleMenu}
									>{link.name}</a
								>
							{:else}
								<a href={`${base}${link.path}`} onclick={(e) => navigate(e, link.path)}
									>{link.name}</a
								>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- MOBILE ONLY: Center Combined List -->
		<div class="list-wrapper list-center mobile-only">
			{#if isOpen}
				<ul class="dropdown-ul" transition:slide={{ duration: 1200 }}>
					{#each centerLinks as link}
						<li class="dd">
							{#if link.path.startsWith('http')}
								<a href={link.path} target="_blank" rel="noopener noreferrer" onclick={toggleMenu}
									>{link.name}</a
								>
							{:else}
								<a href={`${base}${link.path}`} onclick={(e) => navigate(e, link.path)}
									>{link.name}</a
								>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</header>

<style>
	/* Base Header Bar */
	.vintage-header {
		position: relative;
		width: 100%;
		height: 70px;
		background: #0b0c0f;
		border-bottom: 1px solid #1a1d24;
		display: flex;
		justify-content: center;
		z-index: 100;
	}

	.nav-container {
		position: relative;
		width: 100%;
		max-width: 1000px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}

	/* Logo Brand Styles */
	.logo-wrapper {
		position: absolute;
		left: 20px;
		height: 100%;
		display: flex;
		align-items: center;
		z-index: 105;
	}

	.logo-text {
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #e5e7eb;
		text-decoration: none;
		transition:
			color 0.3s,
			transform 0.2s;
	}

	.logo-text:hover {
		color: #3b82f6;
		transform: scale(1.02);
	}

	.logo-text .short-text {
		display: inline;
	}

	.logo-text .full-text {
		display: none;
	}

	@media (min-width: 600px) {
		.logo-text .short-text {
			display: none;
		}
		.logo-text .full-text {
			display: inline;
		}
	}

	@media (max-width: 380px) {
		.logo-wrapper {
			display: none;
		}
	}

	/* Center Button (The Pie) */
	.center-wrapper {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 10px;
		z-index: 110;
	}

	.pie-button {
		position: relative;
		background: transparent;
		width: 76px;
		height: 76px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: none;
		padding: 0;
		outline: none;
	}

	.hoop {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 6px solid #1a1d24;
		border-top: 6px solid #3b82f6;
		border-bottom: 6px solid #3b82f6;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
		transition:
			transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			border-color 1.2s;
	}

	.pie-container {
		position: relative;
		z-index: 2;
		width: 52px;
		height: 52px;
		background: #111317;
		border-radius: 50%;
		border: 3px dashed #4b5563;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
		transition:
			transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1),
			border-color 1.2s;
	}

	.pie-icon {
		width: 30px;
		height: 30px;
		color: #e5e7eb;
		transition: color 1.2s;
	}

	.pie-button:hover .hoop {
		border-top-color: #60a5fa;
		border-bottom-color: #60a5fa;
	}
	.pie-button:hover .pie-container {
		border-color: #9ca3af;
	}

	.pie-button.open .hoop {
		transform: rotate(-180deg);
		border-left-color: #3b82f6;
		border-right-color: #3b82f6;
		border-top-color: #1a1d24;
		border-bottom-color: #1a1d24;
	}
	.pie-button.open .pie-container {
		transform: rotate(360deg) scale(0.85);
		border-color: #3b82f6;
	}
	.pie-button.open .pie-icon {
		color: #3b82f6;
	}

	/* Dropdown Lists */
	.list-wrapper {
		position: absolute;
		top: 70px;
		width: 200px;
		z-index: 90;
	}

	.list-left {
		left: 20px;
	}
	.list-right {
		right: 20px;
	}
	.list-center {
		left: 50%;
		transform: translateX(-50%);
	}

	.dropdown-ul {
		list-style: none;
		padding: 20px 0 0 0;
		margin: 0;
	}

	.dd {
		margin-bottom: 10px;
		background: #16191e;
		border: 1px solid #22262c;
		border-radius: 8px;
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	}

	.dd a {
		display: block;
		padding: 12px 16px;
		color: #9ca3af;
		text-decoration: none;
		font-weight: 500;
		text-align: center;
		transition: color 0.2s;
	}

	.list-left .dd:hover {
		background: #1a1d24;
		border-color: #3b82f6;
		transform: translateX(10px) scale(1.05);
	}
	.list-right .dd:hover {
		background: #1a1d24;
		border-color: #3b82f6;
		transform: translateX(-10px) scale(1.05);
	}
	.list-center .dd:hover {
		background: #1a1d24;
		border-color: #3b82f6;
		transform: scale(1.05);
	}
	.dd:hover a {
		color: #fff;
	}

	/* --- RESPONSIVE TOGGLES --- */

	/* Hide the mobile list by default on desktop */
	.mobile-only {
		display: none;
	}

	/* When the screen is 600px or smaller... */
	@media (max-width: 600px) {
		/* Hide the left and right lists */
		.desktop-only {
			display: none;
		}
		/* Show the center list */
		.mobile-only {
			display: block;
		}
		/* Adjust the wrapper size for mobile */
		.list-wrapper {
			width: 140px;
		}
	}
</style>
