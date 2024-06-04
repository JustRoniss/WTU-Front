import moment from 'moment';

export interface Event {
    id: number;
    title: string;
    description: string;
    startDate: moment.Moment;
    endDate: moment.Moment;
    units: { id: number, name: string }[];
    users: { email: string }[];
    iframe: string;
}