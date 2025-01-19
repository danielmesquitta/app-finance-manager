import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FormatDateProps {
	date: Date;
	mask: string;
}

export function formatDate({ date, mask }: FormatDateProps) {
	return format(date, mask, {
		locale: ptBR,
	});
}
