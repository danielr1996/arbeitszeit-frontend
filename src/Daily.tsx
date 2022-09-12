import {FunctionComponent} from "react"
import {Gauge} from "lib/Gauge"
import {Time} from "lib/Time"
import {Duration} from "lib/Duration"
import {useGetSummaryQuery} from "./redux/api";

export const Daily: FunctionComponent = () => {
    const summary = useGetSummaryQuery().data
    const begin = summary?.begin
    const end = summary?.end
    const percentage = summary?.percentage
    const duration = summary?.duration
    const overtime = summary?.overtime
    const remainingWithOvertime = summary?.remainingWithOvertime
    const remaining = summary?.remaining
    return <>
        <div className="m-5 inline-block">
            <Gauge
                percentage={percentage}
                startText={<span className="text-3xl"><Time displayEmpty time={begin}/> </span>}
                endText={<span className="text-3xl"><Time displayEmpty time={end}/> </span>}
                centerText={<div className="text-center">
    <span className="text-4xl">
        <Duration withColor withoutMono displayEmpty withSeconds duration={duration}/>
    </span><br/>
                    <span className="text-xl">
        <Duration withColor withoutMono displayEmpty withSeconds duration={remaining}/><br/>
    {/*(<Duration withColor withoutMono displayEmpty withSeconds*/}
    {/*           duration={remainingWithOvertime}/>)*/}
    </span>
                </div>}
            />
            <span className="text-5xl text-center block"><Duration displayEmpty withColor withSeconds
                                                                   duration={overtime}/></span>
        </div>
    </>
}
