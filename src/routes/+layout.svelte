<script>
	import Header from '$lib/header/Header.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import '../lib/css/fonts.css';
	import '../app.css';
  import '../lib/css/typography.css';
</script>

<div class="relative font-sans">
  <Header />
  
  <main>
    <slot />
  </main>

  <Footer />
</div>  

