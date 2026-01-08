import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const navigation = {
    services: [
        { name: "Acabamentos Premium", href: "/servicos#acabamentos" },
        { name: "Smart Home", href: "/servicos#smart" },
        { name: "Marcenaria Bespoke", href: "/servicos#marcenaria" },
        { name: "Consultoria", href: "/servicos#consultoria" },
    ],
    company: [
        { name: "Portfolio", href: "/collection" },
        { name: "Filosofia", href: "/philosophy" },
        { name: "Admissão", href: "/admissao" },
        { name: "Contacto", href: "/contacto" },
    ],
    legal: [
        { name: "Privacidade", href: "/privacidade" },
        { name: "Termos", href: "/termos" },
    ],
};

export function PublicFooter() {
    return (
        <footer className="bg-onyx-50 border-t border-white/5">
            <div className="container-wide section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                                <span className="font-serif text-onyx font-bold">V</span>
                            </div>
                            <span className="font-serif text-xl text-diamond">VESATIO</span>
                        </Link>
                        <p className="text-diamond-muted text-sm leading-relaxed mb-6">
                            Transformamos espaços em símbolos de status. Acabamentos de ultra-luxo e integração inteligente para quem exige excelência.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/vesatio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-onyx-100 rounded-lg text-diamond-muted hover:text-gold hover:bg-onyx-200 transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com/company/vesatio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-onyx-100 rounded-lg text-diamond-muted hover:text-gold hover:bg-onyx-200 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-medium text-diamond mb-4">Serviços</h4>
                        <ul className="space-y-3">
                            {navigation.services.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-diamond-muted hover:text-gold transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-medium text-diamond mb-4">Empresa</h4>
                        <ul className="space-y-3">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-diamond-muted hover:text-gold transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-medium text-diamond mb-4">Contacto</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold shrink-0" />
                                <span className="text-sm text-diamond-muted">
                                    Rua 5 de Julho, Praia<br />
                                    Santiago, Cabo Verde
                                </span>
                            </li>
                            <li>
                                <a
                                    href="tel:+2389912345678"
                                    className="flex items-center gap-3 text-sm text-diamond-muted hover:text-gold transition-colors"
                                >
                                    <Phone className="w-5 h-5 text-gold" />
                                    +238 991 234 567
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hello@vesatio.cv"
                                    className="flex items-center gap-3 text-sm text-diamond-muted hover:text-gold transition-colors"
                                >
                                    <Mail className="w-5 h-5 text-gold" />
                                    hello@vesatio.cv
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-diamond-muted">
                        © {new Date().getFullYear()} Vesatio. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                        {navigation.legal.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm text-diamond-muted hover:text-gold transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
