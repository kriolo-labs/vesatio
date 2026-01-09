import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/5 bg-onyx-900 pb-8 pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <div className="relative h-16 w-40">
              <img
                src="/images/logo-vesatio.png"
                alt="Vesatio"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="max-w-xs leading-relaxed text-diamond-muted">
              Elevando o padrão da construção e design de interiores em Cabo Verde. Luxo, precisão e
              inovação.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Facebook size={20} />} href="#" />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-gold">Explorar</h3>
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
            <h3 className="font-serif text-lg text-gold">Expertise</h3>
            <ul className="space-y-3">
              <FooterLink href="/services#architecture">Arquitetura de Interiores</FooterLink>
              <FooterLink href="/services#bespoke">Marcenaria Bespoke</FooterLink>
              <FooterLink href="/services#smart-home">Domótica & Smart Home</FooterLink>
              <FooterLink href="/services#consulting">Consultoria Premium</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-gold">Contacto</h3>
            <ul className="space-y-4 text-diamond-muted/80">
              <li>
                <strong className="mb-1 block text-white">Sede</strong>
                <span className="text-diamond-muted">Av. Cidade de Lisboa, Praia</span>
                <br />
                <span className="text-diamond-muted">Santiago, Cabo Verde</span>
              </li>
              <li>
                <strong className="mb-1 block text-white">Telefone</strong>
                <a
                  href="tel:+2389999999"
                  className="text-diamond-muted transition-colors hover:text-gold"
                >
                  +238 999 99 99
                </a>
              </li>
              <li>
                <strong className="mb-1 block text-white">Email</strong>
                <a
                  href="mailto:info@vesatio.com"
                  className="text-diamond-muted transition-colors hover:text-gold"
                >
                  info@vesatio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-white/5" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-diamond-muted/60 md:flex-row">
          <p>© {new Date().getFullYear()} Vesatio Operations. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacidade
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Termos
            </Link>
            <Link href="/sitemap" className="transition-colors hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="block text-diamond-muted transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="rounded-full bg-white/5 p-2 text-white transition-all duration-300 hover:bg-gold hover:text-onyx"
    >
      {icon}
    </a>
  );
}
