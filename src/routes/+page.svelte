<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
</script>

<div class="home-container">
	<section class="hero">
		<div class="inner">
			<h1>Building Apps with Purpose</h1>
			<p class="tagline">
				Clean, intuitive experiences crafted with intention — from real‑world tools to creative
				sandboxes.
			</p>

			<button class="cta" onclick={() => goto(`${base}/apps`)}> Explore My Apps </button>
		</div>
	</section>

	<section class="apps-overview">
		<h2>What I Build</h2>

		<div class="app-list">
			<div class="app-item">
				<h3>RoommateRep</h3>
				<p>
					A trust‑building platform for roommates, landlords, and renters. Closed testing is
					underway.
				</p>
			</div>

			<div class="app-item">
				<h3>Accretion</h3>
				<p>
					A physics‑driven planetary sandbox where you create, collide, and evolve entire solar
					systems.
				</p>
			</div>

			<div class="app-item">
				<h3>Circuit Logic</h3>
				<p>
					A minimalist circuit‑simulation puzzle game with progressive challenges and clean design.
				</p>
			</div>
		</div>

		<button class="cta secondary" onclick={() => goto(`${base}/apps`)}> Explore My Apps </button>
	</section>

	<section class="about-preview">
		<h2>About Me</h2>
		<p>
			I’m an independent developer focused on building meaningful digital experiences — apps that
			feel good, solve real problems, and spark curiosity. Whether it’s a physics sandbox or a
			practical tool like RoommateRep, I design with clarity, intention, and a modern aesthetic.
		</p>

		<a href={`${base}/about`} class="link">Learn more</a>
	</section>

	<section class="blog-preview">
		<h2>From the Blog</h2>
		<p class="empty">No posts yet — updates coming soon.</p>

		<!-- <a href="/blog" class="link">Visit the blog</a> -->
	</section>
</div>

<style>
	.home-container {
		width: 100%;
	}

	.hero {
		padding: 100px 20px;
		text-align: center;
		background: radial-gradient(circle at top, #1a1d24, #0b0c0f);
	}

	.hero h1 {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 12px;
		color: #fff;
	}

	.tagline {
		font-size: 1.2rem;
		opacity: 0.8;
		max-width: 600px;
		margin: 0 auto 30px auto;
	}

	.cta {
		background: #3b82f6;
		color: white;
		padding: 14px 28px;
		border-radius: 8px;
		border: none;
		font-size: 1.1rem;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.cta:hover {
		background: #2563eb;
	}

	.cta.secondary {
		margin-top: 20px;
		background: #1f2937;
	}

	.cta.secondary:hover {
		background: #374151;
	}

	section {
		padding: 60px 20px;
		max-width: 900px;
		margin: 0 auto;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 20px;
		color: #fff;
	}

	.app-list {
		display: grid;
		gap: 30px;
		margin-bottom: 20px;
	}

	.app-item {
		background: #111317;
		padding: 24px;
		border-radius: 10px;
		border: 1px solid #1f2126;
		transition: border-color 0.2s ease;
	}

	.app-item:hover {
		border-color: #3b82f6;
	}

	.app-item h3 {
		margin-bottom: 8px;
		color: #fff;
	}

	.app-item p {
		opacity: 0.8;
	}

	.about-preview p,
	.blog-preview p {
		opacity: 0.85;
		line-height: 1.6;
	}

	.link {
		display: inline-block;
		margin-top: 12px;
		color: #3b82f6;
		text-decoration: none;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
