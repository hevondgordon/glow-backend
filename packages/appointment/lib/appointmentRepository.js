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
const utils_1 = require("utils");
const uuidv4 = require("uuid/v4");
function getAppointmentsHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAppointmentParams = {
            TableName: utils_1.TABLE_NAME,
            KeyConditionExpression: 'partitionKey = :appointment and sortKey = :email',
            ExpressionAttributeValues: {
                ':appointment': 'appointment',
                ':email': params.email
            }
        };
        const appointments = yield utils_1.getItem(getAppointmentParams);
        return appointments;
    });
}
exports.getAppointmentsHandler = getAppointmentsHandler;
function createAppointmentHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const createAppointmentParams = {
            TableName: utils_1.TABLE_NAME,
            Item: {
                client: params.client,
                serviceProvider: params.serviceProvider,
                time: params.time,
                date: params.date,
                comment: params.comment,
                partitionKey: 'post-appointment',
                sortKey: uuidv4()
            }
        };
        yield utils_1.createItem(createAppointmentParams);
    });
}
exports.createAppointmentHandler = createAppointmentHandler;
//# sourceMappingURL=appointmentRepository.js.map