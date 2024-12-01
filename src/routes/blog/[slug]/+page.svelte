<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const links = document.querySelectorAll('.prose a');
		for (const link of links) {
			link.target = '_blank';
			link.rel = 'noopener noreferrer';
		}
	});

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta name="keywords" content={data.meta.keywords} />
	<meta name="author" content={data.meta.author} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:url" content={data.meta.url} />
	<meta property="og:image" content={data.meta.image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={data.meta.image} />
	<link rel="canonical" href={data.meta.url} />
</svelte:head>

<div
	class="flex flex-col items-center justify-center bg-neutral-900 w-screen h-screen overflow-y-auto"
>
	<div>
		<a
			href="/blog"
			class="text-lime-500 hover:text-lime-700 underline md:top-10 md:left-10 absolute p-2 top-2 left-2 backdrop-blur-md rounded-md"
			>back</a
		>
	</div>
	<div class="container max-w-4xl w-full h-full">
		<div id="header" class="flex flex-col items-center justify-center gap-4 p-4">
			<h1 class="text-3xl lg:text-5xl text-lime-500 mt-20 text-center">{data.meta.title}</h1>
			<p class="text-center">{data.meta.description}</p>
		</div>

		<div
			id="content"
			class="prose md:prose-md lg:prose-lg xl:prose-xl p-4 prose-h3:text-lime-500 prose-h4:text-lime-500 prose-a:underline prose-a:text-lime-500 text-gray-200 w-full mx-auto my-20"
		>
			<svelte:component this={data.content} {...data.meta} />
		</div>
	</div>
</div>
