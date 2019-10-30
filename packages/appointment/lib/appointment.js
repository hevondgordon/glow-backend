"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentRepository_1 = require("./appointmentRepository");
function getAppointmentsByClient(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAppointmentsByClientInput = {
            client: event.client,
            limit: parseInt(event.limit),
            nextToken: null
        };
        const clientFilterAppointments = yield appointmentRepository_1.getAppointmentsByClientHandler(getAppointmentsByClientInput);
        return clientFilterAppointments;
    });
}
exports.getAppointmentsByClient = getAppointmentsByClient;
function getAppointmentsByServiceProvider(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAppointmentsByServiceProviderInput = {
            serviceProvider: event.serviceProvider,
            limit: parseInt(event.limit),
            nextToken: null
        };
        const serviceProviderFilterAppointments = yield appointmentRepository_1.getAppointmentsByServiceProviderHandler(getAppointmentsByServiceProviderInput);
        return serviceProviderFilterAppointments;
    });
}
exports.getAppointmentsByServiceProvider = getAppointmentsByServiceProvider;
function getAppointments(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAppointmentsInput = {
            email: event.email,
        };
        const appointments = yield appointmentRepository_1.getAppointmentsHandler(getAppointmentsInput);
        return appointments;
    });
}
exports.getAppointments = getAppointments;
function createAppointment(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const createAppointmentInput = {
            client: event.body.client,
            serviceProvider: event.body.serviceProvider,
            time: new Date().getTime(),
            date: new Date(),
            comment: event.body.comment
        };
        yield appointmentRepository_1.createAppointmentHandler(createAppointmentInput);
        callback(null, 200);
    });
}
exports.createAppointment = createAppointment;
//# sourceMappingURL=appointment.js.map