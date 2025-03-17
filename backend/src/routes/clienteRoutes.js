import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Cliente } from '../models/Clientes.js';

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    try {
        console.log("🔍 Dados recebidos no backend:", req.body); // 📌 Isso exibe os dados no console
        const { nome, email, telefone, senha } = req.body;

        if (!nome || !email || !telefone || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        }

        const senha_hash = await bcrypt.hash(senha, 10);
        const cliente = await Cliente.create({ nome, email, telefone, senha_hash });
        res.status(201).json(cliente);
    } catch (error) {
        console.error("❌ Erro ao cadastrar cliente:", error);
        res.status(400).json({ error: error.message });
    }
});


//Rota de Login de Cliente
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const cliente = await Cliente.findOne({ where: { email } });

        if (!cliente || !await bcrypt.compare(senha, cliente.senha_hash)) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Rota para Listar Todos os Clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Solicitar Recuperação de Senha
router.post("/esqueceu-senha", async (req, res) => {
    try {
        const { email } = req.body;

        // Verifica se o usuário existe
        const cliente = await Cliente.findOne({ where: { email } });
        if (!cliente) {
            return res.status(404).json({ error: "E-mail não encontrado!" });
        }

        // Gera um token de redefinição válido por 15 minutos
        const resetToken = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Simulando o envio do link de recuperação (imprimindo no console)
        const resetLink = `http://localhost:3000/redefinir-senha?token=${resetToken}`;
        console.log(`🔗 Link de recuperação de senha: ${resetLink}`);

        res.json({ message: "E-mail de recuperação enviado!", link: resetLink });
    } catch (error) {
        console.error("❌ Erro ao enviar recuperação de senha:", error);
        res.status(500).json({ error: "Erro ao processar a recuperação de senha" });
    }
});

//Rota para Redefinir Senha
router.post("/redefinir-senha", async (req, res) => {
    try {
        const { token, novaSenha } = req.body;

        // Verifica se o token é válido
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ error: "Token inválido ou expirado!" });
        }

        // Busca o usuário pelo ID contido no token
        const cliente = await Cliente.findByPk(decoded.id);
        if (!cliente) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }

        // Criptografa a nova senha
        const senha_hash = await bcrypt.hash(novaSenha, 10);
        cliente.senha_hash = senha_hash;
        await cliente.save();

        res.json({ message: "Senha redefinida com sucesso!" });
    } catch (error) {
        console.error("❌ Erro ao redefinir senha:", error);
        res.status(500).json({ error: "Erro ao redefinir a senha" });
    }
});

export default router;