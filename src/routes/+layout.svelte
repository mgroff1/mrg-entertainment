<script>
	import Nav from '$lib/Nav.svelte';
</script>

<div class="app-layout">
	<Nav />

	<!-- The main content area flexes to fill the space between Nav and Footer -->
	<main class="content">
		<slot />
	</main>

	<footer class="footer">© 2026 MRGEntertainment</footer>
</div>

<style>
	/* Apply strict sizing and hidden overflow to the body globally */
	:global(body) {
		position: absolute;
		margin: 0;
		padding: 0;
		background: #0b0c0f;
		color: #e5e7eb;
		font-family: system-ui, sans-serif;
		overflow-x: hidden !important;
		overflow-y: auto !important;
	}

	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Changed to min-height to allow vertical scrolling */
	}

	.content {
		flex: 1; /* Takes up all available space */
		display: flex;
		flex-direction: column;
		width: 99.8vw;
		box-sizing: border-box;
	}

	.footer {
		text-align: center;
		padding: 1rem;
		background: #111418;
		border-top: 1px solid #1a1d22;
		color: #9ca3af;
		font-size: 0.9rem;
		width: 100%;
		/* No absolute positioning or massive margins needed anymore */
	}
</style>
