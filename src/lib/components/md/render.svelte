<script>
	import { Code, Table } from "$lib";
	import { cn } from "$lib/utils";
	import { Marked } from "marked";
	import SvelteMarkdown from "svelte-markdown";

	let className = "prose prose-lg prose-surface py-6 font-serif prose-code:text-base",
		/**@type {string}*/
		title,
		/**@type {string}*/
		content;

	export { className as class, title, content };



	import hljs from "highlight.js";
	import "highlight.js/styles/base16/google-light.min.css";

	import { markedHighlight } from "marked-highlight";
	import { copy } from "svelte-copy";

	const marked = new Marked(
		markedHighlight({
			langPrefix: "hljs language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			}
		})
	);
	marked.use({
		renderer: {
			code: (code, lang) =>
				`<pre class="rounded-none rounded-b m-0 p-4 bg-neutral-100">` +
				`<code class="!px-0 !bg-inherit hljs language-${lang}">` +
				`${code}` +
				`</code>` +
				`</pre>`,
			table: (thead, tbody) =>
			`<div class="overflow-x-scroll">` +
			`<table class="my-0"><thead>${thead}</thead>` +
			`<tbody>${tbody}</tbody>` +
			`</table>`
		}
	});
	console.log(marked.lexer(content))
</script>

<article class={cn(className)} {title}>
	<!-- <SvelteMarkdown source={content} renderers={{ code: Code, table: Table }} /> -->
	{@html marked.parse(content)}
</article>
