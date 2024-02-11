import { getColletion, getColletionByCategory } from "$lib/server/cosmic";
import { seoConfig } from "$lib/utils";
import { error } from "@sveltejs/kit";

/** @type { import("./$types").PageServerLoad } */
export async function load() {
	const articles = await getColletion("articles");

	async function getFavs() {
		const articles = await getColletionByCategory("articles", ["65bc0667cb825efc974a014c"]);
		if (!articles) return { articles: null };
		return { articles };
	}

	if (!articles) error(500, "Cannot get data");

	return {
		articles,
		favs: getFavs(),
		seo: seoConfig({
			title: "Blogs",
			description:
				"Articles on web development, Linux and JavaScript, tips and tricks, small projects."
		})
	};
}
