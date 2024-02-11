<script>
	import { copy } from "svelte-copy";

	let emailAddr = "email@rishavmandal.xyz";
	let hue = 230;
	let alpha = 0;
</script>

<p class="mt-3 text-xl">
	I am currently looking for a software engineer or fullstack engineer job role so,
</p>
<section
	class="full-width my-2 py-4 transition-colors"
	style="background-color: hsl({hue} 40% 40% / {alpha});"
>
	<div class="content">
		<div class="flex flex-wrap items-center justify-between">
			<h4 class="leading-tighter w-fit text-5xl tracking-tight">
				Feel
				<span class="underline decoration-green-600 decoration-wavy">free </span> to<br />contact me
			</h4>
			<p class="ml-auto flex w-fit flex-col gap-3">
				<a
					href={`mailto:${emailAddr}`}
					class="md text-2xl decoration-on-surface/80 decoration-2 underline-offset-8 hover:underline"
					>{emailAddr}</a
				>
				<button
					class="label border p-2"
					use:copy={emailAddr}
					on:svelte-copy={(/** @type {any} */ e) => {
						alpha = 1;
						const interval = setInterval(() => {
							hue = hue + Math.floor(Math.random() * 360);
						}, 270);
						e.target.innerText = "Email copied!";
						setTimeout(() => {
							clearInterval(interval);
							alpha = 0;
							e.target.innerText = "Copy instead";
						}, 5000);
					}}>Copy instead</button
				>
			</p>
		</div>
	</div>
</section>
