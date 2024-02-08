<script>
	import Bookmark from "$lib/icons/bookmark.svelte";

  let bookmarked = false;
  let className = "";
  export {className as class};

  function savePost() {
    if (!localStorage) return alert("LocalStorage is not available");
    bookmarked = !bookmarked;
    return;
  }
</script>
<button on:click={savePost}
  class="btn-icon bg-neutral-200 ring-neutral-500">
  <Bookmark {bookmarked} class={className} />
</button>