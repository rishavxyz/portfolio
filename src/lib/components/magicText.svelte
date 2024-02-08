<script>
	import { cn } from "$lib/utils";
  let className = "";
  export let style = "";
  export {className as class}
</script>
<span id="vert-text"
      aria-hidden="true"
      {style}
      class="font-dsiplay font-black rotate-180 text-9xl leading-[0.75]
            select-none tracking-wide
            absolute top-[-8px] right-[-15px] z-[-1] {cn(className)}">
  <slot />
</span>

<style>
  #vert-text {
    writing-mode: var(--writing-mode, vertical-rl);
    text-orientation: var(--text-orientation, sideways);
  }
</style>
