<script>
	import { Link, Wrap, Render, SavePost, SharePost } from '$lib';
	import { fdate } from '$lib/utils';
	/**
	 * @type {import("./$types").PageServerData}
	 */
	export let data;

	const { project } = data;
	const {
		metadata: { hero_image }
	} = project;
</script>

<Wrap
	class="bg-on-surface text-surface"
	navTitleIsSame
	title={project.title}
	description={project.metadata.description}
	navBreakout={hero_image && true}
>
	<!-- tags -->
	<section class:breakout={hero_image}>
		{#if project.metadata.categories}
			<ul
				class="
        flex gap-1 [&>li+li]:before:text-[gray]
        [&>li+li]:before:content-['/_']"
			>
				{#each project.metadata.categories as category}
					<li>
						<Link
							href="/"
							class="label font-bold"
							text={category.title}
							props={{ style: `color: ${category.metadata.color};` }}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
	<!-- image -->
	<section
		class={hero_image ? 'flex flex-col gap-x-6 lg:flex-row' : ''}
		class:breakout={hero_image}
	>
		{#if hero_image}
			<div class="shrink-0 py-3 lg:w-[60%]">
				<img
					src={hero_image.imgix_url}
					alt={`Cover image of ${project.title}`}
					width="720"
					height="480"
					class="aspect-[3/2]"
				/>
			</div>
		{/if}
		<div class="space-y-3 mt-3">
			<p class="text-xl lg:first-letter:text-6xl">{project.metadata.description}</p>
			<div class="flex items-center gap-4">
				<time class="shrink-0" datetime={fdate(project.published_at)}
					>{fdate(project.published_at)}
				</time>
				<!-- separator -->
				<hr class="h-[1px] w-full border-none bg-surface bg-opacity-40" />
				<!-- save this post -->
				<SavePost class="w-4 h-4" />
				<!-- share this article -->
				<SharePost class="w-4 h-4" data={{text: project.title, url: data.url}} />
			</div>
		</div>
	</section>
	<!-- content -->
	<Render title={project.title} content={project.metadata.content} />
</Wrap>
