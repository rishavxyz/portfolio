import { getColletion, getColletionByCategory } from '$lib/server/cosmic';
import { readingTime } from '$lib/utils';
import { error } from '@sveltejs/kit';

/** @type { import("./$types").PageServerLoad } */
export async function load({ params, url }) {
	const articles = await getColletion('articles');
	if (!articles) error(500, 'Cannot get data');

	const data = articles.find((article) => article.slug == params.slug);
	if (!data) error(404, 'Requested post does not exist');

	

	async function getRelatedPosts() {
		if (!data) return;

		const categories = data.metadata.categories.map(c => c.id);
		if (categories.length < 1) return;

		const articles = await getColletionByCategory("articles", categories);
		if (!articles) error(500, 'Cannot get data');

		return {
			relatedPosts: articles
		}
	}

	return {
		url: url.href,
		article: { ...data },
		readingTime: readingTime(data.metadata.content),
		relatedPosts: getRelatedPosts()
	};
}
