<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/contact-me">Contact</a></li>
	</ul>
</nav>

{@render children()}
