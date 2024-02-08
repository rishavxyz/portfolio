<script>
	import Link from "$lib/icons/link.svelte";
  import { page } from "$app/stores";
	import { copy } from "svelte-copy";

  let backgroundColor = "bg-neutral-200/80";

  const reset = ()=> setTimeout(()=> backgroundColor = "bg-neutral-200/80", 5000);

</script>

<div class="flex flex-wrap gap-5">
  <!-- Copy link -->
  <button class="p-2 rounded-full label inline-flex gap-2 {backgroundColor}"
    use:copy={$page.url.href}
    on:svelte-copy:error={()=> (backgroundColor = "bg-red-300") && reset()}
    on:svelte-copy={()=> (backgroundColor = "bg-green-300") && reset()}
  >
    <Link />
  </button>

</div>