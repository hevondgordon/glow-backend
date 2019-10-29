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
const userRepository_1 = require("./userRepository");
function updateUserDetails(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(JSON.stringify(event));
        const profileDetails = {
            profileImage: event.body.profileImage,
            businessName: event.body.businessName,
            businessPhone: event.body.businessPhone,
            businessAddress: event.body.businessAddress,
            businessDescription: event.body.businessDescription,
            gender: event.body.gender,
            accountType: event.body.accountType,
            personalPhoneNumber: event.body.personalPhoneNumber,
            personalEmailAddress: event.body.personalEmailAddress,
            firstName: event.body.firstName,
            lastName: event.body.lastName,
        };
        yield userRepository_1.updateProfileDetailsHandler(profileDetails);
        callback(null, { 'status': 200 });
    });
}
exports.updateUserDetails = updateUserDetails;
function getUserDetails(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const getUserDetailsInput = {
            email: event.email,
        };
        const details = yield userRepository_1.getUserDetailsHandler(getUserDetailsInput);
        let userDetails;
        details.length > 0 ? userDetails = details[0] : [];
        callback(null, userDetails);
    });
}
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=user.js.map