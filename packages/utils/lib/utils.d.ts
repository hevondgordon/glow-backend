import { QueryWithFilterParams, CreateItemParams, GetItemParams, UpdateItemParams } from './types';
export declare function getItem(query: GetItemParams): Promise<any[]>;
export declare function queryWithFilter(query: QueryWithFilterParams): Promise<any[]>;
export declare function createItem(query: CreateItemParams): Promise<unknown>;
export declare function updateItem(query: UpdateItemParams): Promise<unknown>;
export declare function getFormattedDate(): string;
