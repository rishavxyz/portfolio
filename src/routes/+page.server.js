import { getColletion } from "$lib/server/cosmic";
import { error } from "@sveltejs/kit";

/** @type { import("./$types").PageServerLoad } */
export async function load({setHeaders}) {

	async function loadData() {
		const projects = await getColletion("projects");
		const articles = await getColletion("articles");
		if (!projects || !articles) error(400, "Some error occured");

		return { projects, articles };
	}
	setHeaders({
		'cache-control': "max-age=120"
	});

	return {
		lazyLoad: loadData()
	}
}
