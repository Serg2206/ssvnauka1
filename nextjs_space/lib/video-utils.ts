
/**
 * Video thumbnail utility functions
 * Generates unique visual identifiers for each video
 */

export interface VideoGradient {
  from: string;
  via: string;
  to: string;
  angle: number;
}

/**
 * Generates a deterministic gradient based on video ID
 * Each video gets a unique, consistent gradient
 */
export function generateVideoGradient(videoId: string): VideoGradient {
  // Hash function to convert videoId to number
  let hash = 0;
  for (let i = 0; i < videoId.length; i++) {
    hash = ((hash << 5) - hash) + videoId.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Color palettes for different surgical specialties
  const gradients: VideoGradient[] = [
    // Cardiac/Vascular - Red/Pink tones
    { from: 'from-red-500', via: 'via-pink-500', to: 'to-rose-600', angle: 135 },
    { from: 'from-rose-500', via: 'via-red-400', to: 'to-pink-600', angle: 45 },
    
    // GI/Abdominal - Orange/Yellow tones
    { from: 'from-orange-500', via: 'via-amber-500', to: 'to-yellow-600', angle: 90 },
    { from: 'from-amber-500', via: 'via-orange-400', to: 'to-yellow-500', angle: 180 },
    
    // Hepatobiliary - Green tones
    { from: 'from-green-500', via: 'via-emerald-500', to: 'to-teal-600', angle: 135 },
    { from: 'from-emerald-500', via: 'via-green-400', to: 'to-teal-500', angle: 225 },
    
    // Thoracic - Blue tones
    { from: 'from-blue-500', via: 'via-cyan-500', to: 'to-sky-600', angle: 90 },
    { from: 'from-cyan-500', via: 'via-blue-400', to: 'to-indigo-500', angle: 270 },
    
    // Urological - Indigo/Purple tones
    { from: 'from-indigo-500', via: 'via-purple-500', to: 'to-violet-600', angle: 45 },
    { from: 'from-purple-500', via: 'via-indigo-400', to: 'to-violet-500', angle: 315 },
    
    // Endocrine - Purple/Pink tones
    { from: 'from-purple-500', via: 'via-fuchsia-500', to: 'to-pink-600', angle: 180 },
    { from: 'from-fuchsia-500', via: 'via-purple-400', to: 'to-pink-500', angle: 90 },
    
    // Colorectal - Slate/Gray tones
    { from: 'from-slate-500', via: 'via-gray-500', to: 'to-zinc-600', angle: 135 },
    { from: 'from-gray-500', via: 'via-slate-400', to: 'to-gray-600', angle: 225 },
  ];
  
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

/**
 * Gets category icon based on operation type
 */
export function getCategoryIcon(operationType: string): string {
  const iconMap: Record<string, string> = {
    'GASTRECTOMY': '🫀',
    'CHOLECYSTECTOMY': '💚',
    'COLECTOMY': '🩺',
    'LIVER_RESECTION': '🟢',
    'PANCREATIC_SURGERY': '🟡',
    'APPENDECTOMY': '🔴',
    'HERNIA_REPAIR': '⚪',
    'OTHER': '⚕️',
  };
  
  return iconMap[operationType] || '🏥';
}

/**
 * Gets method badge color
 */
export function getMethodBadge(method: string): { bg: string; text: string; label: string } {
  const badgeMap: Record<string, { bg: string; text: string; label: string }> = {
    'LAPAROSCOPIC': { 
      bg: 'bg-blue-500/20', 
      text: 'text-blue-400', 
      label: 'Лапароскопия' 
    },
    'ROBOTIC': { 
      bg: 'bg-purple-500/20', 
      text: 'text-purple-400', 
      label: 'Робот' 
    },
    'ENDOSCOPIC': { 
      bg: 'bg-green-500/20', 
      text: 'text-green-400', 
      label: 'Эндоскопия' 
    },
    'OPEN': { 
      bg: 'bg-orange-500/20', 
      text: 'text-orange-400', 
      label: 'Открытая' 
    },
    'OTHER': { 
      bg: 'bg-gray-500/20', 
      text: 'text-gray-400', 
      label: 'Другое' 
    },
  };
  
  return badgeMap[method] || badgeMap['OTHER'];
}

/**
 * Gets difficulty badge
 */
export function getDifficultyBadge(difficulty: string): { bg: string; text: string; icon: string } {
  const difficultyMap: Record<string, { bg: string; text: string; icon: string }> = {
    'LOW': { 
      bg: 'bg-green-500/10', 
      text: 'text-green-400', 
      icon: '●' 
    },
    'MEDIUM': { 
      bg: 'bg-yellow-500/10', 
      text: 'text-yellow-400', 
      icon: '●●' 
    },
    'HIGH': { 
      bg: 'bg-red-500/10', 
      text: 'text-red-400', 
      icon: '●●●' 
    },
  };
  
  return difficultyMap[difficulty] || difficultyMap['MEDIUM'];
}

/**
 * Generates a unique thumbnail component props
 */
export function getVideoThumbnailProps(video: {
  id: string;
  operationType: string;
  method: string;
  difficulty: string;
  durationMinutes: number;
}) {
  const gradient = generateVideoGradient(video.id);
  const icon = getCategoryIcon(video.operationType);
  const methodBadge = getMethodBadge(video.method);
  const difficultyBadge = getDifficultyBadge(video.difficulty);
  
  return {
    gradient,
    icon,
    methodBadge,
    difficultyBadge,
    duration: video.durationMinutes,
  };
}
