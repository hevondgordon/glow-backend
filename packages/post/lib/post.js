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
const postRepository_1 = require("./postRepository");
function getPostsByCategory(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const getPostsByCategoryInput = {
            category: event.category,
            limit: parseInt(event.limit),
            nextToken: null,
        };
        const posts = yield postRepository_1.getPostsByCategoryHandler(getPostsByCategoryInput);
        return posts;
    });
}
exports.getPostsByCategory = getPostsByCategory;
;
function createPost(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const createPostInput = {
            caption: event.body.caption,
            category: event.body.category,
            created: new Date().getTime(),
            createdBy: event.body.createdBy,
            imageURL: event.body.imageURL,
            isLiked: event.body.isLiked,
            likeCount: 0,
            usernameFilter: event.body.usernameFilter
        };
        yield postRepository_1.createPostHandler(createPostInput);
        callback(null, 200);
    });
}
exports.createPost = createPost;
;
//# sourceMappingURL=post.js.map