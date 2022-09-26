<script >
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/work'}>
				<a sveltekit:prefetch href="/work">Work</a>
			</li>
		</ul>
	</nav>
</header>

