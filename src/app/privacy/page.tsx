"use client";

import { PublicLayout } from "@/components/layout/public-layout";

export default function PrivacyPage() {
    return (
        <PublicLayout>
            <div className="py-32 container mx-auto px-4 max-w-3xl text-diamond-muted">
                <h1 className="text-3xl font-serif text-white mb-8">Política de Privacidade</h1>
                <div className="space-y-6 text-justify leading-relaxed">
                    <p>Última atualização: Janeiro 2026</p>
                    <p>
                        A Vesatio compromete-se a proteger a sua privacidade. Esta política descreve como recolhemos, usamos e protegemos os seus dados pessoais ao utilizar o nosso website e serviços.
                    </p>
                    <h2 className="text-xl text-white mt-8 mb-4">1. Recolha de Dados</h2>
                    <p>
                        Recolhemos informações que nos fornece diretamente através dos nossos formulários de admissão e contacto, incluindo nome, email, telefone e detalhes do projeto.
                    </p>
                    <h2 className="text-xl text-white mt-8 mb-4">2. Uso da Informação</h2>
                    <p>
                        Utilizamos os seus dados exclusivamente para: processar a sua candidatura a cliente, agendar consultorias e, se consentido, enviar comunicações sobre os nossos serviços exclusivos.
                    </p>
                    {/* More legal text... */}
                </div>
            </div>
        </PublicLayout>
    );
}
