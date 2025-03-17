import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/config/database.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import prestadorRoutes from './src/routes/prestadorRoutes.js'; // ✅ Importa as rotas de prestadores

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); 


app.use('/api/clientes', clienteRoutes);
app.use('/api/prestadores', prestadorRoutes);

app._router.stack.forEach((middleware) => {
    if (middleware.route) { 
        console.log(`🔍 Rota carregada: ${middleware.route.path}`);
    } else if (middleware.name === 'router') { 
        middleware.handle.stack.forEach((subMiddleware) => {
            if (subMiddleware.route) {
                console.log(`🔍 Sub-rota carregada: ${subMiddleware.route.path}`);
            }
        });
    }
});


const PORT = process.env.PORT || 4000;

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado ao SQL Server com sucesso!');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
    })
    .catch(err => console.error('❌ Erro ao conectar ao banco:', err));
