<script>
	import Header from '$lib/header/Header.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import '../lib/css/fonts.css';
  import '../lib/css/typography.css';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

