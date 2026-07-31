'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const trafficData = [
  { time: '00:00', visitors: 120, conversions: 4 },
  { time: '04:00', visitors: 80, conversions: 2 },
  { time: '08:00', visitors: 450, conversions: 18 },
  { time: '12:00', visitors: 980, conversions: 42 },
  { time: '16:00', visitors: 1250, conversions: 65 },
  { time: '20:00', visitors: 890, conversions: 38 },
];

const deviceData = [
  { name: 'Desktop 3D Viewers', value: 58, color: '#7c3aed' },
  { name: 'Mobile WebGL PWA', value: 34, color: '#06b6d4' },
  { name: 'Tablet / Other', value: 8, color: '#ec4899' },
];

const topSources = [
  { source: 'Direct / Spatial Web', visitors: '14,230', conversion: '4.2%', trend: '+12.4%' },
  { source: 'Google Search / SEO', visitors: '9,840', conversion: '3.8%', trend: '+8.1%' },
  { source: 'Instagram / Social 3D', visitors: '6,120', conversion: '5.1%', trend: '+24.5%' },
  { source: 'Product Hunt / Referral', visitors: '3,450', conversion: '6.8%', trend: '+18.0%' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" /> Spatial Store Analytics
          </h1>
          <p className="text-gray-400 text-sm">Real-time traffic, 3D WebGL engagement, and conversion metrics</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 p-1 rounded-xl glass-panel border-white/10">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === range ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Store Visitors', value: '33,640', trend: '+14.2%', icon: Users, color: 'text-purple-400' },
          { label: '3D Canvas Interaction Rate', value: '78.4%', trend: '+6.8%', icon: Zap, color: 'text-cyan-400' },
          { label: 'Avg 3D Dwell Time', value: '3m 42s', trend: '+18.5%', icon: Clock, color: 'text-pink-400' },
          { label: 'Overall Conversion Rate', value: '4.85%', trend: '+1.2%', icon: TrendingUp, color: 'text-emerald-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">{kpi.label}</span>
              <div className={`p-2 rounded-xl bg-white/5 ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{kpi.value}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Traffic vs Conversion Chart */}
      <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Visitor Volume & Sales Conversions</h2>
            <p className="text-xs text-gray-400">24-hour real-time traffic breakdown</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-2 text-purple-400">
              <span className="w-3 h-3 rounded-full bg-purple-500" /> Visitors
            </span>
            <span className="flex items-center gap-2 text-cyan-400">
              <span className="w-3 h-3 rounded-full bg-cyan-400" /> Conversions
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a1a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
              <Area type="monotone" dataKey="conversions" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorConversions)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Devices Pie & Top Referral Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Device Breakdown */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white">Device Breakdown</h2>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0a1a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {deviceData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} /> {d.name}
                </span>
                <span className="font-bold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Traffic Referral Sources */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white">Top Traffic Channels</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="pb-3">Source Channel</th>
                  <th className="pb-3 text-right">Visitors</th>
                  <th className="pb-3 text-right">Conversion Rate</th>
                  <th className="pb-3 text-right">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topSources.map((source, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-4 font-semibold text-white">{source.source}</td>
                    <td className="py-4 text-right text-gray-300">{source.visitors}</td>
                    <td className="py-4 text-right font-bold text-cyan-400">{source.conversion}</td>
                    <td className="py-4 text-right font-bold text-emerald-400">{source.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
