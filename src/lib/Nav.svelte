<script>
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';

  let open = false;

  function navigate(path) {
    open = false;
    goto(path);
  }
</script>

<nav class="nav">
  <div class="logo">
    <a href="/" on:click|preventDefault={() => navigate('/')}>MRGEntertainment</a>
  </div>

  <!-- Desktop menu -->
  <div class="links desktop">
    <a href="/" on:click|preventDefault={() => navigate('/')}>Home</a>
    <a href="/apps" on:click|preventDefault={() => navigate('/apps')}>Apps</a>
    <a href="/about" on:click|preventDefault={() => navigate('/about')}>About</a>
    <a href="/contacts" on:click|preventDefault={() => navigate('/contacts')}>Contact</a>
  </div>

  <!-- Hamburger Fixed: 3 lines instead of 4 to match CSS animation -->
  <button class="hamburger" on:click={() => (open = !open)} aria-label="Toggle Menu">
    <div class:open={open}></div>
    <div class:open={open}></div>
    <div class:open={open}></div>
  </button>
 
  <!-- Mobile dropdown -->
  {#if open}
    <div class="dropdown mobile" transition:fly={{ y: -10, duration: 200 }}>
      <a href="/" on:click|preventDefault={() => navigate('/')}>Home</a>
      <a href="/apps" on:click|preventDefault={() => navigate('/apps')}>Apps</a>
      <a href="/about" on:click|preventDefault={() => navigate('/about')}>About</a>
      <a href="/contact" on:click|preventDefault={() => navigate('/contact')}>Contact</a>
    </div>
  {/if}
</nav>

<style>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #0b0c0f;
    border-bottom: 1px solid #1a1d24;
    position: relative; /* Sticky not needed in Flex layout */
    z-index: 50;
  }

  .logo a {
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
  }

  .links a,
  .dropdown a {
    margin-left: 20px;
    cursor: pointer;
    color: #e5e7eb;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s;
  }

  .links a:hover,
  .dropdown a:hover {
    color: #3b82f6;
  }

  .desktop {
    display: flex;
  }

  .mobile {
    display: none;
  }

  .hamburger {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    display: none;
    flex-direction: column;
    gap: 5px; /* Slightly wider gap for cleaner look */
  }

  .hamburger div {
    width: 24px;
    height: 2px; /* Thinner lines */
    background: #e5e7eb;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .hamburger div.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger div.open:nth-child(2) {
    opacity: 0;
  }
  .hamburger div.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .dropdown {
    position: absolute;
    top: 65px;
    right: 24px;
    background: #111317;
    border: 1px solid #1f2126;
    border-radius: 8px;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    width: 160px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }

  .dropdown a {
    padding: 12px 16px;
    margin: 0;
  }

  .dropdown a:hover {
    background: #1a1d24;
  }

  @media (max-width: 768px) {
    .desktop { display: none; }
    .hamburger { display: flex; }
    .mobile { display: flex; } /* Changed to flex to match vertical layout */
  }
</style>

