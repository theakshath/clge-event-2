export interface BuildingData {
  id: string;
  name: string;
  shortName: string;
  category: 'Entrance' | 'Academic' | 'Engineering' | 'Library' | 'Events' | 'Student Life';
  description: string;
  facilities: string[];
  coordinates: [number, number, number]; // [x, y, z] in 3D scene
  size: [number, number, number]; // [width, height, depth]
  color: string;
  accentColor: string;
  details: {
    floors: number;
    hours: string;
    contact: string;
  };
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  locationId: string;
  locationName: string;
  description: string;
  category: string;
  badge: string;
  speaker?: string;
}

export const BUILDINGS: BuildingData[] = [
  {
    id: 'main-gate',
    name: 'Main Gate',
    shortName: 'Gate 01',
    category: 'Entrance',
    description: 'The primary entry landmark of UniVerse campus with security post and visitor welcome desktop.',
    facilities: ['Visitor Pass Kiosk', 'Security Center', 'EV Shuttle Pickup', 'Campus Information Board'],
    coordinates: [0, 0.4, 9],
    size: [4.5, 0.8, 1.2],
    color: '#0F172A',
    accentColor: '#3B82F6',
    details: {
      floors: 1,
      hours: '24 / 7',
      contact: 'security@universe.edu'
    }
  },
  {
    id: 'academic-block',
    name: 'Academic Block',
    shortName: 'Academic',
    category: 'Academic',
    description: 'Central hub housing humanities, mathematics, natural science lecture halls, and administrative offices.',
    facilities: ['Dean Office', 'Lecture Halls 101-112', 'Science Labs', 'Faculty Lounge'],
    coordinates: [-5.5, 1.4, 3],
    size: [3.8, 2.8, 3.2],
    color: '#334155',
    accentColor: '#6366F1',
    details: {
      floors: 4,
      hours: '08:00 AM - 08:00 PM',
      contact: 'academic@universe.edu'
    }
  },
  {
    id: 'cse-block',
    name: 'CSE Block',
    shortName: 'CSE',
    category: 'Engineering',
    description: 'State-of-the-art Computer Science & Engineering department with AI labs, robotics suite, and coding hubs.',
    facilities: ['AI & Supercomputing Lab', 'Cybersecurity Suite', 'Classrooms 201-208', 'Software Dev Cell'],
    coordinates: [5.5, 1.6, 3],
    size: [3.6, 3.2, 3.4],
    color: '#1E293B',
    accentColor: '#2563EB',
    details: {
      floors: 5,
      hours: '07:30 AM - 10:00 PM',
      contact: 'cse@universe.edu'
    }
  },
  {
    id: 'library',
    name: 'Central Library',
    shortName: 'Library',
    category: 'Library',
    description: 'Quiet study sanctuaries, digital research archives, group study pods, and 50,000+ print volumes.',
    facilities: ['Silent Reading Zones', 'Digital Archive Kiosks', 'Group Study Pods', 'Cafe & Printing Hub'],
    coordinates: [-5, 1.5, -4.5],
    size: [3.4, 3.0, 3.0],
    color: '#475569',
    accentColor: '#0EA5E9',
    details: {
      floors: 3,
      hours: '08:00 AM - 11:00 PM',
      contact: 'library@universe.edu'
    }
  },
  {
    id: 'auditorium',
    name: 'Grand Auditorium',
    shortName: 'Auditorium',
    category: 'Events',
    description: '1,200-seat multi-purpose hall for campus summits, cultural galas, hackathons, and guest keynote lectures.',
    facilities: ['Main Stage & Projection', 'Acoustic Sound Suite', 'VIP Green Rooms', 'Exhibition Foyer'],
    coordinates: [5, 1.2, -4.5],
    size: [4.2, 2.4, 3.6],
    color: '#0F172A',
    accentColor: '#8B5CF6',
    details: {
      floors: 2,
      hours: 'Events Dependent',
      contact: 'events@universe.edu'
    }
  },
  {
    id: 'student-center',
    name: 'Student Center',
    shortName: 'Student Hub',
    category: 'Student Life',
    description: 'Vibrant student activity center featuring food courts, indoor lounge, club headquarters, and wellness clinic.',
    facilities: ['Food Court & Coffee Bar', 'Student Clubs Office', 'Indoor Gaming Lounge', 'Wellness & First Aid'],
    coordinates: [0, 1.1, -5.5],
    size: [3.8, 2.2, 2.8],
    color: '#1E293B',
    accentColor: '#10B981',
    details: {
      floors: 2,
      hours: '08:00 AM - 10:00 PM',
      contact: 'studentlife@universe.edu'
    }
  }
];

export const EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'TECH FEST 2026',
    date: '28 SEP',
    time: '10:00 AM',
    locationId: 'auditorium',
    locationName: 'Grand Auditorium',
    description: 'Annual flagship technology exposition showcasing student AI prototypes, robotics displays, and guest keynotes.',
    category: 'Flagship Event',
    badge: 'Tech',
    speaker: 'Dr. Sarah Lin (AI Director)'
  },
  {
    id: 'evt-2',
    title: 'AI WORKSHOP',
    date: '30 SEP',
    time: '02:00 PM',
    locationId: 'cse-block',
    locationName: 'CSE Block (Lab 3)',
    description: 'Hands-on practical session building Neural Networks and LLM agents using PyTorch and modern web stacks.',
    category: 'Workshop',
    badge: 'Coding',
    speaker: 'Prof. Alex Rivera'
  },
  {
    id: 'evt-3',
    title: 'CODE OLYMPICS',
    date: '02 OCT',
    time: '11:00 AM',
    locationId: 'cse-block',
    locationName: 'CSE Block (Main Hall)',
    description: 'Competitive algorithmic speed-coding tournament. Open to all students with live leaderboard rankings.',
    category: 'Competition',
    badge: 'Hackathon',
    speaker: 'UniVerse Code Club'
  },
  {
    id: 'evt-4',
    title: 'CAMPUS INNOVATION HACK',
    date: '05 OCT',
    time: '09:00 AM',
    locationId: 'student-center',
    locationName: 'Student Center Foyer',
    description: '24-hour hackathon building sustainable solutions for campus operations and student tech.',
    category: 'Hackathon',
    badge: 'Innovation',
    speaker: 'Entrepreneurship Cell'
  }
];

export const ASSISTANT_KNOWLEDGE_BASE = [
  {
    keywords: ['cse', 'computer science', 'coding', 'ai lab', 'programming', 'software'],
    response: 'The CSE Block is located on the right side of the campus, next to the Auditorium. It features state-of-the-art AI labs and software suites.',
    targetLocationId: 'cse-block'
  },
  {
    keywords: ['library', 'books', 'quiet', 'study', 'read', 'borrow'],
    response: 'The Central Library is situated on the back left area of the campus, behind the Academic Block. It offers silent reading zones and digital archives.',
    targetLocationId: 'library'
  },
  {
    keywords: ['auditorium', 'event', 'tech fest', 'hall', 'stage', 'keynote'],
    response: 'The Grand Auditorium is located on the back right corner of the campus. It hosts major summits, Tech Fest 2026, and cultural events.',
    targetLocationId: 'auditorium'
  },
  {
    keywords: ['academic', 'class', 'lecture', 'dean', 'math', 'science'],
    response: 'The Academic Block is located on the left side of the main avenue, right past the Main Gate. It contains lecture halls and departmental offices.',
    targetLocationId: 'academic-block'
  },
  {
    keywords: ['student center', 'food', 'cafeteria', 'canteen', 'eat', 'lounge', 'club'],
    response: 'The Student Center is at the north end of the central plaza. It features food courts, gaming lounges, and student club rooms.',
    targetLocationId: 'student-center'
  },
  {
    keywords: ['gate', 'entrance', 'security', 'enter', 'shuttle', 'pass'],
    response: 'The Main Gate is at the front south edge of the campus, serving as the main entry point with security and visitor passes.',
    targetLocationId: 'main-gate'
  },
  {
    keywords: ['happening', 'upcoming', 'schedule', 'this week', 'events', 'activities'],
    response: 'We have 4 major upcoming events: Tech Fest (28 Sep at Auditorium), AI Workshop (30 Sep at CSE Block), Code Olympics (02 Oct at CSE Block), and Innovation Hack (05 Oct at Student Center).',
    targetLocationId: 'auditorium'
  }
];
