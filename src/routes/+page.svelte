
<script>
  import { goto } from '$app/navigation';
</script>

<div class="home-container">
  <section class="hero">
    <div class="inner">
      <h1>Building Apps with Purpose</h1>
      <p class="tagline">
        Clean, intuitive experiences crafted with intention — from real‑world tools to creative sandboxes.
      </p>

      <button class="cta" onclick={() => goto('/apps')}>
        Explore My Apps
      </button>
    </div>
  </section>

  <section class="apps-overview">
    <h2>What I Build</h2>

    <div class="app-list">
      <div class="app-item">
        <h3>RoommateRep</h3>
        <p>
          A trust‑building platform for roommates, landlords, and renters. Closed testing is underway.
        </p>
      </div>

      <div class="app-item">
        <h3>Accretion</h3>
        <p>
          A physics‑driven planetary sandbox where you create, collide, and evolve entire solar systems.
        </p>
      </div>

      <div class="app-item">
        <h3>Circuit Logic</h3>
        <p>
          A minimalist circuit‑simulation puzzle game with progressive challenges and clean design.
        </p>
      </div>
    </div>

    <button class="cta secondary" onclick={() => goto('/apps')}>
      Explore My Apps
    </button>
  </section>

  <section class="about-preview">
    <h2>About Me</h2>
    <p>
      I’m an independent developer focused on building meaningful digital experiences — apps that feel good,
      solve real problems, and spark curiosity. Whether it’s a physics sandbox or a practical tool like
      RoommateRep, I design with clarity, intention, and a modern aesthetic.
    </p>

    <a href="/about" class="link">Learn more</a>
  </section>

  <section class="blog-preview">
    <h2>From the Blog</h2>
    <p class="empty">No posts yet — updates coming soon.</p>

    <a href="/blog" class="link">Visit the blog</a>
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
<!-- <style>
  /* === YOUR EXACT COLOR SCHEME (kept intact) === */

  .hero {
    text-align: center;
    padding: 1rem 1rem;
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

  /* === FEATURED APP SECTION === */

  .apps {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    background: #1a1d22;
    padding: 1.2rem;
    border-radius: 10px;
    border: 1px solid #22262c;
    transition: 0.2s;
    /* max-width: 100vh; */
    width: 100%;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: #3b82f6;
  }

  .card-content {
    flex: 1 1 320px;
    min-width: 260px;
  }

  .card-content h2 {
    color: #fff;
    margin-bottom: 0.5rem;
  }

  .card-content p {
    color: #9ca3af;
    line-height: 1.6;
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

  /* .card-image {
    flex: 1 1 100vh;
   min-width: 520px;
    min-height: 420px;
    background: #0f1115;
    border-radius: 10px;
    border: 1px solid #22262c;
    background-size: cover;
    background-position: center;
	padding:1rem;
  } */

  .image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 10px;
  }

  /* @media (max-width: 600px) {
    .card-image {
      min-width: 80%;
      min-height: 300px;
    }
  } */
</style>
 -->
