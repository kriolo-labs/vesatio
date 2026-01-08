"use client";

import { PublicLayout } from "@/components/layout/public-layout";

export default function TermsPage() {
    return (
        <PublicLayout>
            <div className="py-32 container mx-auto px-4 max-w-3xl text-diamond-muted">
                <h1 className="text-3xl font-serif text-white mb-8">Termos de Serviço</h1>
                <div className="space-y-6 text-justify leading-relaxed">
                    <p>
                        Bem-vindo à Vesatio. Ao aceder ao nosso website, concorda com estes termos de serviço e com todas as leis e regulamentos aplicáveis.
                    </p>
                    <h2 className="text-xl text-white mt-8 mb-4">1. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo presente neste site, incluindo design, logótipos, texto e imagens, é propriedade exclusiva da Vesatio e está protegido por leis de direitos de autor.
                    </p>
                    <h2 className="text-xl text-white mt-8 mb-4">2. Exclusão de Garantias</h2>
                    <p>
                        O material neste site é fornecido "como está". A Vesatio não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias.
                    </p>
                    {/* More legal text... */}
                </div>
            </div>
        </PublicLayout>
    );
}
