"use client";
import { useState } from "react";

export default function EsqueceuSenha() {
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleEsqueceuSenha = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/esqueceu-senha`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setMensagem(data.message || data.error);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-white">Recuperação de Senha</h2>
            {mensagem && <p className="mb-4">{mensagem}</p>}
            <form onSubmit={handleEsqueceuSenha} className="flex flex-col gap-4 text-white">
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar Link</button>
            </form>
        </div>
    );
}
