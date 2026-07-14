import React from 'react';
import { Hero } from '../components/home/Hero.jsx';
import { Features } from '../components/home/Features.jsx';
import { HowItWorks } from '../components/home/HowItWorks.jsx';
import { LiveConsoleOverview } from '../components/home/LiveConsoleOverview.jsx';
import { Faq } from '../components/home/Faq.jsx';
// ============================================================

export function HomePage() {
    return (
        <div id="home-page-root" className="w-full">
            {/* 1. Hero banner & Quick Asset Finder */}
            <Hero />

            {/* 2. Interactive AI Triage Simulator */}
            <LiveConsoleOverview />

            {/* 3. Key Core Capabilities */}
            <Features />

            {/* 4. Workflow Timeline Steps */}
            <HowItWorks />

            {/* 5. Helpful FAQ Accents */}
            <Faq />
        </div>
    )
}


export default HomePage
