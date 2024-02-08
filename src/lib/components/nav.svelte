<script>
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	let className = '';
	let title = '';
	let breakout = false;
	let classLinks = '';
  let headerClass = '';

	const links = ["blogs", "projects"];

	export { className as class, title, breakout, classLinks, headerClass };
</script>

<header class="py-4 {title && 'flex justify-between gap-10'} {breakout && 'breakout'} {headerClass}">
  {#if title}
    <h1 class="heading self-end">{title}</h1>
  {/if}
  <nav class="shrink-0 text-end {cn(className)}">
    <ul>
      <li><h6 class="font-dsiplay text-lg"><a href="/">Rishav Mandal</a></h6></li>
    </ul>
    <ul class={classLinks}>
			{#each links as link}
				<li>
					<a class="capitalize {$page.url.pathname == `/${link}` ? 'underline' : ''}" href={`/${link}`}
					 title="Go to {link}">{link}</a>
				</li>
			{/each}
    </ul>
  </nav>
</header>
