export interface CourseVideo {
  title: string;
  duration: string;
  link: string;
}

export interface Course {
  id: string;
  name: string;
  category: string; // Changed to string to support dynamic DB categories
  source: string;
  lecturer: string;
  duration: string; // Display string e.g., "5h 30m"
  durationMinutes: number; // For sorting/filtering logic
  videoCount: number;
  topics: string[]; // For search indexing
  videos: CourseVideo[]; // Detailed video list
  link: string; // Main link (usually first video)
  thumbnail: string;
  description: string;
  rating: number;
}

// Keeping enum for color/icon mapping reference, though the app now accepts any string
export enum CourseCategory {
  SALES_MANAGEMENT = 'Sales Management',
  MANAGEMENT_LEADERSHIP = 'Management & Leadership',
  DEVELOPMENT = 'Development',
  DESIGN = 'Design',
  BUSINESS = 'Business',
  DATA_SCIENCE = 'Data Science',
  MARKETING = 'Marketing',
  PHOTOGRAPHY = 'Photography',
}

export interface FilterState {
  search: string;
  categories: string[];
  sources: string[];
  maxDuration: number | null; // minutes
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}