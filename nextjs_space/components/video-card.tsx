
'use client';

import Link from 'next/link';
import { Clock, TrendingUp } from 'lucide-react';
import { generateVideoGradient, getMethodBadge, getDifficultyBadge, getCategoryIcon } from '@/lib/video-utils';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    author: string;
    clinic: string;
    durationMinutes: number;
    operationType: string;
    method: string;
    difficulty: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const gradient = generateVideoGradient(video.id);
  const methodBadge = getMethodBadge(video.method);
  const difficultyBadge = getDifficultyBadge(video.difficulty);
  const categoryIcon = getCategoryIcon(video.operationType);
  
  // Determine platform badge
  const getPlatformBadge = () => {
    if (video.clinic.includes('WebSurg')) {
      return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'WebSurg', icon: '🔒' };
    } else if (video.clinic.includes('GIBLIB')) {
      return { bg: 'bg-teal-500/20', text: 'text-teal-400', label: 'GIBLIB', icon: '🎬' };
    } else if (video.clinic.includes('SAGES')) {
      return { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'SAGES', icon: '🎥' };
    } else if (video.clinic.includes('MedTube')) {
      return { bg: 'bg-red-500/20', text: 'text-red-400', label: 'MedTube', icon: '▶️' };
    } else if (video.clinic.includes('World Laparoscopy')) {
      return { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'World Lap', icon: '🎓' };
    } else if (video.clinic.includes('iLappSurgery')) {
      return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'iLapp', icon: '📹' };
    }
    return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Other', icon: '🏥' };
  };
  
  const platformBadge = getPlatformBadge();

  return (
    <Link href={`/videos/${video.id}`} className="group">
      <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-slate-700 hover:border-slate-600">
        {/* Gradient Thumbnail with Overlays */}
        <div className="relative h-48 overflow-hidden">
          {/* Unique Gradient Background */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.via} ${gradient.to} opacity-80 group-hover:opacity-90 transition-opacity`}
            style={{ 
              backgroundImage: `linear-gradient(${gradient.angle}deg, var(--tw-gradient-stops))` 
            }}
          />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`
          }} />
          
          {/* Category Icon (Center) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-110 duration-300">
              {categoryIcon}
            </div>
          </div>
          
          {/* Duration Badge (Top Right) */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
            <Clock size={12} />
            <span>{video.durationMinutes} мин</span>
          </div>
          
          {/* Platform Badge (Top Left) */}
          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 ${platformBadge.bg} backdrop-blur-sm rounded-full text-xs ${platformBadge.text} font-medium`}>
            <span>{platformBadge.icon}</span>
            <span>{platformBadge.label}</span>
          </div>
          
          {/* Method & Difficulty Badges (Bottom) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 ${methodBadge.bg} backdrop-blur-sm rounded-full text-xs ${methodBadge.text} font-medium`}>
              {methodBadge.label}
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1 ${difficultyBadge.bg} backdrop-blur-sm rounded-full text-xs ${difficultyBadge.text} font-medium`}>
              <span>{difficultyBadge.icon}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">
            {video.description}
          </p>
          
          {/* Author & Clinic */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-slate-600" />
              <span className="line-clamp-1">{video.author}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
