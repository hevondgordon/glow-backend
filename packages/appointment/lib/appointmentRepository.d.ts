import { GetAppointmentsInput, CreateAppointmentInput, GetAppointmentsByClientInput, GetAppointmentsByServiceProviderInput, DeleteAppointmentInput, UpdateAppointmentInput } from './types';
export declare function updateAppointmentsHandler(params: UpdateAppointmentInput): Promise<void>;
export declare function deleteAppointmentsHandler(params: DeleteAppointmentInput): Promise<void>;
export declare function getAppointmentsByServiceProviderHandler(params: GetAppointmentsByServiceProviderInput): Promise<any[]>;
export declare function getAppointmentsByClientHandler(params: GetAppointmentsByClientInput): Promise<any[]>;
export declare function getAppointmentsHandler(params: GetAppointmentsInput): Promise<any[]>;
export declare function createAppointmentHandler(params: CreateAppointmentInput): Promise<void>;
