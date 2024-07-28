import * as Yup from 'yup';
import { validateCNPJ, validateDate, validateUniqueCnpj } from './assets/customValidations';

const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

export const empresaSchema = Yup.object().shape({
    razaoSocial: Yup.string().required('Razão Social é obrigatória'),
    cnpj: Yup.string().required('CNPJ é obrigatório').min(14, 'CNPJ inválido')
        .test('is-valid-cnpj', 'CNPJ inválido', value => validateCNPJ(value))
        .test('is-unique-cnpj', 'CNPJ já existe no banco de dados', async(value) => {
            if(!value) return true;
            return await validateUniqueCnpj(value)
        }),
    dataRegistro: Yup.date().typeError("Data inválida")
        .required('Data de registro é obrigatória')
        .max(getToday(), 'Data de registro inválida.')
        .test('is-valid-date', 'Data inválida', (value) =>  validateDate(value)),
})

export const empresaUpdateSchema = (currentId : any) => Yup.object().shape({
    razaoSocial: Yup.string().required('Razão Social é obrigatória'),
    cnpj: Yup.string().required('CNPJ é obrigatório').min(14, 'CNPJ inválido')
        .test('is-valid-cnpj', 'CNPJ inválido', value => validateCNPJ(value))
        .test('is-unique-cnpj', 'CNPJ já existe no banco de dados', async(value) => {
            if(!value) return true;
            return await validateUniqueCnpj(value, currentId)
        }),
    dataRegistro: Yup.date().typeError("Data inválida")
        .required('Data de registro é obrigatória')
        .max(getToday(), 'Data de registro inválida.')
        .test('is-valid-date', 'Data inválida', (value) =>  validateDate(value)),
})