<script>
	import { Code, Table } from "$lib";
	import { cn } from "$lib/utils";
	import SvelteMarkdown from "svelte-markdown";

	let className = "prose prose-lg prose-surface py-6 font-serif prose-code:text-base",
		/**@type {string}*/
		title,
		/**@type {string}*/
		content;

	export { className as class, title, content };
</script>

<article class={cn(className)} {title}>
	<SvelteMarkdown source={content} renderers={{ code: Code, table: Table }} />
</article>
