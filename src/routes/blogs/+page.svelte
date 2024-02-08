<script>
	import { Card, MagicText, Wrap } from '$lib';

	export let data;
</script>

<Wrap title="Blogs">
	<Card let:Child class="mb-4 p-4 text-black bg-amber-600">
		<Child.Label class="pb-2">Recently postesd</Child.Label>
		<Child.Post noimage route="/blogs" collection={data.articles}
			headingClass="text-lg" listClass="w-[90%]" textClass="opacity-90"
			--dash-color="black"
			/>
		<MagicText class="text-red-600">My blogs</MagicText>
	</Card>

	{#await data.favs then favs}
		{#if favs.articles}
	<Card let:Child class="mb-4 p-4 text-on-surface bg-rose-600 rounded-xl">
		<Child.Label class="pb-2">Author&apos;s favorite</Child.Label>
		<Child.Post noimage nodesc route="/blogs" collection={favs.articles}
			headingClass="text-lg" textClass="opacity-90"
			--dash-color="rgb(245 252 255 / 0.5)"
			/>
		<MagicText class="text-rose-800 tracking-normal -top-4 right-4 rotate-[270deg]"
		>&hearts;</MagicText>
	</Card>
		{/if}
	{/await}
</Wrap>
