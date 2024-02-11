<script>
	import { Link, List } from "$lib";
	import { fade, slide } from "svelte/transition";
	import { fdate } from "$lib/utils";
	import { page } from "$app/stores";
	import { goto, preloadData, pushState } from "$app/navigation";
	import { cubicOut } from "svelte/easing";

	import Slug from "./[slug]/+page.svelte";

	export let data;

	/**@param { MouseEvent & {currentTarget: HTMLAnchorElement} } e  */
	async function getPost(e) {
		if (e.metaKey || e.ctrlKey || innerWidth < 1024) return;

		e.preventDefault();

		const { href } = e.currentTarget;
		const result = await preloadData(href);

		if (result.type == "loaded" && result.status == 200) pushState(href, { selected: result.data });
		else goto(href);
	}
</script>

<div class="absolute left-0 top-0">
	<svg
		class="brightness-75 lg:brightness-95"
		width="200"
		height="200"
		viewBox="0 0 200 200"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_234_869)">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M50 0H0V100H50C22.3858 100 0 122.386 0 150V200H100V150C100 177.614 122.386 200 150 200H200V100H150C177.614 100 200 77.6142 200 50V0H100V50C100 22.3858 77.6142 0 50 0ZM100 100H50C77.6142 100 100 122.386 100 150V100ZM100 100V50C100 77.6142 122.386 100 150 100H100Z"
				fill="url(#paint0_linear_234_869)"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_234_869"
				x1="100"
				y1="0"
				x2="100"
				y2="200"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#A7B5FF" /> <stop offset="1" stop-color="#F3ACFF" />
			</linearGradient>
			<clipPath id="clip0_234_869"> <rect width="200" height="200" fill="white" /> </clipPath>
		</defs>
	</svg>
</div>

<div class="absolute bottom-6 right-6">
	<svg
		class="brightness-75 lg:brightness-95"
		width="200"
		height="200"
		viewBox="0 0 200 200"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_105_296)">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M200 98.5234C196.477 99.4861 192.769 100 188.941 100H144.233C121.117 100 102.378 118.739 102.378 141.854V191.319C102.378 194.295 102.067 197.199 101.477 200C100.514 196.477 100 192.769 100 188.941V144.233C100 121.117 81.2612 102.378 58.1456 102.378H8.68122C5.70469 102.378 2.80073 102.067 0 101.477C3.52289 100.514 7.23105 100 11.0593 100H55.7675C78.8831 100 97.622 81.2611 97.622 58.1456L97.622 8.68118C97.622 5.70466 97.9327 2.80071 98.5234 0C99.4861 3.5229 100 7.23107 100 11.0593V55.7675C100 78.8831 118.739 97.622 141.855 97.622H191.319C194.295 97.622 197.199 97.9327 200 98.5234Z"
				fill="url(#paint0_linear_105_296)"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_105_296"
				x1="100"
				y1="0"
				x2="100"
				y2="200"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#DF99F7" /> <stop offset="1" stop-color="#FFDBB0" />
			</linearGradient>
			<clipPath id="clip0_105_296"> <rect width="200" height="200" fill="white" /> </clipPath>
		</defs>
	</svg>
</div>

<section class="full-width z-10 lg:flex">
	<div class="mx-auto max-w-[55ch] shrink-0 lg:mt-6">
		<p class="label ml-4">Selected projects</p>

		<List items={data.projects} let:prop={proj} classUL="space-y-1.5">
			{@const selected = $page.state.selected?.project.title == proj.title}

			<a
				href="/projects/{proj.slug}"
				on:click={(e) => getPost(e)}
				class="group block p-4"
				class:bg-neutral-800={selected}
				class:bg-opacity-90={selected}
			>
				<h5 class="mb-1 group-active:underline mouse:group-hover:underline">
					{proj.title}
				</h5>
				<time class="!text-sm" datetime={fdate(proj.published_at)}
					>{fdate(proj.published_at)}
				</time>
				<p class="opacity-80">{proj.metadata.description}</p>
			</a>
		</List>
	</div>

	{#if $page.state.selected}
		{@const links = $page.state.selected.project.metadata.links}
		<div
			id="modal"
			class="hidden h-[768px] shrink overflow-y-scroll rounded-l-3xl bg-on-surface py-12 text-surface shadow-inner lg:block"
			transition:slide={{ axis: "x", duration: 900, easing: cubicOut }}
			role="dialog"
		>
			<div
				class="content"
				in:fade={{ delay: 762, easing: cubicOut }}
				out:fade={{ duration: 100, easing: cubicOut }}
			>
				<div class="breakout mr-0.5 flex items-center justify-end gap-4">
					<List items={links} let:prop={{ url }}>
						{#if url?.includes("github.com")}
							<Link isblank href={url} class="label text-surface/80">Github</Link>
						{/if}
					</List>

					<!-- svelte-ignore a11y-autofocus -->
					<button
						class="label underline-offset-4 focus:underline"
						on:click={() => history.back()}
						on:keyup={(e) => e.key == "Escape" && history.back()}
						autofocus
						>Back
					</button>
				</div>
				{#key $page.state.selected.url}
					<Slug data={$page.state.selected} />
				{/key}
			</div>
		</div>
	{/if}
</section>
