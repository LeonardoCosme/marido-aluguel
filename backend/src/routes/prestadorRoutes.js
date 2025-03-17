import express from 'express';
import bcrypt from 'bcrypt';
import { Prestador } from '../models/prestador.js';

const router = express.Router();


//Rota para Listar Todos os Prestadores
router.get('/', async (req, res) => {
    try {
        const prestadores = await Prestador.findAll();
        res.json(prestadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Cadastrar um Prestador
router.post('/cadastro', async (req, res) => {
    console.log("🚀 Requisição chegou na rota /cadastro!");

    try {
        const { nome, email, telefone, especialidade, senha } = req.body;

        if (!nome || !email || !telefone || !especialidade || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        }


        const prestadorExistente = await Prestador.findOne({ where: { email } });
        if (prestadorExistente) {
            return res.status(400).json({ error: "E-mail já cadastrado! Use outro e-mail." });
        }

        // 📌 Garantir que a senha seja criptografada antes de salvar no banco
        const senha_hash = await bcrypt.hash(senha, 10);

        const prestador = await Prestador.create({ nome, email, telefone, especialidade, senha_hash });

        res.status(201).json(prestador);
    } catch (error) {
        console.error("❌ Erro ao cadastrar prestador:", error);
        res.status(400).json({ error: error.message });
    }
});

export default router;
