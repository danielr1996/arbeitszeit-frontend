import React, {FunctionComponent, useEffect, useState} from 'react';
import {Temporal} from "@js-temporal/polyfill";
import {Duration} from "lib/Duration";
import {useAuth} from "react-oidc-context";

export const Overview: FunctionComponent = () => {
    const auth = useAuth()
    const [daysWorked, setDaysWorked] = useState<Temporal.Duration>()
    const [should, setShould] = useState<Temporal.Duration>()
    const [actual, setActual] = useState<Temporal.Duration>()
    const [saldo, setSaldo] = useState<Temporal.Duration>()
    useEffect(() => {
        const fetchData = async () => {
            const token = auth.user?.access_token;
            //@ts-ignore
            const res = await fetch(`${window._env_.API}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            const {daysWorked, shouldHaveWorked, actuallyWorked, saldo} = await res.json()
            setDaysWorked(Temporal.Duration.from(daysWorked))
            setShould(Temporal.Duration.from(shouldHaveWorked))
            setActual(Temporal.Duration.from(actuallyWorked))
            setSaldo(Temporal.Duration.from(saldo))
        }
        fetchData()
    }, [auth])
    return <>
        <h1>Arbeitszeit</h1>
        <p><Duration duration={saldo}/> Überstunden</p>
        <p><Duration duration={actual}/> Stunden gearbeitet</p>
        <p>von <Duration duration={should}/></p>
        <p><Duration duration={daysWorked}/> Tage gearbeitet</p>
    </>
}