<script>
	import { cn } from "$lib/utils";
	let className = "";
	export let style = "";
	export { className as class };
</script>

<span
	id="vert-text"
	aria-hidden="true"
	{style}
	class="absolute right-[-15px] top-[-8px] z-[-1] rotate-180
            select-none font-dsiplay
            text-9xl font-black leading-[0.75] tracking-wide {cn(className)}"
>
	<slot />
</span>

<style>
	#vert-text {
		writing-mode: var(--writing-mode, vertical-rl);
		text-orientation: var(--text-orientation, sideways);
	}
</style>
