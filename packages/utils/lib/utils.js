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
const DynamoDB = require("aws-sdk/clients/dynamodb");
const DocumentClient = new DynamoDB.DocumentClient({
    region: process.env.REGION,
});
function getItem(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: query.TableName,
            KeyConditionExpression: query.KeyConditionExpression,
            ExpressionAttributeValues: query.ExpressionAttributeValues,
        };
        return new Promise((resolve, reject) => {
            DocumentClient.query(params, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data.Items);
            });
        });
    });
}
exports.getItem = getItem;
function queryWithFilter(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: query.TableName,
            KeyConditionExpression: query.KeyConditionExpression,
            FilterExpression: query.FilterExpression,
            ExpressionAttributeValues: query.ExpressionAttributeValues,
            ExpressionAttributeNames: query.ExpressionAttributeNames,
        };
        return new Promise((resolve, reject) => {
            DocumentClient.query(params, (err, data) => {
                err ? reject(err) : resolve(data.Items);
            });
        });
    });
}
exports.queryWithFilter = queryWithFilter;
;
function createItem(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: query.TableName,
            Item: query.Item,
        };
        return new Promise((resolve, reject) => {
            DocumentClient.put(params, (err, data) => {
                if (err)
                    console.log(err);
                err ? reject(err) : resolve(data);
            });
        });
    });
}
exports.createItem = createItem;
//# sourceMappingURL=utils.js.map