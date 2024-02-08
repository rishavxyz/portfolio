<script>
	import Nav from './nav.svelte';
  import Link from "./link.svelte"
</script>

<div class="full-width">
  <div class="bg-surface pb-6 pt-2 text-on-surface content">
    <Nav
      class="!text-center"
      classLinks={`
      flex gap-2 justify-center
      [&>li+li]:before:content-['/']
      [&>li+li]:before:opacity-50
      [&>li+li]:before:mr-2
    `}
    />
    <footer class="space-y-3 text-center">
      <p class="opacity-80">
        Made with
        <Link isblank class="underline text-fuchsia-100 font-[520]"
          href="https://svelte.dev" text="Svelte" 
        />&comma;
        <Link isblank class="underline text-fuchsia-100 font-[520]"
          href="https://tailwindcss.com/" text="TailwindCSS" 
        />&comma;
        heavily used with <span class="font-code">`cn&lpar;&rpar;`</span> utility.
        <Link isblank class="underline text-fuchsia-100 font-[520]"
          href="https://cosmicjs.com" text="Cosmic" 
        />
        for CMS and deployed with
        <Link isblank class="underline text-fuchsia-100 font-[520]"
          href="https://vercel.com" text="Vercel" 
        />&period;
        Articles and projects are written in Markdown, rendered by
        <Link isblank class="underline text-fuchsia-100 font-[520]"
          href="https://marked.js.org" text="MarkedJS"
        />&period;
        The icons are designed by
        <Link isblank class="underline text-fuchsia-100 font-[520]"
          href="https://www.figma.com/community/file/1166831539721848736"
          text="480 design"
        />&period;
      </p>
      <p class="text-sm opacity-50">&copy; Rishav Mandal. All rights reserved.</p>
    </footer>
  </div>
</div>