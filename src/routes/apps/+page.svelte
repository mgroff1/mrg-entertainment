<script>
import Carousel from "$lib/Carousel.svelte";
import bgImageOne from '$lib/images/acc_one.png';
import bgImage from '$lib/images/circuit.png';
import icon from '$lib/images/icon.png';


  const slides = [
    {
      image: bgImageOne,
      title: "Accretion Simulation",
      description: "Watch planets form dynamically from swirling debris."
    },
    {
      image: bgImage,
      title: "Orbital Mechanics",
      description: "Realistic gravity interactions and orbital paths."
    },
    {
      image: icon,
      title: "Custom Scenarios",
      description: "Build your own solar systems and test physics."
    }
  ];
</script>

<Carousel items={slides} interval={4000} />

