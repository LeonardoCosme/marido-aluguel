"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RedefinirSenha() {
    const [novaSenha, setNovaSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleRedefinirSenha = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/redefinir-senha`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, novaSenha }),
        });

        const data = await response.json();
        setMensagem(data.message || data.error);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Redefinir Senha</h2>
            {mensagem && <p className="mb-4">{mensagem}</p>}
            <form onSubmit={handleRedefinirSenha} className="flex flex-col gap-4">
                <input type="password" placeholder="Nova Senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required className="p-2 border rounded" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Redefinir Senha</button>
            </form>
        </div>
    );
}
