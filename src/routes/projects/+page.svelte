<script>
	import { Card, Wrap } from '$lib/index';

	export let data;
</script>

<Wrap title="Projects">
	<Card let:Child>
		<Child.Post route="/projects" collection={data.projects}
			class="mt-4"
		/>
	</Card>
</Wrap>