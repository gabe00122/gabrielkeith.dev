type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

export function isMobile() {
	return /Mobi/.test(window.navigator.userAgent);
}

/** Zero-padded YYYY-MM-DD, tolerant of frontmatter dates like '2024-5-30' */
export function isoDate(date: string) {
	const [year, month, day] = date.split('-');
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
