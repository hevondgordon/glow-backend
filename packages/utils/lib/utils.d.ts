import { QueryWithFilterParams, CreateItemParams, GetItemParams } from './types';
export declare function getItem(query: GetItemParams): Promise<any[]>;
export declare function queryWithFilter(query: QueryWithFilterParams): Promise<any[]>;
export declare function createItem(query: CreateItemParams): Promise<unknown>;
