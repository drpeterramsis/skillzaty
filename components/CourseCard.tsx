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
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden cursor-pointer flex flex-col h-full relative"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={course.thumbnail} 
          alt={course.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Source Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-indigo-700 shadow-sm border border-white/20 tracking-wide uppercase">
          {course.source}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2.5">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-sm">
            {course.category}
          </span>
          <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded-sm">
            <Star size={12} className="fill-current mr-1" />
            {course.rating}
          </div>
        </div>

        <h3 className="text-[17px] font-bold text-slate-800 leading-snug mb-2.5 group-hover:text-indigo-700 transition-colors line-clamp-2">
          {course.name}
        </h3>

        {matchingVideos.length > 0 ? (
          <div className="mb-4 bg-indigo-50/50 border border-indigo-100 rounded-lg overflow-hidden flex-1 flex flex-col min-h-[100px]">
            <div className="px-3 py-2 bg-indigo-100/40 border-b border-indigo-100 flex justify-between items-center">
               <div className="flex items-center text-xs font-bold text-indigo-800">
                  <ListVideo size={13} className="mr-1.5" />
                  {matchingVideos.length} Matching Topic{matchingVideos.length !== 1 ? 's' : ''}
               </div>
            </div>
            <div className="overflow-y-auto max-h-[180px] divide-y divide-indigo-100/50">
               {matchingVideos.map((video) => (
                 <div 
                   key={video.originalIndex}
                   onClick={(e) => {
                     e.stopPropagation();
                     onClick(course, video.originalIndex);
                   }}
                   className="p-2.5 hover:bg-white transition-colors cursor-pointer group/item flex items-start gap-2.5"
                   title={`Play: ${video.title}`}
                 >
                    <PlayCircle size={14} className="text-indigo-500 group-hover/item:text-indigo-700 shrink-0 mt-0.5" />
                    {/* Changed from truncate to break-words/leading-relaxed for wrapped text */}
                    <span className="text-sm text-slate-700 font-medium leading-snug flex-1 group-hover/item:text-slate-900 break-words">
                      {video.title}
                    </span>
                    <a 
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded p-1 shrink-0"
                      title="Open external link"
                    >
                      <ExternalLink size={12} />
                    </a>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-medium">
          <div className="flex items-center" title={course.lecturer}>
            <Monitor size={14} className="mr-1.5 text-slate-400" />
            <span className="truncate max-w-[120px]">{course.lecturer}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5 text-slate-400" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <PlayCircle size={14} className="mr-1.5 text-slate-400" />
              {course.videoCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;