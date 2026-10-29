/** Zero-padded YYYY-MM-DD, tolerant of frontmatter dates like '2024-5-30' */
export function isoDate(date: string) {
	const [year, month, day] = date.split('-');
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
