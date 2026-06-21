<script lang="ts">
  export type Slide = {
    image: string;
    title: string;
    description: string;
  };

  // Svelte 5 Props Rune
  let { items = [], interval = 10000 } = $props<{ items: Slide[], interval?: number }>();
  
  // Svelte 5 Reactive State Rune
  let current = $state(0); 

  function next() {
    if (!items || items.length === 0) return;
    current = (current + 1) % items.length;
  }

  function prev() {
    if (!items || items.length === 0) return;
    current = (current - 1 + items.length) % items.length;
  }
</script>

<div class="carousel">
  <div class="slides-container">
    {#each items as item, i}
      <div class="slide" class:active={i === current}>
        <div class="content">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div class="image-wrapper">
          <img src={item.image} alt={item.title} />
        </div>
      </div>
    {/each}
  </div>

  <div class="controls-layer">
    <button class="nav prev" aria-label="Previous slide" onclick={prev}>‹</button>
    <button class="nav next" aria-label="Next slide" onclick={next}>›</button>
  </div>
</div>

<style lang="css">
  .carousel {
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    max-height: 500px; /* Limits max height on large screens */
    overflow: hidden;
    border-radius: 12px;
    background: #0f1115;
    border: 1px solid #22262c;
  }

  .slides-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s ease, visibility 0.6s ease;
    display: flex;
    flex-direction: row; 
  }

  .slide.active {
    opacity: 1;
    visibility: visible;
  }

  .content {
    flex: 0 0 35%; 
    color: white;
    display: flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center; /* Nicely centers text vertically */
    background: #16191e;
    box-sizing: border-box;
    text-align: center;
  }

  .content h2 {
    margin: 0 0 12px 0;
    font-size: 1.6rem;
  }

  .content p {
    margin: 0;
    opacity: 0.8;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .image-wrapper {
    flex: 1; /* Takes up all remaining space naturally */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .controls-layer {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 2rem;
    padding: 4px 14px 8px;
    cursor: pointer;
    border-radius: 6px;
    pointer-events: auto;
    transition: background 0.2s;
  }

  .prev { left: 15px; }
  .next { right: 15px; }

  .nav:hover { background: rgba(0,0,0,0.8); }

  /* Cleaner responsive handling */
  @media (max-width: 768px), (orientation: portrait) {
    .slide {
      flex-direction: column;
    }

    .content {
      flex: 0 0 auto;
      width: 100%;
      padding: 1.5rem;
      height: auto;
    }

    .image-wrapper {
      flex: 1; /* Fills remaining vertical space */
      width: 100%;
      padding: 1rem;
    }
    
    .content h2 {
      font-size: 1.4rem;
    }
  }
</style>