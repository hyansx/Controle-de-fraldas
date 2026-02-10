'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DeliveryChartProps {
  data: {
    date: string;
    quantity: number;
  }[];
  title: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-hover)',
        border: '1px solid #E5E7EB',
      }}>
        <p style={{ 
          fontSize: '0.9rem', 
          fontWeight: 600, 
          color: 'var(--text-primary)',
          marginBottom: '0.25rem'
        }}>{label}</p>
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--primary-accent)',
          fontWeight: 700 
        }}>
          {payload[0].value} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>entregas</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DeliveryChart({ data, title }: DeliveryChartProps) {
  return (
    <div style={{ width: '100%', height: 350 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 800, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px'
          }}>
            {title}
          </h3>
          <div style={{ padding: '0.25rem 0.75rem', background: '#EBF8FF', color: '#3182CE', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
             Últimos 7 dias
          </div>
        </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
          barSize={40}
        >
          <defs>
            <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity={1}/>
              <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#718096', fontSize: 12, fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false} 
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#A0AEC0', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#EDF2F7', opacity: 0.4 }} />
          <Bar 
            dataKey="quantity" 
            fill="url(#colorQuantity)" 
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
