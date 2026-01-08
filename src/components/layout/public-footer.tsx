import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-onyx-900 border-t border-white/5 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="relative h-16 w-40">
                <img 
                    src="/images/logo-vesatio.png" 
                    alt="Vesatio" 
                    className="h-full w-full object-contain"
                />
            </div>
            <p className="text-diamond-muted max-w-xs leading-relaxed">
              Elevando o padrão da construção e design de interiores em Cabo Verde. Luxo, precisão e inovação.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Facebook size={20} />} href="#" />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h3 className="text-gold font-serif text-lg">Explorar</h3>
            <ul className="space-y-3">
              <FooterLink href="/services">Serviços Exclusivos</FooterLink>
              <FooterLink href="/portfolio">Portfólio</FooterLink>
              <FooterLink href="/about">Sobre Nós</FooterLink>
              <FooterLink href="/careers">Carreiras</FooterLink>
              <FooterLink href="/blog">Journal</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-gold font-serif text-lg">Expertise</h3>
            <ul className="space-y-3">
              <FooterLink href="/services#architecture">Arquitetura de Interiores</FooterLink>
              <FooterLink href="/services#bespoke">Marcenaria Bespoke</FooterLink>
              <FooterLink href="/services#smart-home">Domótica & Smart Home</FooterLink>
              <FooterLink href="/services#consulting">Consultoria Premium</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-gold font-serif text-lg">Contacto</h3>
            <ul className="space-y-4 text-diamond-muted">
              <li>
                <strong className="block text-white mb-1">Sede</strong>
                Av. Cidade de Lisboa, Praia<br />Santiago, Cabo Verde
              </li>
              <li>
                <strong className="block text-white mb-1">Telefone</strong>
                +238 999 99 99
              </li>
              <li>
                <strong className="block text-white mb-1">Email</strong>
                info@vesatio.com
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-diamond-muted/60 gap-4">
          <p>© {new Date().getFullYear()} Vesatio Operations. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-diamond-muted hover:text-gold transition-colors block">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="p-2 bg-white/5 rounded-full text-white hover:bg-gold hover:text-onyx transition-all duration-300"
    >
      {icon}
    </a>
  );
}
