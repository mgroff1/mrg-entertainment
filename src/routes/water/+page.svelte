<script>
	// Import the component we just made in the lib folder
	import RippleCanvas from '$lib/Water.svelte';
</script>

<!-- Use it as a wrapper around your content! -->
<RippleCanvas>
	<div class="hero-content">
		<h1>Building Apps with Purpose</h1>
		<p>Clean, intuitive experiences...</p>
	</div>
</RippleCanvas>

<style>
	/* Add some basic styling for the text so it looks nice over the water */
	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: white;
		text-align: center;
		pointer-events: none; /* Let clicks pass through the empty space to the water */
	}

	h1,
	p {
		pointer-events: auto; /* Make the actual text highlightable/clickable */
		text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8); /* Helps the text pop against the waves */
	}
</style>
