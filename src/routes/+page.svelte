<script>
	import { Card, Link } from "$lib";
	import Github from "$lib/icons/github.svelte";
	import Star from "$lib/icons/styled/spiked-star.svelte";
	import List from "$lib/components/list.svelte";
	import { fly, slide } from "svelte/transition";
	export let data;

	const seo = data.seo;
</script>

{#await data.lazyLoad}
<!-- articles -->
	<div class="grid place-items-center h-screen fixed bg-on-surface z-50 inset-0" out:slide={{delay: 0, duration: 800}}>
		<p class="label text-lg text-surface" out:fly={{delay: 500}}>Rishav Mandal</p>
	</div>
{:then data}
<section>
		<div class="flex">
			<h1 class="font-dsiplay text-8xl font-black" in:fly={{delay: 650, y: -20, duration: 650}}>
				Rishav
				<br />
				<span class="-mt-6 ml-10 block" in:fly={{delay: 750, y:20, duration: 650}}>Mandal</span>
			</h1>
			<Star class="-ml-12 h-[100px] w-[100px]" />
		</div>
		<p class="-mt-3 gap-3 text-4xl font-black leading-none tracking-tight lg:flex">
			<Star class="w-24 shrink-0 lg:w-40" />
			<span class="shrink" in:fly={{delay: 650,y:0, x:20, duration: 800}}>{seo.description}</span>
		</p>
</section>
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
				classLI="flex flex-col-reverse lg:flex-row gap-2"
			>
				{@const imgSrc = project.metadata.hero_image?.imgix_url}
				{@const categories = project.metadata.categories}
				{@const links = project.metadata.links}

				<div class="space-y-4 self-center lg:mx-auto">
					<header class="space-y-1 lg:w-[50ch]" class:mx-auto={!imgSrc}>
						{#if categories}
							<List
								items={categories}
								let:prop={category}
								classUL="
							flex gap-1 [&>li+li]:before:text-[gray]
							[&>li+li]:before:content-['/_']"
							>
								<a
									href="#_"
									class="label text-xs font-bold"
									style="color:{category.metadata.color}"
								>{category.title}</a>
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
	{:catch error}
	<pre>{JSON.stringify(error, null, 2)}</pre>
{/await}