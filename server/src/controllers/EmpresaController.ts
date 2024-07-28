import { RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { Empresas } from "../entity/Empresas";
import { empresaSchema, empresaUpdateSchema } from "../validation";

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       required:
 *         - name
 *         - registrationDate
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID da empresa
 *         cnpj: 
 *           type: string
 *           description: O CNPJ da empresa
 *           format: CNPJ
 *         name:
 *           type: string
 *           description: O nome da empresa
 *         registrationDate:
 *           type: string
 *           format: date
 *           description: A data de registro da empresa
 *         status:
 *           type: number
 *           description: Status atual da empresa
 */

/**
 * @swagger
 * /api/empresa:
 *   get:
 *     summary: Retorna a lista de todas as empresas
 *     tags: [Empresa]
 *     responses:
 *       200:
 *         description: A lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 */

export const getEmpresas: RequestHandler = async(req, res) => {
    const eventRepo = AppDataSource.getRepository(Empresas);
    const empresas = await eventRepo.find();

    return res.status(200).json(empresas)
}

/**
 * @swagger
 * /api/empresa/{id}:
 *   get:
 *     summary: Retorna uma empresa por ID
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: Empresa não encontrada
 */

export const getEmpresaById: RequestHandler = async(req, res) => {
    const eventRepo = AppDataSource.getRepository(Empresas);
    const { id } = req.params;
    const empresaId = parseInt(id, 10);
    const empresa = await eventRepo.findOne({where: {id: empresaId}});
    if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada' })
    }
    return res.status(200).json(empresa)
}

/**
 * @swagger
 * /api/empresa:
 *   post:
 *     summary: Cria uma nova empresa
 *     tags: [Empresa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       400:
 *         description: Erro de validação (CNPJ único, CNPJ inválido, Data Inválida)
 *       500:
 *         description: Erro interno do servidor
 */

export const createEmpresa: RequestHandler = async(req, res) => {
    try{
        await empresaSchema.validate(req.body, {abortEarly: false});
        
        const eventRepo = AppDataSource.getRepository(Empresas);
        const newEmpresas = eventRepo.create(req.body);
        const empresa = await eventRepo.save(newEmpresas);
        return res.status(201).json(empresa)
    }catch(err){
        if(err.errors){
            return res.status(400).json({ errors: err.errors })
        }
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * @swagger
 * /api/empresa/{id}:
 *   put:
 *     summary: Atualiza uma empresa existente
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: Empresa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       400:
 *         description: Erro de validação (CNPJ único, CNPJ inválido, Data Inválida)
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

export const updateEmpresa: RequestHandler = async(req, res) => {
    try{
        const eventRepo = AppDataSource.getRepository(Empresas);
        const { id } = req.params;
        const empresaId = parseInt(id, 10);
        const empresa = await eventRepo.findOne({where: {id: empresaId}});
        await empresaUpdateSchema(id).validate(req.body, {abortEarly: false});
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa não encontrada' })
        }
        Object.assign(empresa, req.body);
        const updatedEmpresa = await eventRepo.save(empresa);
        return res.status(200).json(updatedEmpresa)
        
    }catch(err){
        if(err.errors){
            return res.status(400).json({ errors: err.errors })
        }
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * @swagger
 * /api/empresa/{id}:
 *   delete:
 *     summary: Exclui uma empresa existente
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da empresa
 *     responses:
 *       204:
 *         description: Empresa excluída com sucesso
 *       404:
 *         description: Empresa não encontrada
 */

export const deleteEmpresa: RequestHandler = async(req, res) => {
    const eventRepo = AppDataSource.getRepository(Empresas);
    const { id } = req.params;
    const empresaId = parseInt(id, 10);
    const empresa = await eventRepo.findOne({where: {id: empresaId}});
    if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada' })
    }
    await eventRepo.delete(empresaId);
    return res.status(204).send()
}