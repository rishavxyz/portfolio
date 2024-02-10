<script>
	import { page } from "$app/stores";
	import List from "$lib/components/list.svelte";
	import Star from "$lib/icons/styled/star.svelte";
	import { cn } from "$lib/utils";

	/**@type {any[]}*/
	export let routes;
	export let title = "";
	export let background = "";
	export let foreground = "";
	export let classLI = "";
	export let classUL = "";

	let className = "";
	export { className as class };
</script>

<header class="content {background} {foreground}">
	<div class="breakout flex justify-between gap-8 py-3">
		{#if title}
			<h1 class="heading self-end leading-tight">{title}</h1>
		{/if}

		<nav class="ml-auto shrink-0 {cn(className)}">
			<h5 class="font-dsiplay font-normal tracking-wide">
				<a href="/">Rishav mandal</a>
			</h5>

			<List
				items={routes}
				let:prop={route}
				{classUL}
				classLI="leading-snug capitalize flex justify-end items-center gap-1 {cn(classLI)}"
			>
				{#if $page.data.url == route.href}<Star width="10" />{/if}
				<a href={route.href}>{route.name}</a>
			</List>
		</nav>
	</div>
</header>
