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
function getUserDetailsHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const getItemParams = {
            TableName: utils_1.TABLE_NAME,
            KeyConditionExpression: 'partitionKey = :partitionKey and sortKey = :email',
            ExpressionAttributeValues: {
                ':partitionKey': 'profile',
                ':email': params.email,
            },
        };
        const details = yield utils_1.getItem(getItemParams);
        return details;
    });
}
exports.getUserDetailsHandler = getUserDetailsHandler;
function updateProfileDetailsHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemKeys = {
            partitionKey: 'profile',
            sortKey: params.personalEmailAddress,
        };
        const itemDetails = createItemBasedOnAccountType(params.accountType, params);
        const item = Object.assign(Object.assign({}, itemKeys), itemDetails);
        const createItemParams = {
            TableName: utils_1.TABLE_NAME,
            Item: item,
        };
        yield utils_1.createItem(createItemParams);
    });
}
exports.updateProfileDetailsHandler = updateProfileDetailsHandler;
function createItemBasedOnAccountType(accountType, params) {
    const item = {};
    if (accountType === utils_1.ACCOUNT_TYPE_PERSONAL) {
        item['firstName'] = params.firstName;
        item['lastName'] = params.lastName;
        item['accountType'] = params.accountType;
        item['gender'] = params.gender;
        item['personalPhoneNumber'] = params.personalPhoneNumber;
        if (params.profileImage !== undefined) {
            item['profileImage'] = params.profileImage;
        }
    }
    else if (accountType === utils_1.ACCOUNT_TYPE_BUSINESS) {
        item['firstName'] = params.firstName;
        item['lastName'] = params.lastName;
        item['accountType'] = params.accountType;
        item['gender'] = params.gender;
        item['businessName'] = params.businessName;
        item['businessPhone'] = params.businessPhone;
        item['businessAddress'] = params.businessAddress;
        item['businessDescription'] = params.businessDescription;
        if (params.profileImage !== undefined) {
            item['profileImage'] = params.profileImage;
        }
    }
    console.log('createItemBasedOnAccountType');
    console.log(JSON.stringify(item));
    return item;
}
//# sourceMappingURL=userRepository.js.map