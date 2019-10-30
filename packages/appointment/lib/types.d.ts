import { User } from 'user';
export interface GetAppointmentsByServiceProviderInput {
    serviceProvider: User;
    limit: number;
    nextToken: string;
}
export interface GetAppointmentsByClientInput {
    client: User;
    limit: number;
    nextToken: string;
}
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
