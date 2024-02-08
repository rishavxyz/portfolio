<script>
	import "../../app.pcss";

	import "@fontsource-variable/arimo"
	import "@fontsource-variable/noto-serif"
	import "@fontsource/bebas-neue"
	import "@fontsource/ubuntu-mono"

	import { Footer, Nav } from '$lib';
	import { cn } from '$lib/utils';
	import { fly } from "svelte/transition";

	const author = 'Rishav Mandal';
	
	let className = "";

	export { className as class };
	export let navClass = '';
	export let headerClass = '';
	export let navBreakout = false;
	export let navTitleIsSame = false;
	export let navTitle = '';
	export let title = '';
	export let description =
		'I like to build web apps with a blend of frontend engineering and design experience.';

</script>

<svelte:head>
	<title>
		{ title == author ? author
			: `${title} | ${author}`.length > 60 ? title
			: `${title} | ${author}`
		}
	</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />
</svelte:head>

<div class="content {cn(className)}"
	in:fly={{duration: 900, y: 250, delay: 250}}
	out:fly={{duration: 250, y: 250}}
>
	<Nav title={navTitleIsSame ? title : navTitle} class={cn(navClass)} {headerClass} breakout={navBreakout} />
	<slot />
	<Footer />
</div>