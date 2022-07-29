import React, {FunctionComponent, useEffect, useState} from 'react';
import {Temporal} from "@js-temporal/polyfill";
import {Duration} from "lib/Duration";
import {useAuth} from "react-oidc-context";

export const Settings: FunctionComponent = () => {
    const auth = useAuth()
    const token = auth.user?.access_token;
    const [services, setServices] = useState<any[]>()
    const [service, setService] = useState("")
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
    }, [auth, refetch])
    const deleteService = async (id: number)=>{
        //@ts-ignore
        const res = await fetch(`${window._env_.API}/users/me/services/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        setRefetch(new Date())
    }

    const addService = async ()=>{
        // @ts-ignore
        const res = await fetch(`${window._env_.API}/users/me/services`, {
            method: 'POST',
            body: service,
            headers: {
                "content-type":"application/json",
                authorization: `Bearer ${token}`,
            }
        })
        setRefetch(new Date())
    }
    return <>
        <h2>Services</h2>
        <ul>
            {services?.map(service=><li key={service.id}>{JSON.stringify(service)} - <button onClick={()=>deleteService(service.id)}>Löschen</button></li>)}
        </ul>
        <textarea onChange={(e: any)=>setService(e.target.value)} cols={50} rows={10}></textarea><br/>
        <button onClick={()=>addService()}>Add service</button>
    </>
}
