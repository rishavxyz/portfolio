<script>
	import { cn } from "$lib/utils";

  export let copied = false;
  let className = "";
  export {className as class}
</script>

{#if copied}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 {cn(className)}">
	<path fill="currentColor" d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122" opacity=".5" />
	<path fill="currentColor" d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z" />
	<path fill="currentColor" fill-rule="evenodd" d="M15.548 10.488a.75.75 0 0 1-.036 1.06l-4.286 4a.75.75 0 0 1-1.024 0l-1.714-1.6a.75.75 0 1 1 1.024-1.096l1.202 1.122l3.774-3.522a.75.75 0 0 1 1.06.036" clip-rule="evenodd" />
</svg>
{:else}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 {cn(className)}">
	<g fill="none" stroke="currentColor" stroke-width="1.5">
		<path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z" />
		<path stroke-linecap="round" d="M15 13h-3m0 0H9m3 0v-3m0 3v3m9 0c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877c-.769.768-.865 1.946-.877 4.121" />
	</g>
</svg>
{/if}