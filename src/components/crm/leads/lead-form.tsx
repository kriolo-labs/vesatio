"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Assuming standard shadcn form
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock validation schema
const leadSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Tipo de projeto é obrigatório"),
  investment: z.number().min(0).optional(),
  source: z.string().min(1, "Origem é obrigatória"),
  notes: z.string().optional(),
});

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function LeadForm({ open, onOpenChange, onSubmit }: LeadFormProps) {
  const form = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      investment: undefined,
      source: "",
      notes: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof leadSchema>) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-onyx-950 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Novo Lead</DialogTitle>
          <DialogDescription className="text-diamond-muted">
            Preencha os dados do potencial cliente.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Nome</FormLabel>
                        <FormControl><Input {...field} className="bg-onyx-900 border-white/10" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl><Input {...field} className="bg-onyx-900 border-white/10" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Telefone</FormLabel>
                        <FormControl><Input {...field} className="bg-onyx-900 border-white/10" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="source" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Origem</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="bg-onyx-900 border-white/10">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="referral">Recomendação</SelectItem>
                                <SelectItem value="ads">Publicidade</SelectItem>
                                <SelectItem value="event">Evento</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

             <FormField control={form.control} name="projectType" render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Tipo de Projeto</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                             <SelectTrigger className="bg-onyx-900 border-white/10">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="residencial_completo">Residencial Completo</SelectItem>
                            <SelectItem value="cozinha">Cozinha</SelectItem>
                            <SelectItem value="smart_home">Smart Home</SelectItem>
                             <SelectItem value="hotelaria">Hotelaria</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />

            <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Notas</FormLabel>
                    <FormControl>
                        <textarea 
                            {...field} 
                            className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-onyx-900 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <DialogFooter>
               <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-diamond-muted hover:text-white hover:bg-white/5">Cancelar</Button>
              <Button type="submit" className="btn-primary">Criar Lead</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
