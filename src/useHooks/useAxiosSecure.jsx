import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_server_url
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { user, signOutUser } = useAuth()
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token') || user?.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config;
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            console.log(error);

            const statusCode = error?.response?.status;
            if ((statusCode === 401 || statusCode === 403) && user) {
                signOutUser()
                    .then(() => {
                        navigate('/auth/login')
                    })
            }
            return Promise.reject(error)

        })



        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }

    }, [user, navigate, signOutUser])

    return axiosSecure
};

export default useAxiosSecure;