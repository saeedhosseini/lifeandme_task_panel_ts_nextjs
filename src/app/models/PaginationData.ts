import {PaginationMeta} from "@/app/models/PaginationMeta";

export declare type PaginationData<T> = {
    data: Array<T>,
    meta: PaginationMeta,
}