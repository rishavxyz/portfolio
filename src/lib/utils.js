import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitize from 'sanitize-html';

/**
 * @param   { string } date   - Raw date or string
 * @returns { string } Human friendly formatted date
 */
export function fdate(date) {
	return new Date(date).toLocaleDateString('en-us', {
		dateStyle: 'long'
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
 * @returns {number} Time in minutes
 */
export function readingTime(text) {
	const pureStr= sanitize(text);
	return Math.round(pureStr.split(" ").length / 250);
}