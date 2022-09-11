import React, {FunctionComponent, useEffect, useState} from 'react';
import {Temporal} from "@js-temporal/polyfill";
import {Duration} from "lib/Duration";
import {useAuth} from "react-oidc-context";
import {getConfigValue} from "../lib/config";

export const Overview: FunctionComponent = () => {
    const auth = useAuth()
    const [daysWorked, setDaysWorked] = useState<Temporal.Duration>()
    const [should, setShould] = useState<Temporal.Duration>()
    const [actual, setActual] = useState<Temporal.Duration>()
    const [saldo, setSaldo] = useState<Temporal.Duration>()
    useEffect(() => {
        const fetchData = async () => {
            const token = auth.user?.access_token;
            const res = await fetch(`${getConfigValue("API")}/time/summary`, {
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
    const durationOptions={
        displayEmpty: true,
        withoutPadding: true
    }
    return <div className="p-10">
        <p><Duration withColor {...durationOptions} duration={saldo}/> Überstunden</p>
        <p><Duration withoutPrefix {...durationOptions} duration={actual}/> Stunden gearbeitet</p>
        <p>von <Duration withoutPrefix {...durationOptions} duration={should}/></p>
        <p><Duration onlyDays withoutPrefix {...durationOptions} duration={daysWorked}/> Tage gearbeitet</p>
    </div>
}
