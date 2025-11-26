import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Layers, Clock, XCircle, PlayCircle } from 'lucide-react';
import { MOCK_COURSES, SOURCES } from './constants';
import { CourseCategory, Course, FilterState } from './types';
import CourseCard from './components/CourseCard';
import CourseModal from './components/CourseModal';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [initialVideoIndex, setInitialVideoIndex] = useState<number | null>(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    sources: [],
    maxDuration: null
  });

  // Derived Values
  const categories = Object.values(CourseCategory);
  
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const searchLower = filters.search.toLowerCase();
      
      // Search: Name, Lecturer, Course Topics, OR Video Titles
      const matchesSearch = 
        course.name.toLowerCase().includes(searchLower) ||
        course.lecturer.toLowerCase().includes(searchLower) ||
        course.topics.some(t => t.toLowerCase().includes(searchLower)) ||
        course.videos.some(v => v.title.toLowerCase().includes(searchLower));

      // Category
      const matchesCategory = 
        filters.categories.length === 0 || 
        filters.categories.includes(course.category);

      // Source
      const matchesSource = 
        filters.sources.length === 0 || 
        filters.sources.includes(course.source);

      // Duration
      let matchesDuration = true;
      if (filters.maxDuration !== null) {
        if (filters.maxDuration === 1) matchesDuration = course.durationMinutes < 300; // < 5h
        else if (filters.maxDuration === 2) matchesDuration = course.durationMinutes >= 300 && course.durationMinutes <= 1200;
        else if (filters.maxDuration === 3) matchesDuration = course.durationMinutes > 1200;
      }

      return matchesSearch && matchesCategory && matchesSource && matchesDuration;
    });
  }, [filters]);

  const totalMatchingVideos = useMemo(() => {
    if (!filters.search) return 0;
    const searchLower = filters.search.toLowerCase();
    return filteredCourses.reduce((acc, course) => {
      return acc + course.videos.filter(v => v.title.toLowerCase().includes(searchLower)).length;
    }, 0);
  }, [filteredCourses, filters.search]);

  // Handlers
  const handleCourseClick = (course: Course, videoIndex?: number) => {
    setSelectedCourse(course);
    setInitialVideoIndex(videoIndex ?? null);
  };

  const toggleCategory = (cat: CourseCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const toggleSource = (source: string) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source]
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      sources: [],
      maxDuration: null
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter">
      
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Layers className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              SkillZaty
            </h1>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                placeholder="Search courses, video topics..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
              />
            </div>
          </div>

          <div className="flex items-center">
             <button 
                className="md:hidden p-2 text-slate-500 hover:text-indigo-600"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
             >
               <Filter size={24} />
             </button>
             <div className="hidden md:flex items-center text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <span className="text-slate-600">{filteredCourses.length} Courses Found</span>
                {filters.search && totalMatchingVideos > 0 && (
                   <>
                     <span className="mx-2 text-slate-300">|</span>
                     <span className="text-indigo-600 flex items-center">
                       <PlayCircle size={12} className="mr-1" />
                       {totalMatchingVideos} Matching Videos
                     </span>
                   </>
                )}
             </div>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on small screens */}
        <div className="md:hidden px-4 pb-4">
             <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
              />
            </div>
            {/* Mobile Stats */}
            {filters.search && totalMatchingVideos > 0 && (
              <div className="mt-2 text-xs text-indigo-600 font-medium flex items-center justify-end">
                 <PlayCircle size={12} className="mr-1" />
                 {totalMatchingVideos} matching videos found across {filteredCourses.length} courses
              </div>
            )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`md:w-64 flex-shrink-0 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 space-y-8">
              
              {/* Reset Button (Mobile) */}
              <div className="flex justify-between items-center md:hidden mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <button 
                   onClick={resetFilters}
                   className="text-xs text-indigo-600 font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                  <BookOpen size={14} className="mr-2 text-indigo-500" /> Category
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.categories.includes(cat) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                        {filters.categories.includes(cat) && <span className="text-white text-xs">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={filters.categories.includes(cat)} 
                        onChange={() => toggleCategory(cat)}
                      />
                      <span className={`text-sm ${filters.categories.includes(cat) ? 'text-indigo-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                  <Layers size={14} className="mr-2 text-indigo-500" /> Platform
                </h3>
                <div className="space-y-2">
                  {SOURCES.map(source => (
                    <label key={source} className="flex items-center space-x-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.sources.includes(source) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                        {filters.sources.includes(source) && <span className="text-white text-xs">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={filters.sources.includes(source)} 
                        onChange={() => toggleSource(source)}
                      />
                      <span className={`text-sm ${filters.sources.includes(source) ? 'text-indigo-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>{source}</span>
                    </label>
                  ))}
                </div>
              </div>

               {/* Duration */}
               <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                  <Clock size={14} className="mr-2 text-indigo-500" /> Duration
                </h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setFilters(prev => ({...prev, maxDuration: prev.maxDuration === 1 ? null : 1}))}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition-colors border ${filters.maxDuration === 1 ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                  >
                    Short (&lt; 5h)
                  </button>
                  <button 
                    onClick={() => setFilters(prev => ({...prev, maxDuration: prev.maxDuration === 2 ? null : 2}))}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition-colors border ${filters.maxDuration === 2 ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                  >
                    Medium (5h - 20h)
                  </button>
                  <button 
                    onClick={() => setFilters(prev => ({...prev, maxDuration: prev.maxDuration === 3 ? null : 3}))}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition-colors border ${filters.maxDuration === 3 ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                  >
                    Long (&gt; 20h)
                  </button>
                </div>
              </div>

              {/* Clear Filters Button (Desktop) */}
              {(filters.categories.length > 0 || filters.sources.length > 0 || filters.maxDuration !== null || filters.search) && (
                <button 
                  onClick={resetFilters}
                  className="hidden md:flex items-center text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  <XCircle size={16} className="mr-1.5" /> Clear all filters
                </button>
              )}

            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    searchQuery={filters.search}
                    onClick={handleCourseClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search size={48} className="mb-4 text-slate-200" />
                <h3 className="text-lg font-medium text-slate-600">No courses found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 text-indigo-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <CourseModal 
        course={selectedCourse} 
        initialVideoIndex={initialVideoIndex}
        onClose={() => {
          setSelectedCourse(null);
          setInitialVideoIndex(null);
        }} 
      />
      
      <AIChat courses={MOCK_COURSES} />
    </div>
  );
};

export default App;