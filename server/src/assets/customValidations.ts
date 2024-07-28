import { Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { Empresas } from "../entity/Empresas";

export const validateCNPJ = (cnpj : any): boolean => {
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

export const validateUniqueCnpj = async (cnpj : string, currentId?) => {
    const empresaRepository = AppDataSource.getRepository(Empresas);
    let existingEmpresa
    if(currentId){
        existingEmpresa = await empresaRepository.findOne({
            where: { cnpj,
                id: Not(currentId)
            },
            
        });
    }else{
        existingEmpresa = await empresaRepository.findOne({
            where: { cnpj },
            
        });
    }
    return !existingEmpresa;
}

export const validateDate = (date : Date) => {
    return date instanceof Date && !isNaN(date.valueOf());
}