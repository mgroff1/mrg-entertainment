<!-- Inside page.svelte -->
<script>
  import Carousel from '$lib/Carousel.svelte';
  
  import bgImageOne from '$lib/images/acc_one.png';
  import celestial_realm from '$lib/images/cr.png';
  import cipher from '$lib/images/cipher.png';
  import icon from '$lib/images/icon.png';
  import dreamIt from '$lib/images/dreamit.png';
  import roommateRep from '$lib/images/rr.png';

  const slides = [
    {
      image: bgImageOne,
      title: "Accretion: Planetary Sandbox ",
      description: "A physics‑driven space sandbox where you build solar systems, collide planets, tweak gravity, and watch worlds form in real time. Accretion turns astrophysics into a creative playground.",
      link: "https://play.google.com/store/apps/details?id=com.mrg.planetary_sandbox"
    },
    {
      image: celestial_realm,
      title: "Celestial Realm: A Tarot Guide",
      description: "A serene, cosmic‑themed tarot reference that helps you learn, explore, and understand every card with clarity and ease.",
      link: "https://play.google.com/store/apps/details?id=com.mick.tarotreading"
    },
    {
      image: cipher,
      title: "Cipher: A Guide, A Reading, A Dream",
      description: "A mystical all‑in‑one tool offering tarot readings, daily guidance, and dream interpretation in a beautifully intuitive experience.",
      link: "https://play.google.com/store/apps/details?id=com.mrg.innercouncil"
    },
    {
      image: roommateRep,
      title: "Roommate Rep: A Roommate Reputation Tracker",
      description: "A simple, trustworthy way to build a rental reputation, verify yourself, and show landlords or roommates a clean, credible profile.",
      link: "https://play.google.com/store/apps/details?id=com.roomaterep.roomate_rep"
    },
    {
      image: dreamIt,
      title: "Dream It: A Dream Journal and Interpretation App",
      description: "A modern dream journal that tracks symbols, emotions, themes, and patterns, helping you understand your subconscious over time.",
      link: "https://play.google.com/store/apps/details?id=com.dreamitapp.dreamit"
    },
    {
      image: icon,
      title: "Custom Scenarios",
      description: "Build your own solar systems and test physics.",
      link: "https://google.com"
    }
  ];
</script>

<div class="carousel-container">
  <Carousel items={slides} />
</div>
<style>
  .carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* Replaced min-height with height so the Carousel's height: 100% rule works properly */
    height: 80vh; 
    padding: 20px;
    box-sizing: border-box;
  }
</style>