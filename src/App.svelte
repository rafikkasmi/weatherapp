<script>
	import Home from "./views/Home.svelte";
	import Weather from "./views/Weather.svelte";
	let page = "HOME";
</script>

<main class="flex-center">
	<div class="container flex-center">
		{#if page == "HOME"}
			<Home on:nextPage={() => (page = "WEATHER")} />
		{:else if page == "WEATHER"}
			<Weather on:prevPage={() => (page = "HOME")} />
		{/if}
	</div>
</main>

<style>
	main {
		min-height: 100%;
		width: 100%;

		background: #131541;
		color: white;
	}
	.container {
		max-width: 1200px;
		width: 90%;
	}
</style>
