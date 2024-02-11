<script>
	import { cn } from "$lib/utils";

	/**
	 * @type {any[]|{length: number}}
	 */
	export let items;
	export let classUL = "";
	export let classLI = "";
</script>

<ul class={cn(classUL)}>
	{#each items as item}
		<li class={cn(classLI)}>
			<slot prop={item} />
		</li>
	{/each}
</ul>
