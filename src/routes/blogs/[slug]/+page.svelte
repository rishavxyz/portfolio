<script>
	import { page } from '$app/stores';
	import { Link, SharePost, Render, Wrap, Card } from '$lib';
	import SavePost from '$lib/components/save-post.svelte';
	import { fdate } from '$lib/utils';
	/**
	 * @type {import("./$types").PageServerData}
	 */
	export let data;

	const { article } = data;
	const {
		metadata: { hero_image }
	} = article;
</script>

<Wrap
	class="bg-on-surface text-surface"
	navTitleIsSame
	title={article.title}
	description={article.metadata.description}
	navBreakout={hero_image && true}
>
	<!-- tags -->
	<section class:breakout={hero_image}>
		{#if article.metadata.categories}
			<ul
				class="
        flex gap-1 [&>li+li]:before:text-[gray]
        [&>li+li]:before:content-['/_']"
			>
				{#each article.metadata.categories as category}
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
					alt={`Cover image of ${article.title}`}
					width="720"
					height="480"
					class="aspect-[3/2]"
				/>
			</div>
		{/if}
		<!-- description -->
		<div class="mt-3 grid">
			<p class="text-2xl leading-tight font-light lg:first-letter:text-6xl lg:first-letter:font-[530]">{article.metadata.description}</p>
			<div class="mt-4">
				<div class="flex items-center gap-4">
					<time class="shrink-0" datetime={fdate(article.published_at)}
						>{fdate(article.published_at)}
					</time>
					<!-- separator -->
					<hr class="h-[1px] w-full border-none bg-surface bg-opacity-0" />
					<!-- save this post -->
					<SavePost class="w-4 h-4" />
					<!-- share this article -->
					<SharePost class="w-4 h-4" data={{text: article.title, url: data.url}} />
				</div>
				<p>About {data.readingTime} minute{data.readingTime == 1 ? '' : 's'} read</p>
			</div>
		</div>
	</section>
	<hr class="h-[1px] mt-6 w-full border-none bg-surface bg-opacity-20" />
	<!-- content -->
	<Render title={article.title} content={article.metadata.content} />
	<!-- related posts -->
		{#await data.relatedPosts then posts}
		{#if posts}
		<Card let:Child class="full-width content py-6 bg-emerald-400">
			<Child.Label class="pb-4">Related posts</Child.Label>
				<Child.Post noimage route="/blogs" collection={posts?.relatedPosts} />
			</Card>
			{/if}
		{/await}
</Wrap>
