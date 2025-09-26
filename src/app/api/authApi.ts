import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACK_URI, COMMAND_ID } from '../config'
import type { AuthSuccess, AuthData, Profile } from '../../entities'
import { type RtkState } from '../store'


export const AuthApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: BACK_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RtkState).token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
        mode: 'cors'
    }),
    endpoints: (builder) => ({
        rtkGetProfile: builder.mutation<Profile, void>({
            query: () => '/profile',
        }),
        rtkSetProfile: builder.mutation<Profile, Profile>({
            query: (profile: Profile) => ({
                url: '/profile',
                method: 'POST',
                body: { name: profile.name }
            })
        }),
        rtkSignIn: builder.mutation<AuthSuccess, AuthData>({
            query: (auth: AuthData) => ({
                url: '/signin',
                method: 'POST',
                body: auth
            }),
        }),
        rtkSignUp: builder.mutation({
            query: (auth: AuthData) => ({
                url: '/signup',
                method: 'POST',
                body: {
                    email: auth.email,
                    password: auth.password,
                    commandId: COMMAND_ID
                }
            }),
        }),
    }),
 })

 export const { useRtkGetProfileMutation, useRtkSetProfileMutation, useRtkSignInMutation, useRtkSignUpMutation  } = AuthApi;

