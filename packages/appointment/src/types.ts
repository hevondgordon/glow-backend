import {User} from 'user';

export interface UpdateAppointmentAvailability {
    day: string
    month: string
    year: string
    available: boolean
    openFromHours?:number
    openFromMins?: number
    openToHours?: number
    openToMins?: number
}
export interface UpdateAppointmentAvailabilityInput {
     items: any[]
 }
export interface CreateAppointmentInput {
    client: User
    serviceProvider: User
    serviceType: string
    time: number
    date: Date
    comment?: string
    appointmentTimestamp: number
}

export interface GetAppointmentsInput{
    email: string
}

export interface MakeDateAvailable {
    email:string
    id: number
}

export interface DeleteAppointmentInput{
    email: string
    appointmentId: string
}

export interface UpdateAppointmentInput {
    date?: string
    time?: string
    serviceType?: string
    comment?: string
    email: string
    appointmentId: string
}
