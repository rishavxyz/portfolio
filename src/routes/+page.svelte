<script>
	import { Card, Link } from "$lib";
	import Github from "$lib/icons/github.svelte";
	import Star from "$lib/icons/styled/spiked-star.svelte";
	import List from "$lib/components/list.svelte";

	export let data;

	const myFancyName = "Rishav"
		.split("")
		.map((c, i) => (i % 4 ? `<span class="relative z-10">${c}</span>` : c))
		.join("");
</script>

<section class="breakout">
	<div class="content">
		<div class="flex">
			<h1 class="font-dsiplay text-8xl font-black">
				Rishav
				<br />
				<span class="-mt-6 ml-10 block">Mandal</span>
			</h1>
			<Star class="-ml-12 h-[100px] w-[100px]" />
		</div>
		<p class="-mt-3 gap-3 text-4xl font-black leading-none tracking-tight lg:flex">
			<Star class="w-24 shrink-0 lg:w-40" />
			<span class="shrink">
				{data.seo.description}
			</span>
		</p>
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
								href="#"
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
							<Link isblank href={url} class="text-neutral-400" 
							props={{title: "GitHub"}}>
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
						loading="lazy"
						class="ml-auto aspect-[3/2]"
					/>
				</figure>
			{/if}
		</List>
	</div>
</Card>
