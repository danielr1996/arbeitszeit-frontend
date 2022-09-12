import React, {FunctionComponent} from 'react';
import {Daily} from "../Daily";
export const Overview: FunctionComponent = () => {
    return <>
        <div className="h-full flex justify-center items-center">
           <Daily />
        </div>
    </>
}
