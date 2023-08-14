<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const cursorOuter = document.querySelector('.outer-cursor');
		const cursorInner = document.querySelector('.inner-cursor');

		const moveCursor = (e) => {
			const y = e.clientY;
			const x = e.clientX;

			cursorOuter.style.left = `${x}px`;
			cursorOuter.style.top = `${y}px`;
			cursorInner.style.left = `${x}px`;
			cursorInner.style.top = `${y}px`;
		};
		const cursorTransform = (type) => {
			if (type === 'expand') {
				cursorInner.classList.add('w-10', 'h-10');
				cursorInner.classList.remove('w-5', 'h-5');
			} else {
				cursorInner.classList.remove('w-10', 'h-10');
				cursorInner.classList.add('w-5', 'h-5');
			}
		};
		document.addEventListener('mousemove', moveCursor);

		const links = document.querySelectorAll('a');

		links.forEach((link) => {
			link.addEventListener('mouseover', () => {
				cursorTransform('expand');
			});
			link.addEventListener('mouseleave', () => {
				cursorTransform('shrink');
			});
		});

		const buttons = document.querySelectorAll('button');

		buttons.forEach((button) => {
			button.addEventListener('mouseover', () => {
				cursorTransform('expand');
			});
			button.addEventListener('mouseleave', () => {
				cursorTransform('shrink');
			});
		});

		const backdrop = document.getElementsByClassName('backdrop');
		const hero = document.getElementsByClassName('hero');
		const h = hero[0].clientHeight;
		const w = hero[0].clientWidth;

		//calculate number of squares
		const numSquares = Math.floor((h * w) / 1000);

		console.log(numSquares);

		for (let i = 0; i < numSquares; i++) {
			const square = document.createElement('div');
			square.classList.add(
				'w-12',
				'h-12',
				'bg-transparent',
				`hover:bg-cyber-${(i % 7) + 1}`,
				'transition-all',
				'duration-75',
				'hover:scale-105',
				'rounded-md',
				'hover:shadow-xl',
				'shadow-cyber-4'
			);
			backdrop[0].appendChild(square);
		}
	});
</script>

<svelte:head>
	<title>Wahab</title>
</svelte:head>



<div
	class="flex flex-col font-orbitron min-h-screen bg-neutral-900 md:cursor-none text-cyber-6 max-w-screen scroll-smooth items-center justify-center"
>
	<div
		class="hidden md:block inner-cursor fixed h-5 w-5 bg-cyber-6 mix-blend-difference -translate-x-1/2 -translate-y-1/2 rounded-full left-3 pointer-events-none transition-all duration-75 ease-out z-50"
	/>
	<div
		class="hidden md:block outer-cursor fixed w-10 h-10 border-2 border-cyber-6 -translate-x-1/2 -translate-y-1/2 mix-blend-difference rounded-full left-3 pointer-events-none z-50"
	/>

	<div class="hero w-screen flex items-center justify-center">
		<div class="backdrop fixed hidden md:flex flex-wrap z-20">
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-1 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-2 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-3 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-4 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-5 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-6 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
			<div
				class="w-12 h-12 bg-transparent hover:bg-cyber-7 transition-all duration-75 hover:scale-105 rounded-md hover:shadow-xl shadow-cyber-4"
			/>
		</div>
		<div
			class="flex flex-col md:p-10 mt-10 items-center justify-center max-w-max text-cyber-6 gap-y-4"
			name="home"
		>
			<p class="rounded-lg ease-out text-5xl lg:text-7xl z-20">
				<span class="hover:text-red-500 hover:scale-125 inline-block transition-all duration-100"
					>H</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>i</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>,</span
				>
			</p>
			<p class="text-5xl lg:text-7xl z-20">
				<span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>I</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>'</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>m</span
				><span
					class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100 ml-4 xl:ml-6"
					>W</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>a</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>h</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>a</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>b</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>,</span
				>
			</p>
			<p class="text-2xl md:text-4xl z-20">
				<span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>(</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>I</span
				><span
					class="hover:text-red-500 inline-block hover:scale-125 transition-all ml-4 duration-100"
					>c</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>o</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>d</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>e</span
				><span
					class="hover:text-red-500 inline-block hover:scale-125 transition-all ml-4 duration-100"
					>s</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>o</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>m</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>e</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>t</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>i</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>m</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>e</span
				><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>s</span
				><span
					class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
				/><span class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
					>)</span
				>
			</p>

			<div class="z-20 flex gap-x-10 mt-10">
				<p
					class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
				>
					<a class="cursor-none" target="_blank" href="https://www.linkedin.com/in/wahaab/">LinkedIn</a>
				</p>
				<p
					class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
				>
					<a class="cursor-none" target="_blank" href="https://github.com/wa-hab/">Github</a>
				</p>
				<p
					class="hover:text-red-500 inline-block hover:scale-125 transition-all duration-100"
				>
					<a class="cursor-none" href="/blog">Blog</a>
				</p>
			</div>
		</div>
	</div>
</div>
