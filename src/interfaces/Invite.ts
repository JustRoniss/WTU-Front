import moment from 'moment';

export interface Invite {
    eventId: number;
    title: string;
    description: string;
    iframe: string;
    startDate: moment.Moment;
    endDate: moment.Moment;
}