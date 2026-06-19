<script>
  import { onMount, onDestroy } from "svelte";

  export let items = []; // [{ image, title, description }]
  export let interval = 5000; // auto-rotate ms (set to 0 to disable)

  let current = 0;
  let timer;

  function next() {
    if (!items || items.length === 0) return;
    current = (current + 1) % items.length;
  }

  function prev() {
    if (!items || items.length === 0) return;
    current = (current - 1 + items.length) % items.length;
  }

  onMount(() => {
    if (interval > 0 && items && items.length) {
      timer = setInterval(next, interval);
    }
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  
</script>

<div class="carousel">
  {#each items as item, i}
    <div class="slide" class:active={i === current}>
      <img src={item.image} alt={item.title} />

      <div class="content">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  {/each}

  <button class="nav prev" aria-label="Previous slide" on:click={prev}>‹</button>
  <button class="nav next" aria-label="Next slide" on:click={next}>›</button>
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    max-width: 900px;
    height: 420px;
    margin: auto;
    overflow: hidden;
    border-radius: 12px;
    background: #0f1115;
    border: 1px solid #22262c;
  }

  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.6s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .slide.active {
    opacity: 1;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    color: white;
  }

  .content h2 {
    margin: 0 0 6px 0;
    font-size: 1.6rem;
  }

  .content p {
    margin: 0;
    opacity: 0.9;
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    background: rgba(0,0,0,0.4);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 8px 14px;
    cursor: pointer;
    border-radius: 6px;
    pointer-events: auto;
  }

  .prev { 
    left: 10px; 
  }
  .next { 
    right: 10px; 

  }

  .nav:hover {
    background: rgba(0,0,0,0.7);
  }
</style>
