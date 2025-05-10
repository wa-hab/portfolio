<script>
	import picture from '$lib/assets/picture.jpeg';

</script>

	<div id="about" class="bg-cyber-6 text-gray-900 flex flex-col w-screen">
		<div class="flex w-full items-center justify-center text-4xl mb-2 lg:text-6xl lg:mb-0">
			<span class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20"
				>A</span
			><span
				class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20"
				>b</span
			><span
				class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20"
				>o</span
			><span
				class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20"
				>u</span
			><span
				class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20"
				>t</span
			><span
				class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20 ml-4"
				>m</span
			><span
				class="hover:text-cyber-4 inline-block hover:scale-125 transition-all duration-100 z-20"
				>e</span
			>
		</div>

		<div class="flex flex-col-reverse md:flex-row items-center justify-center">
			<div class="flex flex-col items-center justify-center p-10 basis-full">
				<p
					class="text-xl md:text-2xl z-20 hover:scale-105 hover:text-cyber-4 duration-150 ease-in-out transition-all"
				>
					I'm a 20 year old student from Lahore. I'm currently in my third year, studying Computer
					Science at LUMS. I'm interested in Network Security, Software Development, Computing
					Theory and Distributed Systems.
				</p>
			</div>

			<div class="basis-full h-full w-full z-20">
				<div class="z-40 flex items-center justify-center">
					<img src={picture} alt="me" class="w-1/2 md:w-3/4 lg:w-1/2 rounded-full" />
				</div>
			</div>
		</div>
	</div>