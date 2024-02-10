<script>
	import { Link } from "$lib";
	import Nav from "./nav.svelte";

	/**@type {any[]}*/
	export let routes;
</script>

<footer class="content bg-surface pb-6 pt-3 text-on-surface">
	<Nav
		class="mx-auto text-center"
		{routes}
		classUL="flex flex-wrap gap-6"
		classLI="justify-center"
	/>

	<p class="text-center opacity-80">
		Made with
		<Link
			isblank
			class="font-[520] text-fuchsia-100 underline"
			href="https://svelte.dev"
			text="Svelte"
		/>&comma;
		<Link
			isblank
			class="font-[520] text-fuchsia-100 underline"
			href="https://tailwindcss.com/"
			text="TailwindCSS"
		/>&comma; heavily used with <span class="font-code">`cn&lpar;&rpar;`</span> utility.
		<Link
			isblank
			class="font-[520] text-fuchsia-100 underline"
			href="https://cosmicjs.com"
			text="Cosmic"
		/>
		for CMS and deployed with
		<Link
			isblank
			class="font-[520] text-fuchsia-100 underline"
			href="https://vercel.com"
			text="Vercel"
		/>&period; Articles and projects are written in Markdown, rendered by
		<Link
			isblank
			class="font-[520] text-fuchsia-100 underline"
			href="https://marked.js.org"
			text="MarkedJS"
		/>&period; Those cool SVGs are made by
		<Link
			isblank
			class="font-[520] text-fuchsia-100 underline"
			href="https://twitter.com/monmichalczyk"
			text="Monika Michalczyk"
		/>&period;
	</p>
	<p class="mt-3 text-center text-sm opacity-50">&copy; Rishav Mandal. All rights reserved.</p>
</footer>
