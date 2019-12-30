export interface User {
    address?: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    profileImage?: string
}

export interface OpeningHoursInput {
    openFromHours: number
    openFromMins: number
    openToHours: number
    openToMins: number
    email: string
}

export interface UpdateProfileDetailsInput {
    profileImage?: string
    businessName?: string
    businessPhone?: string
    businessAddress?: string
    businessDescription?: string
    personalPhoneNumber: string
    firstName: string
    lastName: string
    personalEmailAddress: string
    gender: string
    accountType: string
    selectedServices?: any[]
}

export interface GetUserDetailsInput {
    email: string
}
