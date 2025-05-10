<script>
	const projects = [
		{
			title: 'Project 1',
			description:
				'A comprehensive web application built using React and Node.js that allows users to track their daily fitness routines, set goals, and visualize progress through interactive charts and graphs. Implements user authentication, data persistence, and real-time updates.',
			image: '/project1.jpg',
			link: '#'
		},
		{
			title: 'Project 2',
			description:
				'An e-commerce platform developed with Vue.js and MongoDB that features a fully responsive design, shopping cart functionality, secure payment processing, and an admin dashboard for inventory management. Includes product filtering, search, and user reviews.',
			image: '/project2.jpg',
			link: '#'
		},
		{
			title: 'Project 3',
			description:
				'A social media analytics tool created using Python and Django that helps businesses track their social media presence across multiple platforms. Features automated data collection, sentiment analysis, competitor tracking, and customizable reporting dashboards.',
			image: '/project3.jpg',
			link: '#'
		}
	];
</script>

<div class="bg-neutral-900 h-screen w-screen overflow-y-auto">
	<div class="container relative flex items-center justify-center mx-auto">
		<a
			href="/"
			class="absolute top-10 left-10 text-lime-500 hover:text-lime-700 underline w-40 h-40">back</a
		>

		<div
			id="blogs-section"
			class="pt-20 flex flex-col items-center max-w-2xl mx-auto p-8 gap-8 w-full"
		>
			{#each projects as project}
				<a href={project.link} class="relative block p-6 w-full group">
					<h1 class="text-xl font-bold text-lime-500 group-hover:underline">{project.title}</h1>
					<div class="mt-2 text-neutral-400 text-sm">
						{project.description}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
