import classNames from "classnames"
import {match} from "lib/match"
import {Temporal} from "@js-temporal/polyfill"

type Props = {
    duration?: Temporal.Duration
    withoutPrefix?: boolean,
    withoutPadding?: boolean,
    withColor?: boolean,
    withoutMono?: boolean,
    withSeconds?: boolean,
    displayEmpty?: boolean,
    onlyDays?: boolean,
}
export const Duration = ({duration, withoutPadding, withoutPrefix, withColor, withoutMono, withSeconds, displayEmpty, onlyDays}: Props) => {

    const classes = classNames(
        {'whitespace-pre': true},
        {'font-mono': !withoutMono},
        {'text-green-500': withColor && duration?.sign === +1},
        {'text-red-500': withColor && duration?.sign === -1},
        {'text-blue-500': withColor && duration?.sign === 0}
    )
    if(onlyDays){
        let days = '';
        if(!duration){
            if(displayEmpty){
                days = '-'
            }
            days = ''
        }else{
            days = duration.days.toString()
        }
        return <span className={classes}>{days}</span>
    }
    const format = (duration?: Temporal.Duration): string => {
        if(!duration){
            if(displayEmpty){
                return '--:--'
            }
            return ''
        }
        duration = duration.round({largestUnit: 'hours'})
        const prefix = withoutPrefix ? '' : match([
            [duration.sign === 1, '+'],
            [duration.sign === 0, '±'],
            [duration.sign === -1, '-'],
        ])

        const hours = withoutPadding ? Math.abs(duration.hours).toString() : Math.abs(duration.hours).toString().padStart(2, ' ')
        const minutes = Math.abs(duration.minutes).toString().padStart(2, '0')
        const seconds = withSeconds ? ':' + Math.abs(duration.seconds).toString().padStart(2, '0') : ''
        return `${prefix}${hours}:${minutes}${seconds}`
    }
    return <span className={classes}>{format(duration)}</span>
}
