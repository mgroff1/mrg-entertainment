<section class="hero">
	<h1>Apps with Purpose.</h1>
	<p>Clean, intuitive mobile experiences crafted with passion.</p>
	<a href="/apps" class="cta">Explore My Apps</a>
</section>

<section class="apps">
	<h2>Featured Apps</h2>

	<div class="grid">
		<div class="card">
			<div class="icon-placeholder"></div>
			<h3>App Name</h3>
			<p>Short description of what the app does.</p>
			<div class="buttons">
				<a class="btn" href="#">Google Play</a>
				<a class="btn secondary" href="#">Learn More</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 6rem 1rem;
	}

	.hero h1 {
		font-size: 3rem;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.hero p {
		color: #9ca3af;
		margin-bottom: 2rem;
	}

	.cta {
		padding: 0.8rem 1.6rem;
		background: #3b82f6;
		color: white;
		border-radius: 6px;
		text-decoration: none;
		transition: 0.2s;
	}

	.cta:hover {
		background: #60a5fa;
	}

	.apps {
		margin-top: 4rem;
	}

	.apps h2 {
		text-align: center;
		margin-bottom: 2rem;
		color: #fff;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 2rem;
	}

	.card {
		background: #1a1d22;
		padding: 1.5rem;
		border-radius: 10px;
		border: 1px solid #22262c;
		transition: 0.2s;
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: #3b82f6;
	}

	.icon-placeholder {
		width: 64px;
		height: 64px;
		background: #22262c;
		border-radius: 12px;
		margin-bottom: 1rem;
	}

	.buttons {
		margin-top: 1rem;
		display: flex;
		gap: 0.5rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		background: #3b82f6;
		color: white;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.btn.secondary {
		background: #22262c;
		color: #d1d5db;
	}

	.btn:hover {
		opacity: 0.9;
	}
</style>
