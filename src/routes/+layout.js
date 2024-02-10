import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
import { seoConfig } from "$lib/utils";

/** @type {import('./$types').LayoutLoad} */
export async function load({ url }) {
	return {
		url: url.pathname,
		nav: {
			background: "bg-surface",
			foreground: "text-on-surface"
		},
		seo: seoConfig({
			title: "Rishav Mandal",
			description:
				"I like to build web apps with a blend of frontend engineering and design experience"
		})
	};
}

inject({ mode: dev ? "development" : "production" });
injectSpeedInsights();
