// Типы для проекта SSV Nauka

export type UserRole = 'ADMIN' | 'SURGEON' | 'STUDENT';

export type CourseLevel = 'BASIC' | 'ADVANCED' | 'EXPERT';

export type OperationType = 
  | 'CHOLECYSTECTOMY'
  | 'APPENDECTOMY'
  | 'HERNIA_REPAIR'
  | 'COLECTOMY'
  | 'GASTRECTOMY'
  | 'NEPHRECTOMY'
  | 'PROSTATECTOMY'
  | 'HYSTERECTOMY'
  | 'SPLENECTOMY'
  | 'BARIATRIC';

export type SurgicalMethod = 
  | 'LAPAROSCOPIC'
  | 'ROBOTIC'
  | 'OPEN'
  | 'HYBRID';

export type Difficulty = 
  | 'BASIC'
  | 'MEDIUM'
  | 'HIGH'
  | 'EXPERT'
  | 'COMPLEX'
  | 'INTERMEDIATE'
  | 'ADVANCED';
