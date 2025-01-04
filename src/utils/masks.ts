export function cpf(text: string) {
	return text
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
}

export function cep(text: string) {
	return text
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1");
}

export function clear(text: string) {
	return text.replace(/\D/g, "");
}

function date(text: string) {
	return text
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1/$2")
		.replace(/(\d{2})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d)/, "$1");
}

export function phone(text: string) {
	return text
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{4})\d+?$/, "$1");
}

export function currency(value: number, defaultType?: "CENT" | "REAL") {
	const type = defaultType ?? "CENT";

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(type === "CENT" ? value / 100 : value);
}

export function money(text: string) {
	let value = text;

	if (!Number.isNaN(Number(value))) {
		value = Math.round(Number(value)).toString();
	}

	const digits = clear(value).toString().padStart(3, "0");

	const formattedNumber = `${digits.slice(0, -2)}.${digits.slice(-2)}`;

	return currency(Number(formattedNumber), "REAL");
}

export const percentage = {
	parse(value: string | number) {
		const data = Number(value);

		return data * 100;
	},

	format(value: number, parse = false) {
		return `${parse ? value / 100 : value}%`;
	},
};

export const masks = {
	cep,
	cpf,
	date,
	phone,
	clear,
	money,
	currency,
	percentage,
};
