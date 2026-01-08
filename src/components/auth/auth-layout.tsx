import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export function AuthLayout({
  children,
  imageSrc = "/images/auth-bg.jpg", // We need to ensure this image exists or use a colorful placeholder
  imageAlt = "Vesatio Architecture",
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-onyx">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-onyx-900">
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent z-20" />
        
        {/* Placeholder for actual image if not present */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60" />

        <div className="relative z-30 flex flex-col justify-end p-12 text-white h-full">
          <div className="mb-6 relative h-16 w-40">
            <img 
                src="/images/logo-vesatio.png" 
                alt="Vesatio" 
                className="h-full w-full object-contain object-left"
            />
          </div>
          <p className="text-lg text-diamond/80 max-w-md">
            Arquitetura de luxo, gestão impecável. Bem-vindo ao centro de operações.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 relative">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
          <div className="w-full max-w-md space-y-8 relative z-10">
            {children}
          </div>
      </div>
    </div>
  );
}
