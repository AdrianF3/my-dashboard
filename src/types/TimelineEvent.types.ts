import { Timestamp } from "firebase/firestore";

export interface TimelineEvent {
    address?: string;
    beginDate: Timestamp;
    category: 'personal' | 'relationship' | 'home' | 'education' | 'pet' | 'hobbies' | 'travel' | 'social' | 'health' | 'work';
    description: string;
    endDate: Timestamp;
    id: string;
    title: string;
    links?: string[]; // URLs to related resources
    notes?: string; // Additional notes
    status: 'current' | 'completed' | 'hidden';
    tags?: string[]; // Tags for easier categorization
    visibility?: boolean;
}

export const placeholderEvents: TimelineEvent[] = [
    {
        id: '1',
        beginDate: Timestamp.fromDate(new Date('2004-06-01')),
        endDate: Timestamp.fromDate(new Date('2004-06-01')),
        category: 'personal',
        title: 'Started High School',
        description: 'First day of high school at ABC High School.',
        status: 'completed',
        visibility: true
    },
    {
        id: '2',
        beginDate: Timestamp.fromDate(new Date('2008-05-15')),
        endDate: Timestamp.fromDate(new Date('2008-05-15')),
        category: 'education',
        title: 'High School Graduation',
        description: 'Graduated from ABC High School with honors.',
        status: 'completed',
        visibility: true
    },
    {
        id: '3',
        beginDate: Timestamp.fromDate(new Date('2008-09-01')),
        endDate: Timestamp.fromDate(new Date('2012-05-01')),
        category: 'education',
        title: 'Started College',
        description: 'Started college at XYZ University.',
        status: 'completed',
        visibility: true
    },
    {
        id: '4',
        beginDate: Timestamp.fromDate(new Date('2010-07-01')),
        endDate: Timestamp.fromDate(new Date('2010-07-10')),
        category: 'travel',
        title: 'Trip to Europe',
        description: 'Vacationed in France and Italy.',
        status: 'completed',
        visibility: true
    },
    {
        id: '5',
        beginDate: Timestamp.fromDate(new Date('2012-06-01')),
        endDate: Timestamp.fromDate(new Date('2012-06-01')),
        category: 'education',
        title: 'College Graduation',
        description: 'Graduated from XYZ University with a degree in Computer Science.',
        status: 'completed',
        visibility: true
    },
    {
        id: '6',
        beginDate: Timestamp.fromDate(new Date('2013-04-20')),
        endDate: Timestamp.fromDate(new Date('2013-04-20')),
        category: 'relationship',
        title: 'Met Future Spouse',
        description: 'Met my future spouse at a mutual friend’s party.',
        status: 'completed',
        visibility: true
    },
    {
        id: '7',
        beginDate: Timestamp.fromDate(new Date('2014-06-15')),
        endDate: Timestamp.fromDate(new Date('2014-06-15')),
        category: 'work',
        title: 'Started First Job',
        description: 'Started my first job at ABC Corp as a Software Engineer.',
        status: 'completed',
        visibility: true
    },
    {
        id: '8',
        beginDate: Timestamp.fromDate(new Date('2016-08-01')),
        endDate: Timestamp.fromDate(new Date('2016-08-01')),
        category: 'home',
        title: 'Bought First House',
        description: 'Bought my first house in XYZ City.',
        status: 'completed',
        visibility: true
    },
    {
        id: '9',
        beginDate: Timestamp.fromDate(new Date('2017-05-01')),
        endDate: Timestamp.fromDate(new Date('2017-05-01')),
        category: 'pet',
        title: 'Got a Puppy',
        description: 'Adopted a golden retriever puppy named Max.',
        status: 'completed',
        visibility: true
    },
    {
        id: '10',
        beginDate: Timestamp.fromDate(new Date('2018-09-15')),
        endDate: Timestamp.fromDate(new Date('2018-09-15')),
        category: 'relationship',
        title: 'Engagement',
        description: 'Got engaged to my future spouse.',
        status: 'completed',
        visibility: true
    },
    {
        id: '11',
        beginDate: Timestamp.fromDate(new Date('2019-06-01')),
        endDate: Timestamp.fromDate(new Date('2019-06-01')),
        category: 'relationship',
        title: 'Wedding Day',
        description: 'Married my spouse in a beautiful ceremony.',
        status: 'completed',
        visibility: true
    },
    {
        id: '12',
        beginDate: Timestamp.fromDate(new Date('2020-03-01')),
        endDate: Timestamp.fromDate(new Date('2020-03-01')),
        category: 'health',
        title: 'Health Checkup',
        description: 'Annual health checkup with Dr. Smith.',
        status: 'completed',
        visibility: true
    },
    {
        id: '13',
        beginDate: Timestamp.fromDate(new Date('2021-01-01')),
        endDate: Timestamp.fromDate(new Date('2021-01-01')),
        category: 'hobbies',
        title: 'Started Painting',
        description: 'Took up painting as a new hobby.',
        status: 'current',
        visibility: true
    },
    {
        id: '14',
        beginDate: Timestamp.fromDate(new Date('2022-07-01')),
        endDate: Timestamp.fromDate(new Date('2022-07-01')),
        category: 'travel',
        title: 'Trip to Japan',
        description: 'Traveled to Japan for a summer vacation.',
        status: 'completed',
        visibility: true
    },
    {
        id: '15',
        beginDate: Timestamp.fromDate(new Date('2023-11-01')),
        endDate: Timestamp.fromDate(new Date('2023-11-01')),
        category: 'work',
        title: 'Promotion',
        description: 'Promoted to Senior Software Engineer at ABC Corp.',
        status: 'completed',
        visibility: true
    },
    {
        id: '16',
        beginDate: Timestamp.fromDate(new Date('2024-03-15')),
        endDate: Timestamp.fromDate(new Date('2024-03-15')),
        category: 'social',
        title: 'Joined Book Club',
        description: 'Joined a local book club.',
        status: 'current',
        visibility: true
    }
];
