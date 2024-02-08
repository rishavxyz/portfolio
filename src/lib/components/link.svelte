<script>
	import { cn } from "$lib/utils";

	let className = '';
	/** @type {string} */
	let href;
	let text = '';
	let isblank = false;
	/**
	 * @type {import("svelte/elements").HTMLAnchorAttributes}
	 */
	let props = {};

	export { className as class, href, text, props, isblank };
</script>

<a data-active="true" {href} {...props} target={isblank ? "_blank" :"_self" } rel={isblank ? "noopener noreferrer" : ""} 
	class="active:underline mouse:hover:underline underline-offset-4
	{cn(className)}"
	>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</a>
