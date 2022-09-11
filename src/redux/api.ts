import {BaseQueryFn, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getToken} from "lib/AuthWrapper";
import {getConfigValue} from "../lib/config";

export type Service = {
    id: number,
    type: ServiceType,
    config?: {[key in string]: key}
}
export type ServiceType = 'CLOCKIFY_SERVICE' | 'TESTDATA_SERVICE'

const dynamicBaseQuery: BaseQueryFn = async (args, WebApi, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: getConfigValue("API"),
        prepareHeaders: (headers) => {
            const token = getToken()
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    })
    return rawBaseQuery(args, WebApi, extraOptions)
}

export const backend = createApi({
    reducerPath: 'backend',
    tagTypes: ['service'],
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        getServices: builder.query<Service[], void>({
            providesTags: ['service'],
            query: () => `users/me/services`,
        }),
        addService: builder.mutation<void, Service>({
            invalidatesTags: ['service'],
            query: (body) => ({
                url: `users/me/services`, method: 'POST', body
            })
        }),
        deleteService: builder.mutation<void, number>({
            invalidatesTags: ['service'],
            query: (id) => ({url: `users/me/services/${id}`, method: 'DELETE'})
        }),
    }),
})

export const {
    useGetServicesQuery,
    useAddServiceMutation,
    useDeleteServiceMutation,
} = backend
