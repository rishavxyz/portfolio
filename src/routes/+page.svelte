<script>
	import { Card, Link } from "$lib";
	import { copy } from "svelte-copy";
	import Github from "$lib/icons/github.svelte";
	import Star from "$lib/icons/styled/spiked-star.svelte";
	import List from "$lib/components/list.svelte";

	export let data;
	let emailAddr = "email@rishavmandal.xyz";
	let hue = 230;
	let alpha = 0;

	const myFancyName = "Rishav"
		.split("")
		.map((c, i) => (i % 4 ? `<span class="relative z-10">${c}</span>` : c))
		.join("");
</script>

<section class="breakout">
	<!-- <h1 class="font-dsiplay text-8xl font-black">
		{@html sanitize(myFancyName, { allowedClasses: { span: ["relative", "z-10"] } })}
	</h1>
	<div class="relative -mt-10 ml-8 overflow-x-clip">
		<span class="absolute left-3 top-2 font-dsiplay text-8xl font-black">Mandal</span>
		<img
			src="https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=60"
			alt="placeholder"
			width="600"
			height="600"
		/>
	</div> -->
	<div class="content">
		<div class="flex">
			<h1 class="font-dsiplay font-black text-8xl">Rishav
				<br />
				<span class="block -mt-6 ml-12">Mandal</span>
			</h1>
			<Star class="-ml-12 w-[100px] h-[100px]" />
		</div>
		<h3 class="-mt-3 lg:flex text-4xl gap-3 font-black leading-none tracking-tight">
			<Star class="shrink-0 w-24 lg:w-40" />
			<span class="shrink">
				{data.seo.description}
			</span>
		</h3>
	</div>
</section>
<!-- articles -->
<Card let:Child class="mt-6 py-4">
	<Child.Label class="text-emerald-500">Latest blogs</Child.Label>
	<Child.Post route="/blogs" collection={data.articles} />
</Card>
<!-- projects -->
<Card let:Child class="breakout my-6">
	<Child.Label class="text-fuchsia-400">Selected projects</Child.Label>
	<div>
		<List
			items={data.projects}
			let:prop={project}
			classUL="space-y-10"
			classLI="flex flex-col-reverse lg:flex-row gap-4"
		>
			{@const imgSrc = project.metadata.hero_image?.imgix_url}
			{@const categories = project.metadata.categories}
			{@const links = project.metadata.links}

			<div class="space-y-4 self-center lg:mx-auto">
				<header class="space-y-2 lg:w-[50ch]" class:mx-auto={!imgSrc}>
					{#if categories}
						<List
							items={categories}
							let:prop={category}
							classUL="
						flex gap-1 [&>li+li]:before:text-[gray]
						[&>li+li]:before:content-['/_']"
						>
							<Link
								href="/"
								class="label text-xs font-bold"
								text={category.title}
								props={{ style: `color: ${category.metadata.color};` }}
							/>
						</List>
					{/if}
					<h5>{project.title}</h5>
					<p class="opacity-80">{project.metadata.description}</p>
				</header>
				<footer class="flex flex-wrap gap-4">
					<a
						href={`/projects/${project.slug}`}
						title="Read more"
						class="label text-fuchsia-400 underline"
					>
						Read more
					</a>
					<List items={links} let:prop={{ url }}>
						{#if url?.includes("github.com")}
							<Link isblank href={url} class="text-neutral-400">
								<Github class="h-6 w-6" />
							</Link>
						{/if}
					</List>
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
		</List>
	</div>
</Card>
<!-- contact me -->
<p class="text-xl">
	I am currently looking for a software engineer or fullstack engineer job role so,
</p>
<section
	class="full-width my-2 py-4 transition-colors"
	style="background-color: hsl({hue} 40% 40% / {alpha});"
>
	<div class="content">
		<div class="flex flex-wrap items-center justify-between">
			<h4 class="leading-tighter w-fit text-5xl tracking-tight">
				Feel
				<span class="underline decoration-green-600 decoration-wavy">free </span> to<br />contact me
			</h4>
			<p class="ml-auto flex w-fit flex-col gap-3">
				<a
					href={`mailto:${emailAddr}`}
					class="md text-2xl underline decoration-pink-400 decoration-4 underline-offset-8"
					>{emailAddr}</a
				>
				<button
					class="label border p-2"
					use:copy={emailAddr}
					on:svelte-copy={(/** @type {any} */ e) => {
						alpha = 1;
						const interval = setInterval(() => {
							hue = hue + Math.floor(Math.random() * 360);
						}, 270);
						e.target.innerText = "Email copied!";
						setTimeout(() => {
							clearInterval(interval);
							alpha = 0;
							e.target.innerText = "Copy instead";
						}, 5000);
					}}>Copy instead</button
				>
			</p>
		</div>
	</div>
</section>
