<script>
	export let data;
	// $: data.meta.tags = data.meta.tags.split(',').map(tag => tag.trim());
</script>

<svelte:head>
	<title>
		{data.meta.title}
	</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="flex flex-col items-center justify-center bg-neutral-900">
	<div class="absolute top-10 left-10">
		<a href="/blog">back</a>
	</div>

	<div id="header" class="flex flex-col items-center justify-center gap-4 p-10">
		<h1 class="text-3xl lg:text-5xl font-orbitron text-cyber-6 mt-32">
			{data.meta.title}
		</h1>
		<p class="text-cyber-4">{data.meta.description}</p>

		<div id="tags" class="bg-gray-200 bg-opacity-20 rounded-xl">
			{#each data.meta.tags as tag}
				<span class="text-gray-200 p-1">{'#'}{tag}</span>
			{/each}
		</div>
	</div>

	<div id="content" class="flex flex-col items-start justify-center text-gray-200 text-xl w-full p-4 lg:w-1/2 gap-10">
		<svelte:component this={data.content} {...data.meta} />
	</div>
</div>
