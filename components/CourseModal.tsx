import React, { useState, useEffect } from 'react';
import { Course, CourseVideo } from '../types';
import { X, Clock, PlayCircle, User, Tag, BookOpen, ListVideo, PauseCircle, ExternalLink, Globe } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  initialVideoIndex: number | null;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, initialVideoIndex, onClose }) => {
  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(null);

  // Initialize active video based on props
  useEffect(() => {
    if (course && initialVideoIndex !== null && initialVideoIndex >= 0 && initialVideoIndex < course.videos.length) {
      setActiveVideo(course.videos[initialVideoIndex]);
    } else {
      setActiveVideo(null);
    }
  }, [course, initialVideoIndex]);

  if (!course) return null;

  // Determine which link and title to display
  const targetLink = activeVideo ? activeVideo.link : course.link;
  const targetTitle = activeVideo ? activeVideo.title : "Start Course";
  const targetDuration = activeVideo ? activeVideo.duration : course.duration;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white md:rounded-2xl shadow-2xl w-full max-w-5xl h-full md:h-[90vh] flex flex-col overflow-hidden animate-fade-in-up border border-slate-700/50">
        
        {/* Compact Banner Section */}
        <div className="flex-shrink-0 bg-slate-900 relative w-full h-48 md:h-56 group/banner overflow-hidden">
          
          {/* Background Image with Blur */}
          <div className="absolute inset-0">
             <img 
               src={course.thumbnail} 
               alt={course.name} 
               className="w-full h-full object-cover opacity-40 blur-sm scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white p-2 rounded-full transition-all backdrop-blur-md border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Main Call to Action Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-12 h-12 mb-3 bg-indigo-600/90 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                <Globe size={24} />
             </div>
             
             <h3 className="text-white text-lg md:text-xl font-bold mb-1 drop-shadow-md line-clamp-1 max-w-2xl">
               {activeVideo ? `Selected Lesson: ${activeVideo.title}` : course.name}
             </h3>
             
             <p className="text-slate-300 text-xs md:text-sm mb-5 font-medium flex items-center gap-2">
                <span className="uppercase tracking-wider">{course.source}</span>
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                <span>{targetDuration}</span>
             </p>

             <a 
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-indigo-700 hover:text-indigo-800 hover:bg-slate-50 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95"
             >
                <span>Open in Browser</span>
                <ExternalLink size={16} />
             </a>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Info */}
              <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-sm bg-indigo-100 text-indigo-800 text-xs font-bold tracking-wider uppercase shadow-sm">
                        {course.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3">
                    {course.name}
                  </h2>
                  <div className="flex items-center text-slate-600 text-sm font-medium">
                    <User size={16} className="mr-2 text-indigo-600" />
                    {course.lecturer}
                  </div>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                <div className="flex items-center bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                  <Clock size={16} className="mr-2.5 text-indigo-500" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                  <PlayCircle size={16} className="mr-2.5 text-indigo-500" />
                  <span className="font-medium">{course.videoCount} Lessons</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                  <BookOpen size={16} className="mr-2.5 text-indigo-500" />
                  <span className="font-medium">{course.source}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">About this Course</h3>
                <p className="text-slate-700 leading-relaxed text-base font-normal">
                  {course.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                 <div className="flex items-center mb-3">
                   <Tag size={16} className="mr-2 text-indigo-500" />
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Topics</h4>
                 </div>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-sm font-medium border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Playlist */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-0 flex flex-col max-h-[500px]">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-slate-900 flex items-center">
                    <ListVideo size={18} className="mr-2 text-indigo-600" />
                    Course Content
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                    {course.videoCount}
                  </span>
                </div>
                <div className="divide-y divide-slate-100 overflow-y-auto">
                  {course.videos && course.videos.map((video, index) => {
                    const isActive = activeVideo?.link === video.link;
                    return (
                      <div 
                        key={index}
                        className={`w-full group flex items-stretch transition-colors ${isActive ? 'bg-indigo-50 ring-l-4 ring-indigo-500' : 'hover:bg-slate-50'}`}
                      >
                        <button 
                          onClick={() => setActiveVideo(video)}
                          className="flex-1 text-left p-3.5 flex items-start gap-3 hover:bg-indigo-50/50 transition-colors"
                        >
                          <div className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`}>
                            {isActive ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium mb-1 leading-snug break-words ${isActive ? 'text-indigo-700' : 'text-slate-800'}`}>
                              <span className="text-slate-400 font-normal text-xs mr-1">#{index + 1}</span>
                              {video.title}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center mt-1">
                              {video.duration}
                              {isActive && <span className="ml-2 text-indigo-600 font-bold text-[10px] uppercase tracking-wider">Selected</span>}
                            </p>
                          </div>
                        </button>
                        
                        {/* Direct External Link Icon */}
                        <a 
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-100/50 transition-colors border-l border-transparent hover:border-indigo-100"
                          title="Open in new tab"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;