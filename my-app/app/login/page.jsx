"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState(""); // "sucesso" ou "erro"

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            setMensagem("Login realizado com sucesso!");
            setTipoMensagem("sucesso");
            localStorage.setItem("token", data.token);
        } else {
            setMensagem("❌ " + data.error);
            setTipoMensagem("erro");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>

            {/* 🔹 Mensagem de sucesso ou erro */}
            {mensagem && (
                <p className={`mb-4 px-4 py-2 font-bold rounded-md text-center ${tipoMensagem === "sucesso" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {mensagem}
                </p>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4 text-white">
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded text-black" />
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required className="p-2 border rounded text-black" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Entrar</button>
            </form>

            <p className="mt-4">
                <Link href="/esqueceu-senha" className="text-yellow-400 hover:underline font-bold">
                    🔑 Esqueceu a senha?
                </Link>
            </p>
        </div>
    );
}
