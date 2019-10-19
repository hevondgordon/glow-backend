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
const TABLE_NAME = 'Glow';
function getPostsByCategoryHandler(params) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('limit is ok');
        console.log(params.limit);
        const queryWithFilterParams = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'partitionKey = :post',
            ExpressionAttributeValues: {
                ':post': 'post',
                ':category': params.category,
            },
            FilterExpression: 'category = :category',
            Limit: params.limit,
        };
        const posts = yield utils_1.queryWithFilter(queryWithFilterParams);
        console.log('these are the posts');
        console.log(posts);
        return posts;
    });
}
exports.getPostsByCategoryHandler = getPostsByCategoryHandler;
//# sourceMappingURL=postRepository.js.map