import { seoConfig } from "$lib/utils";

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	return {
		url: url.pathname,
		seo: seoConfig({
			title: "About",
			description: "About my self"
		})
	};
}
