import {BaseQueryFn, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {getToken} from "lib/AuthWrapper";
import {getConfigValue} from "../lib/config";
import {Temporal} from "@js-temporal/polyfill";

export type Service = {
    id: number,
    type: ServiceType,
    config?: {[key in string]: key}
    enabled: boolean
    description: string
}

export type Summary = {
    begin: Temporal.ZonedDateTime,
    end: Temporal.ZonedDateTime,
    duration: Temporal.Duration,
    percentage: number,
    remaining: Temporal.Duration,
    remainingWithOvertime: Temporal.Duration,
    overtime: Temporal.Duration,
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
    tagTypes: ['service', 'summary', 'user'],
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        getServices: builder.query<Service[], void>({
            providesTags: ['service'],
            query: () => `users/me/services`,
        }),
        getUser: builder.query<{dailyWorkingTime: Temporal.Duration}, void>({
            providesTags: ['user'],
            query: () => `users/me`,
            transformResponse: (user: {dailyWorkingTime: string})=>{
                return {
                    dailyWorkingTime: Temporal.Duration.from(user.dailyWorkingTime)
                }
            }
        }),
        updateUser: builder.mutation<void, {dailyWorkingTime: string}>({
            invalidatesTags: ['user'],
            query: (body) => ({
                url: `users/me`, method: 'PUT', body
            })
        }),
        addService: builder.mutation<void, Omit<Service,'id'>>({
            invalidatesTags: ['service', 'summary'],
            query: (body) => ({
                url: `users/me/services`, method: 'POST', body
            })
        }),
        deleteService: builder.mutation<void, number>({
            invalidatesTags: ['service', 'summary'],
            query: (id) => ({url: `users/me/services/${id}`, method: 'DELETE'})
        }),
        getSummary: builder.query<any, void>({
            providesTags: ['summary'],
            query: ()=>`users/me/summary`,
            transformResponse: (summary: {saldo: string,begin: string, end: string, overtime: string, duration: string, percentage: number, remaining: string, remainingWithOvertime: string})=>{
                return {
                    // begin: summary.begin ? Temporal.PlainDateTime.from(summary.begin): undefined,
                    // end: summary.end ? Temporal.PlainDateTime.from(summary.end) : undefined,
                    // overtime:Temporal.Duration.from(summary.overtime),
                    saldo: Temporal.Duration.from(summary.saldo)
                    // duration: summary.duration ? Temporal.Duration.from(summary.duration) : undefined,
                    // percentage: summary.percentage,
                    // remaining: summary.remaining ? Temporal.Duration.from(summary.remaining) : undefined,
                    // remainingWithOvertime: summary.remainingWithOvertime ? Temporal.Duration.from(summary.remainingWithOvertime) : undefined,
                }
            }
        })
    }),
})
export const {
    useGetServicesQuery,
    useGetSummaryQuery,
    useAddServiceMutation,
    useDeleteServiceMutation,
    useGetUserQuery,
    useUpdateUserMutation,
} = backend
