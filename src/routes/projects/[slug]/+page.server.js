import { getColletion } from '$lib/server/cosmic';
import { error } from '@sveltejs/kit';

/** @type { import("./$types").PageServerLoad } */
export async function load({ params, url }) {
	const projects = await getColletion('projects');
	if (!projects) error(500, 'Cannot get data');

	const data = projects.find((project) => project.slug == params.slug);
	if (!data) error(404, 'Requested post does not exist');

	return {
		project: { ...data },
		url: url.href
	};
}
