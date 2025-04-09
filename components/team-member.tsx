'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  gradient: string;
}

export default function TeamMember({
  name,
  role,
  bio,
  image,
  gradient,
}: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300`}
      ></div>
      <div className="relative bg-zinc-900 rounded-lg overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-zinc-300 mb-4">{bio}</p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="h-8 w-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                aria-label={`${name}'s LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                aria-label={`${name}'s Twitter`}
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                aria-label={`${name}'s GitHub`}
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-zinc-400 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
