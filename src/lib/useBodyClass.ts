import { onMount, onDestroy } from 'svelte';

export function useBodyClass(className) {
  onMount(() => {
    document.body.classList.add(className);
  });

  onDestroy(() => {
    document.body.classList.remove(className);
  });
}
