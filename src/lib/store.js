import { writable } from "svelte/store";

const author = "Rishav Mandal";
/** @type {string} */
let title = author;
let description =
  'I like to build web apps with a blend of frontend engineering and design experience.';

export const SEO = writable({
		title: title == author ? author
    : `${title} | ${author}`.length > 60 ? title
    : `${title} | ${author}`,
		description,
		author
});