import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Prestador = sequelize.define('Prestador', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false },
    especialidade: { type: DataTypes.STRING, allowNull: false },
    senha_hash: { type: DataTypes.STRING, allowNull: false },
    aprovado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
    tableName: 'prestadores', 
    timestamps: false 
});
