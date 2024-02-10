import { createBucketClient } from "@cosmicjs/sdk";
import { SECRET_KEY_BUCKET, SECRET_KEY_READ } from "$env/static/private";

const cosmic = createBucketClient({
	bucketSlug: SECRET_KEY_BUCKET,
	readKey: SECRET_KEY_READ
});

/**
 * @method Get all object data from Cosmic CMS
 * @param {"projects"|"articles"} type
 * @returns {Promise<Array<{
 *  slug: string; title: string; published_at: string; modified_at: string;
 *  metadata: {
 *    description: string;
 *    hero_image: { imgix_url: string; }
 *    categories: Array<{ id:string, title: string; metadata: { color: string; } }>
 *    content: string;
 * 		links: Array<{url: string}>
 *  }
 * }>>}
 */
export async function getColletion(type) {
	const data = await cosmic.objects
		.find({ type })
		.props("slug,title,metadata,published_at,modified_at")
		.depth(1);
	return data.objects;
}

/**
/**
 * @method
 * @param {"projects"|"articles"} type
 * @param {Array<string>} categories
 * @returns {Promise<Array<{
 *  slug: string; title: string; published_at: string; modified_at: string;
 *  metadata: {
 *    description: string;
 *    hero_image: { imgix_url: string; }
 *    categories: Array<{ title: string; metadata: { color: string; } }>
 *    content: string;
 * 		links: Array<{url: string}>
 *  }
 * }>>}
 */
export async function getColletionByCategory(type, categories) {
	const data = await cosmic.objects
		.find({
			type,
			$and: [
				{
					"metadata.categories": {
						$in: categories
					}
				}
			]
		})
		.props("slug,title,metadata,published_at,modified_at")
		.depth(1);
	return data.objects;
}
