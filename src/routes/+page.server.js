import { getColletion } from "$lib/server/cosmic";
import { error } from "@sveltejs/kit";

/** @type { import("./$types").PageServerLoad } */
export async function load() {
	const projects = await getColletion("projects");
	const articles = await getColletion("articles");

	if (!projects || !articles) error(500, "Cannot get data");

	return { projects, articles };
}
