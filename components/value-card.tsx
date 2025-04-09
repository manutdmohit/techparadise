'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Shield, Users, Server } from 'lucide-react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: 'Lightbulb' | 'Shield' | 'Users' | 'Server';
  gradient: string;
}

export default function ValueCard({
  title,
  description,
  icon,
  gradient,
}: ValueCardProps) {
  const Icon = {
    Lightbulb: Lightbulb,
    Shield: Shield,
    Users: Users,
    Server: Server,
  }[icon];

  return (
    <motion.div
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all duration-300"
      whileHover={{
        y: -5,
        boxShadow: '0 10px 30px -15px rgba(138, 75, 255, 0.2)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className={`h-12 w-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center mb-4`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
}
