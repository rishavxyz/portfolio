<script>
	import { page } from "$app/stores";
	import List from "$lib/components/list.svelte";
	import Star from "$lib/icons/styled/star.svelte";
	import { cn } from "$lib/utils";
	import { fade } from "svelte/transition";

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
	<div class="breakout flex justify-between gap-8 pt-4">
		{#if title}
			<h1 class="heading lg:max-w-[35ch] self-end leading-tight">
				{#each title as char, i}
					<span in:fade|global={{delay: 1500 + 25 * i}}>{char}</span>
				{/each}
			</h1>
		{/if}

		<nav class="ml-auto shrink-0 {cn(className)}">
			<h5 class="font-dsiplay font-normal tracking-wide">
				<a href="/">
					{#each "RishavMandal".split("") as char, index}
						<span style="--delay:{++index}" class="inline-block">{@html char == "v" ? char + "&nbsp;" : char}</span>
					{/each}
				</a>
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

<style>
	nav a:hover > span[style] {
		animation: lift-up 750ms;
		animation-delay: calc(var(--delay) * 75ms);
		/* animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275); */
		animation-timing-function: cubic-bezier(0.600, -0.280, 0.735, 0.045);
	}
	@keyframes lift-up {
		from, to {
			transform: translateY(0rem);
		}
		50% {
			transform: translateY(-2px);
		}
	}
</style>