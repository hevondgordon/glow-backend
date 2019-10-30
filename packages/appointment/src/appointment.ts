import {getAppointmentsHandler, createAppointmentHandler} from './appointmentRepository';
import {GetAppointmentsInput, CreateAppointmentInput} from './types';

export async function getAppointments(event,context,callback){
    const getAppointmentsInput: GetAppointmentsInput = {
        email: event.email,
    };
    const appointments = await getAppointmentsHandler(getAppointmentsInput);
    return appointments;
}

export async function createAppointment(event,context,callback){
    const createAppointmentInput: CreateAppointmentInput = {
        client: event.body.client,
        serviceProvider: event.body.serviceProvider,
        time: new Date().getTime(),
        date: new Date(),
        comment: event.body.comment
    }
    await createAppointmentHandler(createAppointmentInput);
    callback(null, 200);
}