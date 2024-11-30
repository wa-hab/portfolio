<script>
	import { onMount } from 'svelte';

	export let data;

	// // add classes to the pre component on load
	// onMount(() => {
	// 	const components = document.querySelectorAll('pre')
	// 	for (let component of components){
	// 		component.className = "text-base lg:text-xl overflow-x-scroll max-w-full"
	// 	}
	// })
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
		<a href="/blog" class="text-lime-500 hover:text-lime-700 underline top-10 left-10 absolute"
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
			class="flex w-full flex-col items-start justify-center text-gray-200 text-lg p-4 gap-10 overflow-hidden mb-32 leading-relaxed tracking-wide font-mono"
		>
			<svelte:component this={data.content} {...data.meta} />
		</div>
	</div>
</div>
