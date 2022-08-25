import React, {FunctionComponent, useEffect, useState} from 'react';
import {useAuth} from "react-oidc-context";

export const Settings: FunctionComponent = () => {
    const auth = useAuth()
    const token = auth.user?.access_token;
    const [services, setServices] = useState<any[]>()
    const [service, setService] = useState<any>()
    const [refetch, setRefetch] = useState(new Date())
    useEffect(() => {
        const fetchData = async () => {
            //@ts-ignore
            const res = await fetch(`${window._env_.API}/users/me/services`, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            const services = await res.json()
            setServices(services)
        }
        fetchData()
    }, [auth, refetch, token])
    const deleteService = async (id: number)=>{
        //@ts-ignore
        await fetch(`${window._env_.API}/users/me/services/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        setRefetch(new Date())
    }

    const addService = async ()=>{
        // @ts-ignore
        await fetch(`${window._env_.API}/users/me/services`, {
            method: 'POST',
            body: JSON.stringify(service),
            headers: {
                "content-type":"application/json",
                authorization: `Bearer ${token}`,
            }
        })
        setRefetch(new Date())
    }
    return <>
        <ul>
            {services?.map(service=> <li key={service.id}>
                <ServiceType type={service.type} />
                <button className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={()=>deleteService(service.id)}>Löschen</button>
                </li>)}
        </ul>
        <hr/>
        <label>
        Type: <input onChange={(e)=>setService((service: any)=>({...service, type: e.target.value}))}/><br/>
        </label>
        <label>
            Config: <input onChange={(e)=>setService((service: any)=>({...service, config: JSON.parse(e.target.value)}))}/><br/>
        </label>

        {/*<textarea onChange={(e: any)=>setService(e.target.value)} cols={50} rows={10}></textarea><br/>*/}
        <button
            onClick={()=>addService()}
            type="button"
            className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        >
            Add Service
        </button>
        {JSON.stringify(service)}
    </>
}

const ServiceType= ({type}: {type: any})=>{
    switch (type){
        case 'CLOCKIFY_SERVICE': return <>Clockify</>
        default: return <>asd</>
    }
}
