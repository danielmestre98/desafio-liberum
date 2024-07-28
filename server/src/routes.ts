import express from 'express';
import { createEmpresa, deleteEmpresa, getEmpresaById, getEmpresas, updateEmpresa } from './controllers/EmpresaController';

const router = express.Router();

router.get('/empresa', getEmpresas);
router.get('/empresa/:id', getEmpresaById);
router.post('/empresa', createEmpresa);
router.put('/empresa/:id', updateEmpresa);
router.delete('/empresa/:id', deleteEmpresa);

export default router;