<script>
	import { cn } from '$lib/utils';
import Label from './label.svelte';
	import Post from './post.svelte';

	const Child = {
		Label,
		Post
	};

	let className = '';
	export { className as class };
</script>

<section class="relative isolate overflow-hidden {cn(className)}">
	<slot {Child} />
	<slot name="body" />
</section>
