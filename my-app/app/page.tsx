import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center #8F1D14">
            {/* Imagem centralizada */}
            <Image src="/logo1.png" alt="Logo do Projeto" width={200} height={200} className="mb-6" />

            <h1 className="text-4xl font-bold mb-4 text-white">Bem-vindo ao nosso Projeto!</h1>
            <h2 className="text-lg mb-6 text-white">MARIDO DE ALUGUEL</h2>

            <div className="flex gap-4">
                <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    🔑 Fazer Login
                </Link>
                <Link href="/cadastro" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    📝 Criar Conta
                </Link>
            </div>
        </div>
    );
}
