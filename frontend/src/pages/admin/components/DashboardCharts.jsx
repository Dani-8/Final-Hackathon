import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-slate-100 p-2.5 rounded-xl shadow-lg border border-slate-800 text-xs font-mono">
                {label && <p className="font-bold text-slate-300 mb-1">{label}</p>}

                {payload.map((entry, index) => (
                    <p key={index} className="flex items-center gap-2" style={{ color: entry.color || entry.fill || '#14b8a6' }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill || '#14b8a6' }} />
                        <span className="font-medium text-slate-200">{entry.name}:</span>
                        <span className="font-bold">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function DashboardCharts({ charts }) {
    const { assetStatusData, priorityData, categoryData, issueStatusData } = charts;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8" id="admin-charts-grid">
            {/* Chart 1: Asset Operational Health */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">Asset Operational Health</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Breakdown of active physical assets status</p>
                </div>

                <div className="h-[180px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={assetStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {assetStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
                    {assetStatusData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-[10px] font-bold text-slate-600 font-sans">{entry.name} ({entry.value})</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart 2: Issues by Priority */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">Issue Priority Analysis</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Pending and resolved issues by urgency level</p>
                </div>

                <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priorityData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} allowDecimals={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Issues Count">
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-center mt-3">
                    <span className="text-[10px] text-slate-400 font-medium">Distribution of urgency tags</span>
                </div>
            </div>

            {/* Chart 3: Assets by Category */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">Top Asset Categories</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Volume breakdown of top registered inventory</p>
                </div>

                <div className="h-[180px] w-full">
                    {categoryData.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-xs text-slate-400">No category data</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} allowDecimals={false} />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} width={70} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} name="Asset Count" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="text-center mt-3">
                    <span className="text-[10px] text-slate-400 font-medium">Top 5 inventory groupings</span>
                </div>
            </div>

            {/* Chart 4: Issue Resolution Status */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">Issue Status Lifecycle</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Current phase of reported trouble tickets</p>
                </div>

                <div className="h-[180px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={issueStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {issueStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>

                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3">
                    {issueStatusData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-[9px] font-bold text-slate-600 font-sans">{entry.name} ({entry.value})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
