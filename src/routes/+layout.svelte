<script>
	export let data;
</script>

<div class="page">
	<header class="header">
		<div class="logo">MRGEntertainment</div>
		<nav>
			<a href="/">Home</a>
			<a href="/apps">Apps</a>
			<a href="/about">About</a>
			<a href="/contacts">Contact</a>
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<footer class="footer">© 2026 MRGEntertainment</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background: #0d0f12; /* Deep charcoal background */
		color: #d1d5db; /* Light gray body text */
	}

	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* --- HEADER (The Fix Area) --- */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: stretch; /* CRUCIAL: Forces children (nav) to stretch top-to-bottom */
		height: 4.5rem; /* Set explicit height instead of vertical padding */
		padding: 0 2rem; /* Left/Right padding only */
		background: #111418; /* Header background */
		border-bottom: 1px solid #1a1d22;
	}

	.logo {
		font-size: 1.3rem;
		font-weight: 600;
		color: #3b82f6; /* Primary Electric Blue */
		display: flex;
		align-items: center; /* Vertically centers logo inside the header height */
	}

	nav {
		display: flex;
		align-items: stretch; /* Forces inner links to match nav height */
	}

	nav a {
		display: flex;
		align-items: center; /* Perfectly centers text vertically */
		justify-content: center; /* Perfectly centers text horizontally */
		height: 100%; /* Spans full height of the header */
		padding: 0 10px; /* Your exact 10px side padding */
		font-size: 1.1rem;
		color: #9ca3af; /* Muted gray default links */
		text-decoration: none;
		transition: all 0.2s ease-in-out; /* Smooth hover transition */
		border: 0.5px solid black;
	}

	/* --- HOVER EFFECTS --- */
	nav a:hover {
		color: #ffffff; /* Turns white on hover */
		background: #22262c; /* Hover surface color */
		/* Adds your optional blue glow at the bottom of the active/hovered link */
		box-shadow:
			inset 0 -3px 0 0 #3b82f6,
			0 4px 20px rgba(59, 130, 246, 0.2);
		border: 0.5px solid gray;
	}

	/* --- MAIN & FOOTER --- */
	main {
		flex: 1;
		padding: 2rem;
	}

	/* Example test card styling using your theme */
	.test {
		background: #1a1d22; /* Card background */
		padding: 1.5rem;
		border-radius: 8px;
		color: #ffffff; /* Pure white text */
		border: 1px solid #22262c;
	}

	.footer {
		text-align: center;
		padding: 1.5rem;
		background: #111418; /* Footer background */
		border-top: 1px solid #1a1d22;
		color: #9ca3af; /* Muted gray text */
		font-size: 0.9rem;
	}
</style>
