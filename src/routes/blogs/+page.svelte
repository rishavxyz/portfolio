<script>
	import { Card, MagicText } from "$lib";

	export let data;
</script>

<Card let:Child class="mb-4 bg-amber-600 p-4 text-black">
	<Child.Label class="pb-2">Recently postesd</Child.Label>
	<Child.Post
		noimage
		route="/blogs"
		collection={data.articles}
		headingClass="text-lg"
		listClass="w-[90%]"
		textClass="opacity-90"
		--dash-color="black"
	/>
	<MagicText class="text-red-600">My blogs</MagicText>
</Card>

{#await data.favs then favs}
	{#if favs.articles}
		<Card let:Child class="mb-4 rounded-xl bg-rose-600 p-4 text-on-surface">
			<Child.Label class="pb-2">Author&apos;s favorite</Child.Label>
			<Child.Post
				noimage
				nodesc
				route="/blogs"
				collection={favs.articles}
				headingClass="text-lg"
				textClass="opacity-90"
				--dash-color="rgb(245 252 255 / 0.5)"
			/>
			<MagicText class="-top-4 right-4 rotate-[270deg] tracking-normal text-rose-800"
				>&hearts;</MagicText
			>
		</Card>
	{/if}
{/await}
