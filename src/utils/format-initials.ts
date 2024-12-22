export function formatInitials(name: string) {
	const [firstName, lastName] = name.toUpperCase().split(" ");

	const firstLetter = firstName.charAt(0);
	const lastLetter = lastName ? lastName.charAt(0) : "";

	return `${firstLetter}${lastLetter}`;
}
