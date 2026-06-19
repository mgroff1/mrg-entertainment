<script>
import bgImageOne from '$lib/images/acc_one.png';
import bgImage from '$lib/images/circuit.png';
import icon from '$lib/images/icon.png';
</script>

<section class="hero">
  <h1>Apps with Purpose.</h1>
  <p>Clean, intuitive mobile experiences crafted with passion.</p>

  <a href="/apps" class="cta">Explore My Apps</a>
</section>

<section class="apps">
  <div class="card">
    <div class="card-content">
      <div class="icon-placeholder"></div>

      <h2>Accretion: Planetary Sandbox</h2>

      <p>
        A physics‑driven planetary simulation where you create, collide, sculpt, and evolve entire
        solar systems. Build worlds, experiment with gravity, and watch your universe take shape.
      </p>

      <div class="buttons">
        <a
          class="btn"
          href="https://play.google.com/store/apps/details?id=com.mrg.planetary_sandbox"
          target="_blank"
          rel="noopener"
        >
          Google Play
        </a>

        <a class="btn secondary" href="#">
          Learn More
        </a>
      </div>
    </div>

    <div class="card-image">
      <!-- Replace with your screenshot -->
      <img class="image"src={bgImageOne} alt="Accretion Screenshot" />
    </div>
  </div>
</section>

<style>
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

