import {FunctionComponent} from "react";
import {useSyncMutation} from "../redux/api";

export const SyncButton: FunctionComponent = ()=>{
    const [sync] = useSyncMutation()
    return <button className="rounded-3xl border-2 bg-amber-900" onClick={()=>sync()}>Sync</button>
}
