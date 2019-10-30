import { GetAppointmentsInput, CreateAppointmentInput, GetAppointmentsByClientInput, GetAppointmentsByServiceProviderInput } from './types';
export declare function getAppointmentsByServiceProviderHandler(params: GetAppointmentsByServiceProviderInput): Promise<any[]>;
export declare function getAppointmentsByClientHandler(params: GetAppointmentsByClientInput): Promise<any[]>;
export declare function getAppointmentsHandler(params: GetAppointmentsInput): Promise<any[]>;
export declare function createAppointmentHandler(params: CreateAppointmentInput): Promise<void>;
