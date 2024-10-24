import { Moment } from 'moment';

export interface EventFormValues {
    title: string;
    description: string;
    startDate: Moment;
    startTime: Moment;
    endDate: Moment;
    endTime: Moment;
    unit: string[];
    usersEmail: string[];
    iframe: string;
    isPublic: boolean;
}