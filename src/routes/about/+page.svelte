<script>
	import UniqueDesign from "$lib/icons/styled/unique-design.svelte";
	import Zig from "$lib/icons/styled/zig.svelte";
</script>

<section class="breakout space-y-6 pb-6">
	<div class="flex flex-col gap-6 lg:flex-row">
		<Zig class="h-[200px] w-[200px] shrink-0" />
		<div class="content -mx-4 space-y-4">
			<h1 class="heading">I&apos;m Rishav</h1>

			<p>
				I am currently persuing B.Tech in computer science from Rcc Institute of Information
				Technology. Back in 2020 I started learning web development. While in college I have learnt
				the good old C, operating system and how database works, at home I focused on the web and
				how do I done it right.
			</p>

			<p>
				In the past few month I started exploring the world of functional programming with Haskell.
				I really liked it and learning it day by day.
			</p>
		</div>
	</div>
	<UniqueDesign class="w-full md:ml-auto md:w-[200px]" />
	<div>
		<h2 class="heading">Beside that...</h2>
		<p>My interests are also in playing Piano and playing a game called Cat Bird.</p>
	</div>

	<div class="flex flex-col-reverse gap-6 md:flex-row">
		<div class="content -mx-4 self-center">
			<div class="space-y-4">
				<h2 class="heading">This is Mr. Bombastic Cat</h2>
				<p>
					He&apos;s a very mysterious cat, he&apos;s also very lame, most of the time I see him
					taking a nap somewhere on my yard.
				</p>
			</div>
		</div>
		<img
			src="/bomb-cat.jpeg"
			alt="The bombastic cat"
			width="360"
			height="540"
			class="[filter:grayscale(1)]"
			loading="lazy"
		/>
	</div>
</section>

<style>
	.breakout > div > * + * {
		margin-top: 1rem;
	}
</style>
