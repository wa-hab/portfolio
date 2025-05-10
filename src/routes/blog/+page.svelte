<script>
	export let data;
</script>

<div class="bg-neutral-900 h-screen w-screen overflow-y-auto">
	<div class="container relative flex items-center justify-center mx-auto">
		<a
			href="/"
			class="text-lime-500 hover:text-lime-700 underline md:top-10 md:left-10 absolute p-2 top-2 left-2 backdrop-blur-md rounded-md"
			>back</a
		>
		{#if data?.posts?.length > 0}
			<div
				id="blogs-section"
				class="pt-20 flex flex-col items-start max-w-2xl mx-auto md:p-8 gap-8"
			>
				{#each data.posts as post}
					<a href={`/blog/${post.slug}`} class="relative block p-6 w-full group">
						<h1 class="text-xl font-bold text-lime-500 group-hover:underline">{post.title}</h1>
						<div class="text-end w-full text-neutral-600 text-xs">
							{post?.date}
						</div>
						<div class="mt-2 text-neutral-400 text-sm">
							{post?.description}
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p class="text-xl text-center">No posts here yet</p>
		{/if}
	</div>
</div>
