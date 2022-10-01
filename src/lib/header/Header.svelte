<script >
	import { page } from '$app/stores';
</script>

<header class="sticky z-10 py-4 px-8 bg-transparent">
	<nav>
		<ul class="flex justify-center">
			<li class="px-4 hover:underline" class:underline={$page.url.pathname === '/'}><a sveltekit:prefetch href="/" title="Home">🏠 Home</a></li>
			<li class="px-4 hover:underline" class:underline={$page.url.pathname === '/work'}>
				<a sveltekit:prefetch href="/work" title="Work">👨‍💻 Work</a>
			</li>
		</ul>
	</nav>
</header>

