<script>
	import "../app.pcss";

	import "@fontsource-variable/arimo";
	import "@fontsource-variable/noto-serif";
	import "@fontsource/bebas-neue";
	import "@fontsource/ubuntu-mono";

	import { Nav, Footer } from "$lib";
	import { page } from "$app/stores";
	import { fly, slide } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { onMount } from "svelte";

	export let data;

	const routes = [
		{ href: "/about", name: "About me" },
		{ href: "/projects", name: "Projects" },
		{ href: "/blogs", name: "Blogs" }
	];

	$: background = $page.data.nav.background;
	$: foreground = $page.data.nav.foreground;

	let ready = false;
	onMount(()=> (ready = true))
</script>

<svelte:head>
	<title>{$page.data.seo.title}</title>

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="manifest" href="/site.webmanifest">

	<meta name="description" content={$page.data.seo.description} />
	<meta name="keywords" content="website portfolio developer" />
	<meta name="author" content={data.seo.author} />
</svelte:head>

{#if !ready && !data.url?.match(/blogs\/.*/i)}
	<div class="grid place-items-center h-screen fixed bg-on-surface z-50 inset-0" out:slide={{delay: 800, duration: 800}}>
		<p class="label text-lg text-surface" out:fly={{delay: 500}}>Rishav Mandal</p>
	</div>
{/if}	

{#key data.url}
	<div
		class="min-h-screen {background} {foreground}"
		in:fly={{ duration: 800, y: 200, delay: 1000, easing: cubicOut }}
		out:fly={{ duration: 800, y: -400, easing: cubicIn }}
	>
		<Nav title={$page.data.nav.title} {routes} />

		<main class="content py-3">
			<slot />
		</main>

		<Footer {routes} />
	</div>
{/key}