// validationSchema.ts
import * as Yup from 'yup';

const validateCNPJ = (cnpj : any): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    // Eliminate known invalid CNPJs
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
};
const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

export const validationSchema = Yup.object({
    razaoSocial: Yup.string()
        .required('Informe a razão social para adicionar a empresa.'),
    status: Yup.number()
        .required('Selecione o status atual da empresa.')
        .min(1, "Selecione o status atual da empresa."),
    cnpj: Yup.string()
        .required('Informe o CNPJ para adiconar a empresa.')
        .test("is-valid-cnpj", "CNPJ inválido.", (value) => validateCNPJ(value))
        .min(18, 'You must be at least 18 years old'),
    dataRegistro: Yup.date().typeError("Data inválida")
        .required('Informe a data que a empresa foi registrada.')
        .max(getToday(), 'Data de registro inválida.')
});
