<script>
	import { cn, fdate } from "$lib/utils";

	/**
	 * @type {Array<{
	 *  slug: string; title: string; published_at: string; modified_at: string;
	 *  metadata: {
	 *    description: string;
	 *    hero_image: { imgix_url: string; }
	 *    categories: Array<{ title: string; metadata: { color: string; } }>
	 *    content: string;
	 *  }
	 * }>}
	 */
	export let collection = [];
	export let noimage = false;
	export let nodesc = false;
	export let headingClass = "";
	export let listClass = "";
	export let textClass = "";
	let className = "";
	export { className as class };

	/** @type {string} */
	export let route;
</script>

<ul class="space-y-8 lg:space-y-10 {cn(className)}">
	{#each collection as data}
		<li class="group {cn(listClass)}">
			<a href={`${route}/${data.slug}`} title={data.title} class="space-y-1">
				{#if data.metadata.hero_image && !noimage}
					<img
						src={data.metadata.hero_image.imgix_url}
						alt={`Cover image of ${data.title}`}
						width="480"
						height="320"
						class="mb-3 ml-auto aspect-[3/2]"
					/>
				{/if}
				<h4
					class="heading group-active:underline mouse:group-hover:underline {cn(
						headingClass
					)}"
				>
					{data.title}
				</h4>
				<time class="!text-sm" datetime={fdate(data.published_at)}
					>{fdate(data.published_at)}
				</time>
				{#if !nodesc}
					<p class="opacity-80 {cn(textClass)}">{data.metadata.description}</p>
				{/if}
			</a>
		</li>
	{/each}
</ul>
