import { Course, CourseCategory } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    name: 'Business Analysis & Planning',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'Mohamed Wahba',
    duration: '3h 45m',
    durationMinutes: 225,
    videoCount: 4,
    topics: ['Business Analysis', 'Planning', 'Team Details', 'Coverage', 'Sales'],
    link: 'https://vimeo.com/1137556203/260e2dd9aa',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive guide to business analysis and planning, covering team details, coverage strategies, and effective sales management techniques.',
    rating: 4.8,
    videos: [
      { title: 'Business Analysis & Planning', duration: '49 minutes', link: 'https://vimeo.com/1137556203/260e2dd9aa' },
      { title: 'Team Details P1', duration: '42 minutes', link: 'https://vimeo.com/1137556620/1962269000' },
      { title: 'Team Details P2', duration: '1 hour 29 minutes', link: 'https://vimeo.com/1137557048/80196254cb' },
      { title: 'Coverage', duration: '43 minutes', link: 'https://vimeo.com/1137558249/032c89f76c' }
    ]
  },
  {
    id: '2',
    name: 'High Performing Team',
    category: CourseCategory.MANAGEMENT_LEADERSHIP,
    source: 'GrowTwoPro',
    lecturer: 'GrowTwoPro Team',
    duration: '2h 57m',
    durationMinutes: 177,
    videoCount: 6,
    topics: ['High Performing Team', 'ORPI Model', 'Tuckman Model', 'Team Roles', 'Management'],
    link: 'https://vimeo.com/1119103767/d1b7c73c0d',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'Learn what makes a High Performing Team using the ORPI and Tuckman models. Explore the 9 essential team roles for success.',
    rating: 4.9,
    videos: [
      { title: 'High Performing Team - Introduction', duration: '13 minutes', link: 'https://vimeo.com/1119103767/d1b7c73c0d' },
      { title: 'High Performing Team - What Makes a HPT', duration: '35 minutes', link: 'https://vimeo.com/1119103935/0c22c322dc' },
      { title: 'High Performing Team - ORPI Model P1', duration: '28 minutes', link: 'https://vimeo.com/1119104185/27aa5a9ca5' },
      { title: 'High Performing Team - ORPI P2 & Tuckman Model P1', duration: '16 minutes', link: 'https://vimeo.com/1119104581/90135260d3' },
      { title: 'High Performing Team - Tuckman Model P2', duration: '41 minutes', link: 'https://vimeo.com/1119104822/c917eed394' },
      { title: 'High Performing Team - 9 Team Roles', duration: '44 minutes', link: 'https://vimeo.com/1119105184/a9d9770d8c' }
    ]
  },
  {
    id: '3',
    name: 'DM Case Study: Planning & Resource Allocation',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'GrowTwoPro Team',
    duration: '3h 25m',
    durationMinutes: 205,
    videoCount: 6,
    topics: ['Planning', 'Resource Allocation', 'Sales Forecasting', 'Business Plan', 'District Management'],
    link: 'https://vimeo.com/1115670088/797cc0bd6b',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into District Manager responsibilities including planning, resource allocation, sales forecasting, and business plan creation.',
    rating: 4.7,
    videos: [
      { title: 'Introduction And senior DM Mindset', duration: '26 minutes', link: 'https://vimeo.com/1115670088/797cc0bd6b' },
      { title: 'Case Study Discussion - Sales And Forecasting', duration: '37 minutes', link: 'https://vimeo.com/1115673780/21ebb03944' },
      { title: 'Case Study Discussion - People And D Levels', duration: '45 minutes', link: 'https://vimeo.com/1115674450/653395062e' },
      { title: 'Resources Allocation And Time Allocation', duration: '53 minutes', link: 'https://vimeo.com/1115744771/05275f34c5' },
      { title: 'Business Plan Steps', duration: '18 minutes', link: 'https://vimeo.com/1115745557/f788776ff4' },
      { title: 'Full Case Workshop ABC New Line Task', duration: '26 minutes', link: 'https://vimeo.com/1115745902/c9f92999f5' }
    ]
  },
  {
    id: '4',
    name: 'Pathway to Excel in Leadership - Recap',
    category: CourseCategory.MANAGEMENT_LEADERSHIP,
    source: 'GrowTwoPro',
    lecturer: 'GrowTwoPro Team',
    duration: '3h 59m',
    durationMinutes: 239,
    videoCount: 2,
    topics: ['Leadership', 'Diploma Blueprint', 'Management', 'Career Growth'],
    link: 'https://vimeo.com/1115669533/e7b1ed9314',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive recap of the leadership diploma blueprint, designed to accelerate your pathway to excellence in management roles.',
    rating: 4.9,
    videos: [
      { title: 'Diploma Blueprint 1st Part', duration: '2 hours 17 minutes', link: 'https://vimeo.com/1115669533/e7b1ed9314' },
      { title: 'Diploma Blueprint 2nd Part', duration: '1 hour 42 minutes', link: 'https://vimeo.com/1115673769/2dbe85aad0' }
    ]
  },
  {
    id: '5',
    name: 'Performance Management Applications',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'GrowTwoPro Team',
    duration: '3h 5m',
    durationMinutes: 185,
    videoCount: 3,
    topics: ['Performance Management', 'Feedback', 'Workshop', 'Sales Coaching'],
    link: 'https://vimeo.com/1115668353/3a22b0d473',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'Master performance management applications including workshops and understanding different feedback types for team growth.',
    rating: 4.6,
    videos: [
      { title: 'Performance Management Recap', duration: '1 hour 15 minutes', link: 'https://vimeo.com/1115668353/3a22b0d473' },
      { title: 'Performance Management Workshop', duration: '1 hour 8 minutes', link: 'https://vimeo.com/1115671425/eb7df912a0' },
      { title: 'Feedback Types', duration: '41 minutes', link: 'https://vimeo.com/1115672493/8b846e2251' }
    ]
  },
  {
    id: '6',
    name: 'Situational Leadership Applications',
    category: CourseCategory.MANAGEMENT_LEADERSHIP,
    source: 'GrowTwoPro',
    lecturer: 'GrowTwoPro Team',
    duration: '2h 37m',
    durationMinutes: 157,
    videoCount: 4,
    topics: ['Situational Leadership', 'Managerial Grid', 'Douglas McGregor Theory', 'Role Play'],
    link: 'https://vimeo.com/1115668217/d843fc5781',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description: 'Explore Situational Leadership, the Managerial Grid, and practical role-playing exercises to enhance your adaptive leadership style.',
    rating: 4.8,
    videos: [
      { title: 'Leadership Vs Management And Douglas McGregor Theory', duration: '48 minutes', link: 'https://vimeo.com/1115668217/d843fc5781' },
      { title: 'Managerial Grid Recap', duration: '43 minutes', link: 'https://vimeo.com/1115669235/5313f6d0d9' },
      { title: 'Three Skills of SL', duration: '52 minutes', link: 'https://vimeo.com/1115670755/5b35179415' },
      { title: 'Situational Leadership Role play', duration: '14 minutes', link: 'https://vimeo.com/1115671561/147c16adb9' }
    ]
  },
  {
    id: '7',
    name: 'Decision Making - Recap',
    category: CourseCategory.MANAGEMENT_LEADERSHIP,
    source: 'GrowTwoPro',
    lecturer: 'Ibrahim Mahmoud',
    duration: '1h 36m',
    durationMinutes: 96,
    videoCount: 2,
    topics: ['Decision Making', 'Critical Thinking', 'Problem Solving', '5 Steps'],
    link: 'https://vimeo.com/1115667625/93a042340a',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Sharpen your critical thinking and decision-making skills. Learn the 5 effective steps to problem solving.',
    rating: 4.7,
    videos: [
      { title: 'Decision Making And Critical Thinking Process', duration: '54 minutes', link: 'https://vimeo.com/1115667625/93a042340a' },
      { title: 'Problem Solving And 5 Steps to effective PS', duration: '42 minutes', link: 'https://vimeo.com/1115668488/2972ba5082' }
    ]
  },
  {
    id: '8',
    name: 'Principle of Management - Recap',
    category: CourseCategory.MANAGEMENT_LEADERSHIP,
    source: 'GrowTwoPro',
    lecturer: 'Ibrahim Mahmoud',
    duration: '3h 33m',
    durationMinutes: 213,
    videoCount: 5,
    topics: ['Management Principles', 'Multitasking', 'Stress Management', 'Interview Skills', 'Leadership'],
    link: 'https://vimeo.com/1115667338/9fa7228999',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'Foundational management principles including leadership issues, multitasking (Eisenhower Matrix), stress management, and interview skills.',
    rating: 4.8,
    videos: [
      { title: 'Issues in Leadership Management And What is supervisor Do', duration: '1 hour 23 minutes', link: 'https://vimeo.com/1115667338/9fa7228999' },
      { title: 'Management Definition And Skills And Leading Definition', duration: '1 hour 42 minutes', link: 'https://vimeo.com/1115667484/39d801cd8b' },
      { title: 'Multitasking And four quadrants of the eisenhower matrix', duration: '1 hour 18 minutes', link: 'https://vimeo.com/1115667795/64c726b360' },
      { title: 'Stress and Productivity', duration: '10 minutes', link: 'https://vimeo.com/1115668004/ed8579a3ca' },
      { title: 'Interview Skills Recap And Questions', duration: '1 hour 54 minutes', link: 'https://vimeo.com/1115668130/995aeab84f' }
    ]
  },
  {
    id: '9',
    name: 'Greater Cairo District Manager Case',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'Ibrahim Mahmoud',
    duration: '4h 11m',
    durationMinutes: 251,
    videoCount: 5,
    topics: ['District Management', 'SWOT Analysis', 'IMS Sheet', 'Budget Allocation', 'Segmentation'],
    link: 'https://vimeo.com/1114385804/444e371063',
    thumbnail: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80',
    description: 'An extensive case study on District Management in Greater Cairo, covering SWOT analysis, territory management, and budget allocation.',
    rating: 4.9,
    videos: [
      { title: 'Business Analysis And Planning Recap', duration: '1 hour 26 minutes', link: 'https://vimeo.com/1114385804/444e371063' },
      { title: 'Case Study Orientation, SWOT , Marketing Strategy', duration: '2 hours 59 minutes', link: 'https://vimeo.com/1114386129/be223fc151' },
      { title: 'SWOT , Terriotry ,IMS Sheet', duration: '1 hour 26 minutes', link: 'https://vimeo.com/1114386876/e70a84c721' },
      { title: 'Achievement,Incentive And Budget Allocation', duration: '1 hour 59 minutes', link: 'https://vimeo.com/1114387267/dd3796147d' },
      { title: 'Segmentation , Your Team', duration: '1 hour 19 minutes', link: 'https://vimeo.com/1114387898/b8202e427f' }
    ]
  },
  {
    id: '10',
    name: 'DM Case & Assessment & Psychometric Analysis',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'Dr. Ashraf Morsy',
    duration: '3h 45m',
    durationMinutes: 225,
    videoCount: 6,
    topics: ['Assessment', 'Psychometric Analysis', 'Business Forecasting', 'Case Study', 'Hiring'],
    link: 'https://vimeo.com/1111759275/c705794b05',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced DM training involving psychometric analysis, business forecasting, and candidate assessment rubrics.',
    rating: 4.8,
    videos: [
      { title: 'Introduction to DM case study', duration: '10 minutes', link: 'https://vimeo.com/1111759275/c705794b05' },
      { title: 'Business forecasting - Group Discussions', duration: '1 hour 7 minutes', link: 'https://vimeo.com/1111759669/f7ee2d1a05' },
      { title: 'Model of assessment rubric for candidate', duration: '18 minutes', link: 'https://vimeo.com/1111762490/a227a8f12d' },
      { title: 'Case Study Discussion - 2nd Part', duration: '1 hour 5 minutes', link: 'https://vimeo.com/1111763806/884ebdde07' },
      { title: 'Psychometric Analysis', duration: '32 minutes', link: 'https://vimeo.com/1111765744/1a6c10d216' },
      { title: 'Case Study Assessment Q&A1', duration: '33 minutes', link: 'https://vimeo.com/1111804452/29e9fad1a2' }
    ]
  },
  {
    id: '11',
    name: 'Mock Assessment Case Study for DM',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'Dr. Ashraf Morsy',
    duration: '4h 38m',
    durationMinutes: 278,
    videoCount: 4,
    topics: ['Mock Assessment', 'Team Management', 'Effectiveness', 'Delta Case Study'],
    link: 'https://vimeo.com/1110113757/554f268c39',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    description: 'Practical mock assessment center simulations for District Managers, focusing on team management and effectiveness.',
    rating: 4.7,
    videos: [
      { title: 'General Assessement Centre Case Study Discussion -Group 1', duration: '1 hour 23 minutes', link: 'https://vimeo.com/1110113757/554f268c39' },
      { title: 'Team Management And Driving Effectiveness', duration: '18 minutes', link: 'https://vimeo.com/1110115418/9b84216d26' },
      { title: 'Delta Case Study Discussion - Group 2', duration: '2 hours 5 minutes', link: 'https://vimeo.com/1110115973/2089a52145' },
      { title: 'UPPER Assessement Center Case Study Discussion -Group 3', duration: '52 minutes', link: 'https://vimeo.com/1110119664/c8802ecd92' }
    ]
  },
  {
    id: '12',
    name: 'FLM Case - Territory Turnaround Challenge',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'Mohamed Wahba',
    duration: '3h 49m',
    durationMinutes: 229,
    videoCount: 5,
    topics: ['Territory Turnaround', 'Data Analysis', 'Target Phasing', 'Resource Allocation', 'FLM'],
    link: 'https://vimeo.com/1110111171/3e1d268cce',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Tackle the Territory Turnaround Challenge. Learn data analysis, target phasing, and segment resource allocation.',
    rating: 4.8,
    videos: [
      { title: 'FLSL Business Case , Terriotry External Trends Summary', duration: '1 hour 11 minutes', link: 'https://vimeo.com/1110111171/3e1d268cce' },
      { title: 'Case Data Analysis And Area Performance Analysis', duration: '1 hour 28 minutes', link: 'https://vimeo.com/1110111937/545fd10308' },
      { title: 'Team Allocation Over My Territory', duration: '20 minutes', link: 'https://vimeo.com/1110112958/a08f5f6d6b' },
      { title: 'Target Phasing Per Quarter', duration: '13 minutes', link: 'https://vimeo.com/1110113184/62979b5e5c' },
      { title: 'Allocate Resources to segments', duration: '37 minutes', link: 'https://vimeo.com/1110113350/e515fa7943' }
    ]
  },
  {
    id: '13',
    name: 'How To Present Your Sales Business Plan?',
    category: CourseCategory.SALES_MANAGEMENT,
    source: 'GrowTwoPro',
    lecturer: 'Alber Ramzy Saad',
    duration: '3h 40m',
    durationMinutes: 220,
    videoCount: 8,
    topics: ['Sales Planning', 'SWOT', 'Competitor Analysis', 'Maturity Matrix', 'Business Plan Presentation'],
    link: 'https://vimeo.com/1110107608/53891949c0',
    thumbnail: 'https://images.unsplash.com/photo-1475721027767-f7565dde6c81?auto=format&fit=crop&w=800&q=80',
    description: 'Learn the art of presenting a Sales Business Plan. Covers SWOT, competitor analysis, maturity matrix, and sales planning execution.',
    rating: 4.9,
    videos: [
      { title: 'SWOT Analysis & CSFs', duration: '9 minutes', link: 'https://vimeo.com/1110107608/53891949c0' },
      { title: 'Sales Performance', duration: '15 minutes', link: 'https://vimeo.com/1110107734/badc36ca73' },
      { title: 'Competitors Analysis & Activities Analysis for My Team', duration: '15 minutes', link: 'https://vimeo.com/1110107871/792f157b0c' },
      { title: 'Segmentation & Targeting Performance', duration: '8 minutes', link: 'https://vimeo.com/1110108049/12f0625a0b' },
      { title: 'Maturity Matrix Analysis', duration: '21 minutes', link: 'https://vimeo.com/1110108116/473e00afb5' },
      { title: 'Sales Planning', duration: '34 minutes', link: 'https://vimeo.com/1110108435/3721e2ff80' },
      { title: 'District Manager Case Study - 1st Part', duration: '59 minutes', link: 'https://vimeo.com/1110108868/70dd61ce24' },
      { title: 'District Manager Case Study - 2ndPart', duration: '59 minutes', link: 'https://vimeo.com/1110109333/c744d2f353' }
    ]
  }
];

export const SOURCES = Array.from(new Set(MOCK_COURSES.map(c => c.source)));