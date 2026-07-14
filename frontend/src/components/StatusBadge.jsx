import React from 'react';
import { getAssetStatusColor, getIssueStatusColor, getPriorityColor } from '../utils/statusColors.js';

export function AssetStatusBadge({ status, id }) {
  const colorClass = getAssetStatusColor(status);
  return (
    <span id={id || `as-badge-${status.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {status}
    </span>
  );
}

export function IssueStatusBadge({ status, id }) {
  const colorClass = getIssueStatusColor(status);
  return (
    <span id={id || `is-badge-${status.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority, id }) {
  const colorClass = getPriorityColor(priority);
  return (
    <span id={id || `p-badge-${priority?.toLowerCase()}`} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${colorClass}`}>
      {priority}
    </span>
  );
}
