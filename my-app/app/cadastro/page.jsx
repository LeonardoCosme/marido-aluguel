"use client";
import { useState } from "react";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState(""); // "sucesso" ou "erro"

    const handleCadastro = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/cadastro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, telefone, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            setMensagem("✅ Cadastro realizado com sucesso!");
            setTipoMensagem("sucesso");
        } else {
            setMensagem("❌Não foi possível efeturar cadastro, erro: " + data.error);
            setTipoMensagem("erro");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-white">Cadastro</h2>

            {/* 🔹 Mensagem de sucesso ou erro */}
            {mensagem && (
                <p className={`mb-4 px-4 py-2 font-bold rounded-md text-center ${tipoMensagem === "sucesso" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {mensagem}
                </p>
            )}

            <form onSubmit={handleCadastro} className="flex flex-col gap-4 text-white">
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="p-2 border rounded text-black" />
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded text-black" />
                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required className="p-2 border rounded text-black" />
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required className="p-2 border rounded text-black" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">Cadastrar</button>
            </form>
        </div>
    );
}
