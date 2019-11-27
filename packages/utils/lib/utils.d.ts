import { QueryWithFilterParams, CreateItemParams, GetItemParams, DeleteItemParams } from './types';
export declare function deleteItem(query: DeleteItemParams): Promise<any[]>;
export declare function getItem(query: GetItemParams): Promise<any[]>;
export declare function queryWithFilter(query: QueryWithFilterParams): Promise<any[]>;
export declare function createItem(query: CreateItemParams): Promise<unknown>;
