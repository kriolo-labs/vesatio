"use client";

import { Card } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Novos', value: 45, color: '#3b82f6' }, // blue-500
  { name: 'Contactados', value: 32, color: '#0ea5e9' }, // sky-500
  { name: 'Qualificados', value: 24, color: '#eab308' }, // yellow-500
  { name: 'Proposta', value: 18, color: '#f59e0b' }, // amber-500
  { name: 'Negociação', value: 12, color: '#f97316' }, // orange-500
  { name: 'Fechados', value: 8, color: '#10b981' }, // emerald-500
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-onyx-950 border border-white/10 p-2 rounded shadow-xl">
        <p className="text-white font-medium text-sm">{label}</p>
        <p className="text-gold text-sm">{`${payload[0].value} Leads`}</p>
      </div>
    );
  }
  return null;
};

export function PipelineFunnel() {
    return (
        <Card className="p-6 bg-onyx-900 border-white/5">
            <h3 className="text-lg font-semibold text-white mb-6">Funil de Vendas</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                         <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={100} 
                            tick={{ fill: '#94a3b8', fontSize: 12 }} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="mt-4 grid grid-cols-6 gap-2 text-center">
                {data.map((item) => (
                    <div key={item.name} className="flex flex-col items-center">
                        <span className="text-[10px] text-diamond-muted uppercase tracking-wider">{item.name}</span>
                        <span className="text-sm font-bold text-white">{item.value}</span>
                        <div className="w-1.5 h-1.5 rounded-full mt-1" style={{ backgroundColor: item.color }} />
                    </div>
                ))}
            </div>
        </Card>
    );
}
