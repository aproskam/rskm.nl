<script>
  import { navigating } from '$app/stores';
	import Header from '$lib/header/Header.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
  import '../lib/css/fonts.css';
	import '../app.css';
  import '../lib/css/typography.css';
</script>

<div class="relative font-sans">
  {#if $navigating}
    <PreloadingIndicator />
  {/if}

  <Header />
  
  <main class="-mt-14">
    <slot />
  </main>

  <Footer />
</div>  

