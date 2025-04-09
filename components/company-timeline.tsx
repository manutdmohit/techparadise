'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const timelineEvents = [
  {
    year: '2015',
    title: 'The Beginning',
    description:
      'Tech Paradise was founded in Seattle by Alex Chen, a tech entrepreneur with a vision to create better computing hardware for both gamers and professionals.',
  },
  {
    year: '2016',
    title: 'First Product Launch',
    description:
      "Released our first custom gaming PC, the 'Quantum One', which sold out within 48 hours and received critical acclaim for its innovative cooling system.",
  },
  {
    year: '2017',
    title: 'Enterprise Entry',
    description:
      'Launched our first line of professional workstations, marking our entry into the enterprise market and establishing dual focus on gaming and corporate solutions.',
  },
  {
    year: '2018',
    title: 'Strategic Partnerships',
    description:
      'Formed partnerships with major esports teams and design studios, establishing our presence in both gaming and professional creative industries.',
  },
  {
    year: '2019',
    title: 'Innovation Award',
    description:
      'Received the Tech Innovator of the Year award for our proprietary cooling technology that reduced temperatures by 35% while maintaining silent operation.',
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description:
      'Opened offices in Europe and Asia, bringing our custom builds to gamers and businesses worldwide. Reached 100 employees milestone.',
  },
  {
    year: '2021',
    title: 'Enterprise Growth',
    description:
      'Expanded our corporate division with dedicated server solutions and infrastructure services, becoming a full-spectrum provider for enterprise computing needs.',
  },
  {
    year: '2022',
    title: 'Sustainability Initiative',
    description:
      'Implemented our Green Computing initiative, focusing on energy-efficient components and sustainable packaging, reducing our carbon footprint by 40%.',
  },
  {
    year: '2023',
    title: 'Fortune 500 Contracts',
    description:
      'Secured major contracts with several Fortune 500 companies, establishing Tech Paradise as a trusted provider of enterprise-grade computing solutions.',
  },
  {
    year: 'Today',
    title: 'Leading the Industry',
    description:
      'With over 200 employees worldwide and thousands of satisfied customers across gaming and enterprise sectors, Tech Paradise continues to push the boundaries of computing performance.',
  },
];

export default function CompanyTimeline() {
  const [activeEvent, setActiveEvent] = useState(timelineEvents.length - 1);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-800 md:left-1/2 md:-ml-0.5"></div>

      {/* Timeline events */}
      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={cn('relative', index % 2 === 0 ? 'md:text-right' : '')}
          >
            {/* Dot */}
            <div
              className={cn(
                'absolute left-4 h-8 w-8 rounded-full border-4 border-zinc-900 flex items-center justify-center cursor-pointer transition-all duration-300 md:left-1/2 md:-ml-4',
                activeEvent === index
                  ? 'bg-blue-600 border-blue-400 scale-125'
                  : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
              )}
              onClick={() => setActiveEvent(index)}
            >
              <span className="sr-only">View event</span>
            </div>

            {/* Content */}
            <div
              className={cn(
                'ml-12 md:w-[calc(50%-2rem)] md:absolute md:top-0',
                index % 2 === 0
                  ? 'md:left-0 md:pr-8 md:text-right'
                  : 'md:left-[calc(50%+2rem)] md:pl-0'
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  activeEvent === index
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.5, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className={cn(
                  'bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 transition-all duration-300',
                  activeEvent === index
                    ? 'shadow-lg shadow-blue-500/10 border-zinc-700'
                    : 'hover:border-zinc-700 cursor-pointer'
                )}
                onClick={() => setActiveEvent(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-sm font-medium',
                      activeEvent === index
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-zinc-800 text-zinc-400'
                    )}
                  >
                    {event.year}
                  </span>
                </div>
                <p className="text-zinc-400">{event.description}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
