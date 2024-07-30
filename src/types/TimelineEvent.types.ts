import { Timestamp } from "firebase/firestore";

export interface TimelineEvent {
    address?: string;
    beginDate: Timestamp;
    category: 'personal' | 'relationship' | 'home' | 'education';
    description: string;
    endDate: Timestamp;
    id: string;
    title: string;
    links?: string[]; // URLs to related resources
    notes?: string; // Additional notes
    status: 'current' | 'completed' | 'hidden';
    tags?: string[]; // Tags for easier categorization
}

export const placeholderEvents: TimelineEvent[] = [
    {
        id: '1',
        title: 'Graduation Day',
        description: 'Graduation ceremony at the university.',
        beginDate: new Timestamp(1672502400, 0), // January 1, 2023
        endDate: new Timestamp(1672506000, 0),
        category: 'education',
        address: 'University Campus',
        links: ['https://university.edu/graduation-info'],
        notes: 'Remember to pick up the cap and gown.',
        status: 'completed',
        tags: ['milestone', 'ceremony']
    },
    {
        id: '2',
        title: 'First Date',
        description: 'Went to a lovely restaurant downtown.',
        beginDate: new Timestamp(1675180800, 0), // February 1, 2023
        endDate: new Timestamp(1675184400, 0),
        category: 'relationship',
        address: 'Downtown Restaurant',
        status: 'completed',
        tags: ['romantic', 'firsts']
    },
    {
        id: '3',
        title: 'Bought a New House',
        description: 'Moved into the new house in the suburbs.',
        beginDate: new Timestamp(1677769200, 0), // March 1, 2023
        endDate: new Timestamp(1677772800, 0),
        category: 'home',
        address: '123 Suburb St.',
        links: ['https://realtor.com/listing'],
        notes: 'Need to update address on all documents.',
        status: 'current',
        tags: ['real estate', 'move']
    },
    {
        id: '4',
        title: 'Birthday Celebration',
        description: 'Celebrated my 30th birthday with friends and family.',
        beginDate: new Timestamp(1680447600, 0), // April 1, 2023
        endDate: new Timestamp(1680451200, 0),
        category: 'personal',
        address: 'Party Hall',
        status: 'completed',
        tags: ['milestone', 'party']
    },
    {
        id: '5',
        title: 'Started New Job',
        description: 'First day at the new company.',
        beginDate: new Timestamp(1683039600, 0), // May 1, 2023
        endDate: new Timestamp(1683043200, 0),
        category: 'personal',
        address: 'New Company HQ',
        links: ['https://newcompany.com'],
        status: 'current',
        tags: ['career', 'milestone']
    },
    {
        id: '6',
        title: 'Completed Online Course',
        description: 'Finished a course on web development.',
        beginDate: new Timestamp(1685718000, 0), // June 1, 2023
        endDate: new Timestamp(1685721600, 0),
        category: 'education',
        links: ['https://onlinecourse.com'],
        notes: 'Remember to download the certificate.',
        status: 'completed',
        tags: ['learning', 'achievement']
    },
    {
        id: '7',
        title: 'Anniversary Dinner',
        description: 'Celebrated our anniversary with a special dinner.',
        beginDate: new Timestamp(1688300000, 0), // July 1, 2023
        endDate: new Timestamp(1688303600, 0),
        category: 'relationship',
        address: 'Favorite Restaurant',
        status: 'current',
        tags: ['anniversary', 'celebration']
    }
];
