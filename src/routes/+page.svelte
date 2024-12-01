<script>
	let copied = false;

	$: if (copied) {
		setTimeout(() => {
			copied = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>Wahab - Software Developer & Engineer</title>
	<meta
		name="description"
		content="Personal website of Wahab - Software developer specializing in web development and engineering. View my projects, blog posts and connect with me on LinkedIn and Github."
	/>
	<meta
		name="keywords"
		content="Wahab, Software Developer, Web Development, Engineering, Programming"
	/>
	<meta property="og:title" content="Wahab - Software Developer & Engineer" />
	<meta
		property="og:description"
		content="Personal website of Wahab - Software developer specializing in web development and engineering."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content="Wahab - Software Developer & Engineer" />
	<meta
		name="twitter:description"
		content="Personal website of Wahab - Software developer specializing in web development and engineering."
	/>
</svelte:head>

<div class="bg-neutral-900 h-screen w-screen flex items-center justify-start font-mono">
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold text-white mb-2">Hi, I'm Wahab</h1>
		<p class="text-lg text-gray-300 mb-6">I code sometimes</p>

		<div class="mt-4 flex flex-col gap-2 max-w-max">
			<a href="/blog" class="text-lime-500 underline hover:text-lime-300">Blog</a>
			<!-- <a href="/projects" class="text-lime-500 underline hover:text-lime-300">Projects</a> -->
			<a
				target="_blank"
				href="https://www.linkedin.com/in/wahaab/"
				class="text-lime-500 underline hover:text-lime-300">LinkedIn</a
			>
			<a
				target="_blank"
				href="https://github.com/wa-hab/"
				class="text-lime-500 underline hover:text-lime-300">Github</a
			>
		</div>

		<div class="mt-32 text-gray-300">
			reach me at:
			<button
				class="text-lime-500 hover:text-lime-300 cursor-pointer flex items-center gap-2"
				on:click={() => {
					navigator.clipboard.writeText('wahahahab1@gmail.com');
					copied = true;
				}}
			>
				wahahahab1@gmail.com
				<svg
					id="copy-icon"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
					/>
				</svg>
			</button>

			<p class="h-12">
				{#if copied}
					<span class="text-xs text-gray-400">Copied to clipboard!</span>
				{/if}
			</p>
		</div>
	</div>
</div>
