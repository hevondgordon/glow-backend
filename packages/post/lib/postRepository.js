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
function getPostsByCategoryHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryWithFilterParams = {
            TableName: utils_1.TABLE_NAME,
            KeyConditionExpression: 'partitionKey = :post',
            ExpressionAttributeValues: {
                ':post': 'post',
                ':category': params.category,
            },
            FilterExpression: 'category = :category',
            Limit: params.limit,
        };
        const posts = yield utils_1.queryWithFilter(queryWithFilterParams);
        return posts;
    });
}
exports.getPostsByCategoryHandler = getPostsByCategoryHandler;
function createPostHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const createItemParams = {
            TableName: utils_1.TABLE_NAME,
            Item: {
                caption: params.caption,
                category: params.category,
                created: params.created,
                createdBy: params.createdBy,
                imageURL: params.imageURL,
                isLiked: params.isLiked,
                likeCount: params.likeCount,
                usernameFilter: params.usernameFilter,
                partitionKey: 'post',
                sortKey: uuidv4(),
            },
        };
        yield utils_1.createItem(createItemParams);
    });
}
exports.createPostHandler = createPostHandler;
//# sourceMappingURL=postRepository.js.map