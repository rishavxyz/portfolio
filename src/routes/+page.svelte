<script>
	import { Card, Wrap, Link } from '$lib';
	import GitHub from "$lib/icons/github.svelte";
	import {copy} from 'svelte-copy';

	let hue = 230;
	let alpha = 0;

	export let data;
</script>

<Wrap title="Rishav Mandal" class="space-y-6">
	{@const emailAddr = "email@rishavmandal.xyz"}

<section>
	<h1 class="font-dsiplay text-8xl font-black tracking-wide">
		{@html 'Rishav'
			.split('')
			.map((c, i) => (i % 4 ? `<span class="relative z-10">${c}</span>` : c))
			.join('')}
	</h1>
	<div class="relative -mt-10 ml-8 overflow-x-clip">
		<span class="absolute left-4 top-2 font-dsiplay text-8xl font-black tracking-wide"
			>Mandal</span
		>
		<img
			src="https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=60"
			alt=""
			class="h-full w-full"
			width="600"
			height="600"
		/>
	</div>
	<div class="relative z-10 -mt-4">
		<h3 class="text-4xl font-black leading-none tracking-tight">
			I like to build web apps with a blend of frontend engineering and design experience.
		</h3>
	</div>
</section>
<!-- articles -->
<Card let:Child class="py-4">
	<Child.Label class="pb-4 text-emerald-500">Latest blogs</Child.Label>
	<Child.Post route="/blogs" collection={data.articles} />
</Card>
<!-- projects -->
<Card let:Child class="!mb-6 breakout">
	<Child.Label class="text-fuchsia-400">Selected projects</Child.Label>
	<div class="">
		<ul id="projects" class="space-y-10">
			{#each data.projects as project}
				{@const imgSrc = project.metadata.hero_image?.imgix_url}
				{@const categories = project.metadata.categories}
				{@const links = project.metadata.links}

				<li class="flex flex-col-reverse lg:flex-row gap-4">
					<div class="lg:mx-auto space-y-4 self-center">
						<header class="lg:w-[50ch] space-y-2" class:mx-auto={!imgSrc}>
						{#if categories}
							<ul
								class="
								flex gap-1 [&>li+li]:before:text-[gray]
								[&>li+li]:before:content-['/_']"
							>
								{#each categories as category}
									<li>
										<Link
											href="/"
											class="label font-bold text-xs"
											text={category.title}
											props={{ style: `color: ${category.metadata.color};` }}
										/>
									</li>
								{/each}
							</ul>
						{/if}
							<h5>{project.title}</h5>
							<p class="opacity-80">{project.metadata.description}</p>
						</header>
						<footer class="flex flex-wrap gap-4">
							<a href={`/projects/${project.slug}`} title="Read more" class="underline label text-fuchsia-400">
								Read more
							</a>
							<ul>
								{#each links as {url}}
									{#if url.includes("github.com")}
										<Link isblank href={url} class="text-neutral-400">
											<GitHub class="w-6 h-6" />
										</Link>
									{/if}
								{/each}
							</ul>
						</footer>
					</div>
					{#if imgSrc}
						<figure class="shrink-0">
							<img
								src={imgSrc}
								alt={`Cover image of ${project.title}`}
								width="480"
								height="320"
								class="ml-auto aspect-[3/2]"
							/>
						</figure>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</Card>
<!-- contact me -->
<p class="text-xl">
	I am currently looking for a software engineer or fullstack engineer job role so,
</p>
<section class="full-width my-2 py-4 transition-colors"
	style="background-color: hsl({hue} 40% 40% / {alpha});"
>
	<div class="content">
		<div class="flex flex-wrap items-center justify-between">
			<h4 class="leading-tighter text-5xl tracking-tight w-fit">
				Feel
				<span class="underline decoration-green-600 decoration-wavy"
				>free
				</span> to<br />contact me
			</h4>
			<p class="w-fit ml-auto flex flex-col gap-3">
				<a
					href={`mailto:${emailAddr}`}
					class="md text-2xl underline decoration-pink-400 decoration-4 underline-offset-8"
					>{emailAddr}</a
				>
				<button class="label p-2 border"
					use:copy={emailAddr}
					on:svelte-copy={(/** @type {any} */ e)=> {
						alpha = 1;
						const interval = setInterval(()=>{
							hue = hue + Math.floor(Math.random() * 360)
						}, 270)
						e.target.innerText = "Email copied!"
						setTimeout(() => {
							clearInterval(interval);
							alpha = 0;
							e.target.innerText = "Copy instead"
						}
						, 5000);
					}}
				>Copy instead</button>
			</p>
		</div>
	</div>
</section>
</Wrap>

<style>
	/* :global(*) {
		outline: 1px lime solid;
	} */
</style>