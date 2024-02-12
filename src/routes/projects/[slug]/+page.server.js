import { getColletion } from "$lib/server/cosmic";
import { readingTime, seoConfig } from "$lib/utils";
import { error } from "@sveltejs/kit";

/** @type { import("./$types").PageServerLoad } */
export async function load({ params, url }) {
	const projects = await getColletion("projects");
	if (!projects) error(500, "Cannot get data");

	const project = projects.find((project) => project.slug == params.slug);
	if (!project) error(404, "Requested post does not exist");

	return {
		url: url.href,
		project,
		nav: {
			background: "bg-on-surface",
			foreground: "text-surface",
			title: project.title
		},
		seo: seoConfig({
			title: project.title,
			description: project.metadata.description
		}),
		readingTime: await readingTime(project.metadata.content)
	};
}
