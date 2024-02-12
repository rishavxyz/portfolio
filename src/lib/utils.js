import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param   { string } date   - Raw date or string
 * @returns { string } Human friendly formatted date
 */
export function fdate(date) {
	return new Date(date).toLocaleDateString("en-us", {
		dateStyle: "long"
	});
}
/**
 * @param { string[] } classValue - Tailwind classes
 * @returns { string } Pure Tailwind classes
 */
export function cn(...classValue) {
	return twMerge(clsx(classValue));
}

/**
 * Generate estimated reading time from string
 * @param {string} text String
 * @returns {Promise<number>} Time in minutes
 */
export async function readingTime(text) {
	return Math.round(text.split(" ").length / 250);
}

/** Config for better SEO
 * @param {{
 * 	url?:string,
 * 	nav?: {
 * 		title?: string,
 * 		background?: string,
 * 		foreground?: string,
 * 	}
 * 	title?: string;
 * 	description?: string;
 * }} data
 */
export function seoConfig(data) {
	const { title: _title, ...rest } = data;
	const author = "Rishav Mandal";
	const _titleWithAuthor = `${_title} | ${author}`;

	const title =
		_title == author ? author : _titleWithAuthor.length > 60 ? _title : _titleWithAuthor;

	return { author, title, ...rest };
}
