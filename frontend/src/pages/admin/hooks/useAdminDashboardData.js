import { useState, useEffect } from 'react';
import { assetService } from '../../../services/assetService.js';
import { issueService } from '../../../services/issueService.js';

export function useAdminDashboardData() {
    const [assets, setAssets] = useState([]);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const assetsData = await assetService.getAll();
                const issuesData = await issueService.getAll();
                setAssets(assetsData);
                setIssues(issuesData);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
            } finally {
                setLoading(false);
            }
        }
        loadDashboardData();
    }, []);

    // Compute Stats
    const totalAssets = assets.length;
    const operationalAssets = assets.filter(a => a.status === 'Operational').length;
    const issueReportedAssets = assets.filter(a => a.status === 'Issue Reported').length;
    const outOfServiceAssets = assets.filter(a => a.status === 'Out of Service').length;

    const totalIssues = issues.length;
    const activeIssues = issues.filter(i => !['Resolved', 'Closed'].includes(i.status)).length;
    const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;

    // Chart 1: Asset Operational Health (Donut)
    const assetStatusData = [
        { name: 'Operational', value: operationalAssets, color: '#0d9488' },
        { name: 'Issue Reported', value: issueReportedAssets, color: '#f59e0b' },
        { name: 'Out of Service', value: outOfServiceAssets, color: '#f43f5e' },
    ].filter(item => item.value > 0);

    if (assetStatusData.length === 0) {
        assetStatusData.push({ name: 'No registered assets', value: 1, color: '#cbd5e1' });
    }

    // Chart 2: Issue Priority Analysis (Bar)
    const priorityCounts = { low: 0, medium: 0, high: 0, critical: 0 };
    issues.forEach(i => {
        const prio = i.priority?.toLowerCase();
        if (priorityCounts[prio] !== undefined) {
            priorityCounts[prio]++;
        }
    });
    const priorityData = [
        { name: 'Low', count: priorityCounts.low, fill: '#14b8a6' },
        { name: 'Medium', count: priorityCounts.medium, fill: '#f59e0b' },
        { name: 'High', count: priorityCounts.high, fill: '#f97316' },
        { name: 'Critical', count: priorityCounts.critical, fill: '#f43f5e' },
    ];

    // Chart 3: Top Asset Categories (Horizontal Bar)
    const categoryCounts = {};
    assets.forEach(asset => {
        const cat = asset.category || 'Other';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    const categoryData = Object.keys(categoryCounts).map(cat => ({
        name: cat,
        count: categoryCounts[cat]
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    // Chart 4: Issue Status Lifecycle Breakdown (Donut)
    const issueStatusCounts = {
        'Reported': 0,
        'Assigned': 0,
        'Inspection Started': 0,
        'Maintenance In Progress': 0,
        'Waiting for Parts': 0,
        'Resolved': 0,
        'Closed': 0,
        'Reopened': 0,
        'Open': 0,
        'In Progress': 0
    };
    issues.forEach(i => {
        const st = i.status || 'Reported';
        if (issueStatusCounts[st] !== undefined) {
            issueStatusCounts[st]++;
        } else {
            issueStatusCounts[st] = (issueStatusCounts[st] || 0) + 1;
        }
    });
    const issueStatusData = Object.keys(issueStatusCounts).map(status => {
        let color = '#64748b'; // default slate-500
        if (['Open', 'Reported', 'Reopened'].includes(status)) color = '#0f766e'; // teal-dark
        if (status === 'Assigned') color = '#0d9488'; // teal
        if (['Inspection Started', 'In Progress', 'Maintenance In Progress'].includes(status)) color = '#14b8a6'; // teal-light
        if (status === 'Waiting for Parts') color = '#f59e0b'; // amber
        if (status === 'Resolved') color = '#10b981'; // emerald
        if (status === 'Closed') color = '#1e293b'; // slate-800
        return {
            name: status,
            value: issueStatusCounts[status],
            color
        };
    }).filter(item => item.value > 0);

    if (issueStatusData.length === 0) {
        issueStatusData.push({ name: 'No issues logged', value: 1, color: '#e2e8f0' });
    }

    return {
        assets,
        issues,
        loading,
        error,
        stats: {
            totalAssets,
            operationalAssets,
            activeIssues,
            outOfServiceAssets
        },
        charts: {
            assetStatusData,
            priorityData,
            categoryData,
            issueStatusData
        }
    };
}
