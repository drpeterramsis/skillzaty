import React from 'react';
import { Course } from '../types';
import { Clock, PlayCircle, Monitor, ExternalLink, Star, ListVideo } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  searchQuery?: string;
  onClick: (course: Course, videoIndex?: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, searchQuery, onClick }) => {
  // Find all videos that match the search query
  const matchingVideos = React.useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    return course.videos
      .map((video, index) => ({ ...video, originalIndex: index }))
      .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [course, searchQuery]);

  return (
    <div 
      onClick={() => onClick(course)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer flex flex-col h-full relative"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-indigo-600 shadow-sm">
          {course.source}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase">
            {course.category}
          </span>
          <div className="flex items-center text-amber-500 text-xs font-bold">
            <Star size={12} className="fill-current mr-1" />
            {course.rating}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
          {course.name}
        </h3>

        {matchingVideos.length > 0 ? (
          <div className="mb-4 bg-indigo-50 border border-indigo-100 rounded-lg overflow-hidden flex-1 flex flex-col min-h-[100px]">
            <div className="px-3 py-2 bg-indigo-100/50 border-b border-indigo-100 flex justify-between items-center">
               <div className="flex items-center text-xs font-bold text-indigo-700">
                  <ListVideo size={12} className="mr-1.5" />
                  {matchingVideos.length} Matching Topic{matchingVideos.length !== 1 ? 's' : ''}
               </div>
            </div>
            <div className="overflow-y-auto max-h-[160px] divide-y divide-indigo-100/50">
               {matchingVideos.map((video) => (
                 <div 
                   key={video.originalIndex}
                   onClick={(e) => {
                     e.stopPropagation();
                     onClick(course, video.originalIndex);
                   }}
                   className="p-2 hover:bg-white transition-colors cursor-pointer group/item flex items-center gap-2"
                   title={`Play: ${video.title}`}
                 >
                    <PlayCircle size={14} className="text-indigo-400 group-hover/item:text-indigo-600 shrink-0" />
                    <span className="text-xs text-slate-600 font-medium truncate flex-1 group-hover/item:text-slate-900">
                      {video.title}
                    </span>
                    <a 
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 rounded p-1"
                      title="Open external link"
                    >
                      <ExternalLink size={12} />
                    </a>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 mb-4 line-clamp-3">
            {course.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
          <div className="flex items-center">
            <Monitor size={14} className="mr-1.5" />
            <span className="truncate max-w-[100px]">{course.lecturer}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <PlayCircle size={14} className="mr-1.5" />
              {course.videoCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;