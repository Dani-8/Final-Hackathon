import React from 'react';
import { QrTagCard } from './QrTagCard.jsx';

export function PrintGrid({ assets }) {
    return (
        <div className="grid grid-cols-2 gap-6 print:gap-8 bg-white p-8 border border-slate-200 rounded-2xl print:border-none print:shadow-none">
            {assets.map((asset) => (
                <QrTagCard key={asset._id} asset={asset} />
            ))}
        </div>
    );
}
