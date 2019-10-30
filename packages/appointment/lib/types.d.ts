import { User } from 'user';
export interface CreateAppointmentInput {
    client: User;
    serviceProvider: User;
    time: number;
    date: Date;
    comment: string;
}
export interface GetAppointmentsInput {
    email: string;
}
