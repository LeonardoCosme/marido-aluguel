import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Cliente = sequelize.define('Cliente', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false },
    senha_hash: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false 
});
