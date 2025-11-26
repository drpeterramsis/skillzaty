import React, { useState, useEffect } from 'react';
import { Course, CourseVideo } from '../types';
import { X, Clock, PlayCircle, User, Tag, BookOpen, ListVideo, PauseCircle, ExternalLink } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  initialVideoIndex: number | null;
  onClose: () => void;
}

const getVimeoEmbedUrl = (link: string): string | null => {
  try {
    // Regex for Vimeo URLs: https://vimeo.com/123456789/abcdef123 or https://vimeo.com/123456789
    const regex = /vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/;
    const match = link.match(regex);
    
    if (match) {
      const videoId = match[1];
      const hash = match[2];
      
      let embedUrl = `https://player.vimeo.com/video/${videoId}`;
      const params = new URLSearchParams({
        title: '0',
        byline: '0',
        portrait: '0',
        autoplay: '1',
        dnt: '1'
      });
      
      if (hash) {
        params.append('h', hash);
      }
      
      return `${embedUrl}?${params.toString()}`;
    }
    return null;
  } catch (e) {
    return null;
  }
};

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

  const embedUrl = activeVideo ? getVimeoEmbedUrl(activeVideo.link) : null;
  const currentExternalLink = activeVideo ? activeVideo.link : course.link;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white md:rounded-2xl shadow-2xl w-full max-w-5xl h-full md:h-[92vh] flex flex-col overflow-hidden animate-fade-in-up border border-slate-700/50">
        
        {/* Player / Header Section */}
        <div className="flex-shrink-0 bg-black relative w-full aspect-video md:aspect-[21/9] lg:aspect-video max-h-[50vh] group/player">
          {/* External Link Overlay Button */}
          <div className="absolute top-4 left-4 z-30 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
             <a 
               href={currentExternalLink}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-black/60 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md flex items-center transition-all border border-white/10"
             >
               <ExternalLink size={14} className="mr-1.5" />
               Open in Browser
             </a>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors backdrop-blur-md border border-white/10"
          >
            <X size={20} />
          </button>

          {activeVideo && embedUrl ? (
            <div className="absolute inset-0 z-10">
              <iframe 
                src={embedUrl} 
                className="w-full h-full" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title={activeVideo.title}
              ></iframe>
            </div>
          ) : (
            <>
              {/* If no video playing, show the generated thumbnail */}
              <img 
                src={course.thumbnail} 
                alt={course.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30">
                  <PlayCircle size={40} className="text-white" />
                </div>
              </div>
            </>
          )}
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
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-0 flex flex-col max-h-[600px]">
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
                            {/* Changed from truncate to break-words for wrapping */}
                            <p className={`text-sm font-medium mb-1 leading-snug break-words ${isActive ? 'text-indigo-700' : 'text-slate-800'}`}>
                              <span className="text-slate-400 font-normal text-xs mr-1">#{index + 1}</span>
                              {video.title}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center mt-1">
                              {video.duration}
                              {isActive && <span className="ml-2 text-indigo-600 font-bold text-[10px] uppercase tracking-wider">Playing</span>}
                            </p>
                          </div>
                        </button>
                        
                        {/* Option 2: Open External */}
                        <a 
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-100/50 transition-colors border-l border-transparent hover:border-indigo-100"
                          title="Open in new tab"
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