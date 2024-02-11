import { getColletion, getColletionByCategory } from "$lib/server/cosmic";
import { seoConfig } from "$lib/utils";
import { error } from "@sveltejs/kit";

/** @type { import("./$types").PageServerLoad } */
export async function load() {
	const projects = await getColletion("projects");
	if (!projects) error(500, "Cannot get data");

	return {
		projects,
		seo: seoConfig({
			title: "Projects",
			description:
				'My projects vary from simple Linux commands to writing "Hello World" in Haskell.'
		})
	};
}
