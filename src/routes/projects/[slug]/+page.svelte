<script>
	import { page } from "$app/stores";
	import { Link, SharePost, Render, Card } from "$lib";
	import List from "$lib/components/list.svelte";
	import { fdate } from "$lib/utils";
	/**
	 * @type {import("./$types").PageServerData}
	 */
	export let data;

	const { project } = data;
	const {
		metadata: { hero_image }
	} = project;
	const categories = project.metadata.categories;

	$: shallowed = $page.state?.selected ? true : false;
</script>

<!-- tags -->
<section class:breakout={hero_image}>
	{#if categories}
		<List
			items={categories}
			let:prop={category}
			classUL=" flex gap-1
				[&>li+li]:before:text-[gray]
        [&>li+li]:before:content-['/_']"
		>
			<Link
				href="/"
				class="label font-bold"
				text={category.title}
				props={{ style: `color: ${category.metadata.color};` }}
			/>
		</List>
	{/if}
</section>
<!-- image -->
<section
	class="flex flex-col gap-x-6"
	class:lg:flex-row={hero_image && !shallowed}
	class:breakout={hero_image}
>
	{#if hero_image}
		<div class="shrink py-3">
			<img
				src={hero_image.imgix_url}
				alt={`Cover image of ${project.title}`}
				width="720"
				height="480"
				loading="lazy"
				class="aspect-[3/2]"
			/>
		</div>
	{/if}
	<!-- description -->
	<div class="mt-3 grid">
		<p
			class="max-w-[35ch] text-2xl font-light leading-tight lg:first-letter:text-6xl lg:first-letter:font-[530]"
		>
			{project.metadata.description}
		</p>
		<div class="mt-4">
			<div class="flex items-center gap-4">
				<time class="shrink-0" datetime={fdate(project.published_at)}
					>{fdate(project.published_at)}
				</time>
				<!-- separator -->
				<hr aria-hidden="true" class="h-[1px] w-full border-none bg-surface bg-opacity-0" />
				<!-- share this project -->
				<SharePost class="h-4 w-4" data={{ text: project.title, url: data.url }} />
			</div>
			<p>About {data.readingTime} minute{data.readingTime == 1 ? "" : "s"} to read</p>
		</div>
	</div>
</section>
<hr class="mt-6 h-[1px] w-full border-none bg-surface bg-opacity-20" />
<!-- content -->
<Render title={project.title} content={project.metadata.content} />
