/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as controllers_commentController from "../controllers/commentController.js";
import type * as controllers_likeController from "../controllers/likeController.js";
import type * as controllers_postController from "../controllers/postController.js";
import type * as controllers_userController from "../controllers/userController.js";
import type * as http from "../http.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "controllers/commentController": typeof controllers_commentController;
  "controllers/likeController": typeof controllers_likeController;
  "controllers/postController": typeof controllers_postController;
  "controllers/userController": typeof controllers_userController;
  http: typeof http;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
