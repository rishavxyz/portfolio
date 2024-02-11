<script>
	import { Link, SharePost, Render, Card } from "$lib";
	import List from "$lib/components/list.svelte";
	import { fdate } from "$lib/utils";
	/**
	 * @type {import("./$types").PageServerData}
	 */
	export let data;

	const { article } = data;
	const {
		metadata: { hero_image }
	} = article;
	const categories = article.metadata.categories;
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
				href="#"
				class="label font-bold"
				text={category.title}
				props={{ style: `color: ${category.metadata.color};` }}
			/>
		</List>
	{/if}
</section>
<!-- image -->
<section class={hero_image ? "flex flex-col gap-x-6 lg:flex-row" : ""} class:breakout={hero_image}>
	{#if hero_image}
		<div class="shrink-0 py-3 lg:w-[60%]">
			<img
				src={hero_image.imgix_url}
				alt={`Cover image of ${article.title}`}
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
			class="text-2xl font-light leading-tight lg:first-letter:text-6xl lg:first-letter:font-[530]"
		>
			{article.metadata.description}
		</p>
		<div class="mt-4">
			<div class="flex items-center gap-4">
				<time class="shrink-0" datetime={fdate(article.published_at)}
					>{fdate(article.published_at)}
				</time>
				<!-- separator -->
				<hr aria-hidden="true" class="h-[1px] w-full border-none bg-surface bg-opacity-0" />
				<!-- share this article -->
				<SharePost class="h-4 w-4" data={{ text: article.title, url: data.url }} />
			</div>
			<p>About {data.readingTime} minute{data.readingTime == 1 ? "" : "s"} to read</p>
		</div>
	</div>
</section>
<hr class="mt-6 h-[1px] w-full border-none bg-surface bg-opacity-20" />
<!-- content -->
<Render title={article.title} content={article.metadata.content} />
<!-- related posts -->
{#await data.relatedPosts then posts}
	{#if posts}
		<Card let:Child class="full-width content -mb-3 bg-emerald-400 py-6">
			<Child.Label class="pb-3">Related posts</Child.Label>
			<Child.Post noimage route="/blogs" collection={posts?.relatedPosts} />
		</Card>
	{/if}
{/await}
