<script>
	import { cn } from "$lib/utils";
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";

	import hljs from "highlight.js";
	import "highlight.js/styles/base16/google-light.min.css";

	let className = "prose prose-lg prose-surface py-6 font-serif prose-code:text-base",
		/**@type {string}*/
		title,
		/**@type {string}*/
		content;
	export { className as class, title, content };

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
			code: (code, lang) => `
				<figure class="rounded mt-0 overflow-hidden">
					<figcaption class="label font-code text-sm m-0 px-6 py-4 bg-neutral-100">${lang}</figcaption>
					<pre class="bg-neutral-50"><code class="!px-0 !bg-inherit hljs language-${lang}">${code}</code></pre>
				</figure>
				`
			,
			table: (thead, tbody) =>
			`<div class="overflow-x-scroll">` +
			`<table class="m-0"><thead>${thead}</thead>` +
			`<tbody>${tbody}</tbody>` +
			`</table>`
		}
	});
</script>

<article class={cn(className)} {title}>
	{@html marked.parse(content)}
</article>
