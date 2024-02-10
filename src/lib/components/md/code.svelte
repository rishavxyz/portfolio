<script>
	import Clipboard from "$lib/icons/clipboard.svelte";
	import hljs from "highlight.js";
	import "highlight.js/styles/base16/google-light.min.css";

	import { Marked } from "marked";
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
				`</pre>`
		}
	});
	const renderedCode = marked.parse($$props.raw);

	let copied = false;
</script>

<div class="overflow-clip rounded">
	<div class="flex items-center justify-between gap-6 bg-neutral-200 px-4 py-2">
		<span class="label font-code">{$$props.lang}</span>
		<button
			class="rounded-full bg-neutral-400/20 p-2
      focus:ring-2 focus:ring-neutral-500"
			title="Cop{copied ? 'ied' : 'y'} to clipboard"
			aria-label="Button. Cop{copied ? 'ied' : 'y'} to clipboard"
			use:copy={$$props.text}
			on:svelte-copy={() => {
				copied = true;
				setTimeout(() => (copied = false), 5000);
			}}
			on:svelte-copy:error={() => alert("Could not copy to clipboard")}
			><Clipboard {copied} />
		</button>
	</div>
	{@html renderedCode}
</div>
