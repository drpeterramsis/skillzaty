import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Course, CourseCategory } from '../types';

// --- SVG CONFIGURATION ---

// SVG Paths for Category Icons (Simple, recognizable shapes)
const ICONS = {
  BRIEFCASE: "M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM10 4h4v3h-4V4z",
  CHART: "M4 2v18H2V2h2zm2 18h2v-6H6v6zm4 0h2V8h-2v12zm4 0h2v-8h-2v8zm4 0h2V4h-2v16z",
  CODE: "M6.6 15l-3.3-3 3.3-3M17.4 9l3.3 3-3.3 3M2 12h20", // Simplified code/terminal
  PALETTE: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.06 16.06c-.52.52-1.35.59-1.87.08-.28-.28-.43-.65-.43-1.04 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .39-.15.76-.43 1.04-.52.51-1.35.44-1.87-.08C3.89 15.42 2 12.06 2 8.5 2 4.91 4.91 2 8.5 2s6.5 2.91 6.5 6.5c0 3.56-1.89 6.92-4.44 9.56z",
  CAMERA: "M20 6h-2.18c-.41 0-.78-.24-.95-.62L16.11 3.5c-.24-.55-.78-.9-1.38-.9H9.27c-.6 0-1.14.35-1.38.9L7.13 5.38c-.17.38-.54.62-.95.62H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
  USERS: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.02 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  MEGAPHONE: "M19 3a1 1 0 0 0-1 1v12.5A2.5 2.5 0 0 1 15.5 19H14v2h2.5c2.48 0 4.5-2.02 4.5-4.5V4a1 1 0 0 0-1-1zM4 6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3l5 4V2l-5 4H4z",
  DATABASE: "M12 2C6.48 2 2 4.02 2 6.5S6.48 11 12 11s10-2.02 10-4.5S17.52 2 12 2zm0 18c-5.52 0-10-2.02-10-4.5v-9c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v9c0 2.48-4.48 4.5-10 4.5z"
};

// Style Configuration for Categories (Colors + Icons)
const CATEGORY_STYLES: Record<string, { colors: [string, string], icon: string }> = {
  'Sales': { colors: ['#ea580c', '#dc2626'], icon: ICONS.CHART },
  'Management': { colors: ['#4f46e5', '#3730a3'], icon: ICONS.USERS },
  'Leadership': { colors: ['#4f46e5', '#3730a3'], icon: ICONS.USERS },
  'Development': { colors: ['#0f172a', '#334155'], icon: ICONS.CODE },
  'Code': { colors: ['#0f172a', '#334155'], icon: ICONS.CODE },
  'Design': { colors: ['#db2777', '#be185d'], icon: ICONS.PALETTE },
  'Art': { colors: ['#db2777', '#be185d'], icon: ICONS.PALETTE },
  'Business': { colors: ['#2563eb', '#1e40af'], icon: ICONS.BRIEFCASE },
  'Finance': { colors: ['#2563eb', '#1e40af'], icon: ICONS.BRIEFCASE },
  'Data': { colors: ['#0d9488', '#115e59'], icon: ICONS.DATABASE },
  'Marketing': { colors: ['#ca8a04', '#eab308'], icon: ICONS.MEGAPHONE },
  'Photography': { colors: ['#57534e', '#292524'], icon: ICONS.CAMERA },
  'Video': { colors: ['#57534e', '#292524'], icon: ICONS.CAMERA },
};

const FALLBACK_STYLE = { colors: ['#64748b', '#475569'], icon: ICONS.BRIEFCASE };

// Helper to escape XML special characters to prevent broken SVGs
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

/**
 * Determines the style for a course based on its category name by checking for keywords.
 */
const getStyleForCategory = (category: string) => {
  const catLower = category.toLowerCase();
  const matchedKey = Object.keys(CATEGORY_STYLES).find(key => 
    catLower.includes(key.toLowerCase())
  );
  return matchedKey ? CATEGORY_STYLES[matchedKey] : FALLBACK_STYLE;
};

/**
 * Generates an SVG Data URI containing the course icon and name.
 */
const generateCourseThumbnail = (category: string, courseName: string): string => {
  try {
    const style = getStyleForCategory(category);
    const width = 800;
    const height = 450;
    
    // Text Wrapping Logic
    const maxCharsPerLine = 25;
    const words = (courseName || 'Unknown Course').split(' ');
    let line1 = '';
    let line2 = '';

    for (const word of words) {
      if ((line1 + word).length <= maxCharsPerLine) {
        line1 += (line1 ? ' ' : '') + word;
      } else {
        line2 += (line2 ? ' ' : '') + word;
      }
    }
    
    if (line2.length > 30) {
      line2 = line2.substring(0, 27) + '...';
    }

    const safeLine1 = escapeXml(line1);
    const safeLine2 = escapeXml(line2);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${style.colors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${style.colors[1]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <rect width="100%" height="100%" fill="#ffffff" opacity="0.05" />
        <circle cx="10%" cy="10%" r="200" fill="#ffffff" opacity="0.05" />
        <circle cx="90%" cy="90%" r="150" fill="#000000" opacity="0.05" />
        <g transform="translate(${width/2 - 60}, ${height/2 - 90}) scale(5)">
          <path d="${style.icon}" fill="#ffffff" opacity="0.9" />
        </g>
        <text x="50%" y="${height * 0.75}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="42" fill="#ffffff" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
          ${safeLine1}
        </text>
        ${safeLine2 ? `
        <text x="50%" y="${height * 0.86}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="42" fill="#ffffff" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
          ${safeLine2}
        </text>
        ` : ''}
      </svg>
    `.trim();

    const utf8Bytes = new TextEncoder().encode(svg);
    const binaryString = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join('');
    const encoded = window.btoa(binaryString);
    
    return `data:image/svg+xml;charset=utf-8;base64,${encoded}`;
  } catch (error) {
    return "data:image/svg+xml;charset=utf-8;base64," + window.btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
        <rect width="100%" height="100%" fill="#cbd5e1"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="24">Image Unavailable</text>
      </svg>
    `);
  }
};


// --- HELPERS ---

const getCol = (row: any, keys: string[]): any => {
  for (const key of keys) {
    if (row[key] !== undefined) return row[key];
  }
  return null;
};

const parseDurationToMinutes = (durationStr: string): number => {
  if (!durationStr) return 0;
  const lower = durationStr.toLowerCase();
  let minutes = 0;
  const hMatch = lower.match(/(\d+)\s*h/);
  const mMatch = lower.match(/(\d+)\s*m/);
  const hourTextMatch = lower.match(/(\d+)\s*hour/);
  const minTextMatch = lower.match(/(\d+)\s*minute/);
  if (hMatch) minutes += parseInt(hMatch[1]) * 60;
  else if (hourTextMatch) minutes += parseInt(hourTextMatch[1]) * 60;
  if (mMatch) minutes += parseInt(mMatch[1]);
  else if (minTextMatch) minutes += parseInt(minTextMatch[1]);
  return minutes;
};

// --- DATA FETCHING ---

export const fetchCoursesFromSupabase = async (): Promise<Course[]> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  let allData: any[] = [];
  let page = 0;
  const pageSize = 1000;
  let hasMore = true;
  let tableName = 'courses';

  // Pagination loop to fetch all data from Supabase
  // Supabase limits responses to 1000 rows by default, so we must page through.
  try {
    while (hasMore) {
      // Fetch chunk
      let { data, error } = await supabase
        .from(tableName)
        .select('*')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      // --- Error Handling & Fallback ---
      
      // Fallback for case-sensitive table names (only check on first page)
      if (page === 0 && error && (error.code === '42P01' || error.message.includes('not find') || error.message.includes('does not exist'))) {
        console.warn(`Table '${tableName}' not found, attempting 'Courses'...`);
        tableName = 'Courses';
        const retry = await supabase
          .from(tableName)
          .select('*')
          .range(0, pageSize - 1);
        
        data = retry.data;
        error = retry.error;
      }

      if (error) {
        console.error('Supabase Fetch Error:', error);
        if (error.code === '42P01' || error.message.includes('not find') || error.message.includes('does not exist')) {
          throw new Error("TABLE_NOT_FOUND");
        }
        throw new Error(`Database Error: ${error.message}`);
      }

      // --- Data Aggregation ---

      if (data && data.length > 0) {
        allData = [...allData, ...data];
        
        // If we got less than pageSize, we've reached the end
        if (data.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false; // No data returned, stop
      }

      // Safety break to prevent infinite loops on extremely large/malformed APIs
      if (page > 50) { // Limit to 50k rows for safety
        console.warn("Reached 50k row limit, stopping fetch.");
        hasMore = false;
      }
    }
  } catch (err: any) {
    console.error("Critical Fetch Error:", err);
    throw err; // Re-throw to be caught by App.tsx
  }

  if (allData.length === 0) return [];

  // --- Processing Data ---

  const coursesMap = new Map<string, Course>();

  allData.forEach((row: any) => {
    const courseName = getCol(row, ['course_name', 'Course Name', 'name']);
    const lecturer = getCol(row, ['lecturer', 'Lecturer']);
    const categoryRaw = getCol(row, ['course_category', 'Course Category', 'category']);
    const source = getCol(row, ['source', 'Source']);
    const totalDuration = getCol(row, ['total_duration', 'Total Duration']);
    const totalVideos = getCol(row, ['total_videos', 'Total Videos']);
    const videoTopic = getCol(row, ['video_topic', 'Video Topic', 'topic']);
    const videoDuration = getCol(row, ['video_duration', 'Video Duration']);
    const videoLink = getCol(row, ['video_link', 'Video Link', 'link']);

    if (!courseName || !videoLink) return;

    // Use name + lecturer as unique key to group videos into courses
    const courseKey = `${courseName}-${lecturer}`;

    if (!coursesMap.has(courseKey)) {
      // Use raw category from DB, fallback to 'General'
      const category = (categoryRaw || '').trim() || 'General';

      const thumbnail = generateCourseThumbnail(category, courseName);

      coursesMap.set(courseKey, {
        id: courseKey,
        name: courseName,
        category: category,
        source: source || 'Unknown Source',
        lecturer: lecturer || 'Unknown Lecturer',
        duration: totalDuration || '0h',
        durationMinutes: parseDurationToMinutes(totalDuration || ''),
        videoCount: parseInt(totalVideos || '0'),
        topics: [],
        videos: [],
        link: '',
        thumbnail: thumbnail,
        description: `Learn ${courseName} with ${lecturer}. Comprehensive training from ${source}.`,
        rating: 4.8
      });
    }

    const course = coursesMap.get(courseKey)!;
    
    // Add video segment
    course.videos.push({
      title: videoTopic || `Lesson ${course.videos.length + 1}`,
      duration: videoDuration || '0m',
      link: videoLink
    });

    if (!course.link) {
      course.link = videoLink;
    }
    
    if (videoTopic && !course.topics.includes(videoTopic)) {
      course.topics.push(videoTopic);
    }
  });

  return Array.from(coursesMap.values());
};