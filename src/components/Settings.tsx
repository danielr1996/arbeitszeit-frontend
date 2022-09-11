import React, {FunctionComponent, useState} from 'react';
import {Service, ServiceType, useAddServiceMutation, useDeleteServiceMutation, useGetServicesQuery} from "../redux/api";

export const Settings: FunctionComponent = () => {
    return <div className="prose prose-invert max-w-none">
        <h1>Settings</h1>
        <ServiceSettings />
    </div>
}

const ServiceSettings: FunctionComponent = () => {
    return <>
        <h2>Services</h2>
        <ServiceOverview />
        <hr/>
        <AddService/>
    </>
}

const ServiceOverview: FunctionComponent = () =>{
    const services = useGetServicesQuery().data
    const [deleteService] = useDeleteServiceMutation()
    return  <ul>
        {services?.map(service =>
            <li key={service.id}>
                <>Type: <DisplayServiceType type={service.type}/>,</>
                <>ID: {service.id},</>
                <>Config: {JSON.stringify(service.config)}</>
                <button
                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={() => deleteService(service.id)}>Löschen
                </button>
            </li>)}
    </ul>
}

const AddService: FunctionComponent = ()=>{
    const [add] = useAddServiceMutation()
    const [service, setService] = useState<Service>({id: -1, type: 'CLOCKIFY_SERVICE'})

    const setConfigValue = (configKey: string, configValue: string) => {
        setService(service => ({...service, config: {...service.config, [configKey]: configValue}}))
    }

    const setServiceType = (type: ServiceType) => {
        setService(service => ({...service, type}))
    }

    const deleteConfigValue = (configKey: string) => {
        setService(service => ({
            ...service,
            config: Object.fromEntries(Object.entries(service.config || {}).filter(([key]) => configKey !== key))
        }))
    }

    const addConfigValue = (configKey: string)=>{
        setService(service => ({...service, config: {...service.config, [configKey]: ""}}))
    }

    return <>
        <SelectType onChange={setServiceType}/>
        <ConfigOverview config={service.config} onDelete={deleteConfigValue} onChange={(configKey, configValue)=>setConfigValue(configKey, configValue)}/>
        <AddConfig onChange={addConfigValue} />
        <br/>
        <button
            onClick={() => add(service)}
            type="button"
            className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        >
            Add Service
        </button>
    </>
}

type SelectTypeProps = {
    onChange: (type: ServiceType)=>void
}
const SelectType: FunctionComponent<SelectTypeProps> = ({onChange})=>{
    return <>
        Type:
        <select onChange={(e) => onChange(e.target.value as ServiceType)}>
            <option value="CLOCKIFY_SERVICE">Clockify</option>
            <option value="TESTDATA_SERVICE">TestData</option>
        </select><br/>
    </>
}

type ConfigOverviewProps = {
    config?: {[key in string]: string},
    onDelete: (configKey: string)=>void,
    onChange: (configKey: string, configValue: string)=>void,
}
const ConfigOverview: FunctionComponent<ConfigOverviewProps> = ({config, onDelete,onChange})=>{

    return <>
        <ul>
            {Object.entries(config || {}).map(([configKey, configValue]) => <li key={configKey}>
                {configKey} = <input value={configValue} onChange={e => onChange(configKey, e.target.value)}/>
                <button
                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={() => onDelete(configKey)}>Löschen
                </button>
            </li>)}<br/>
        </ul>
    </>
}

type AddConfigProps = {
    onChange: (configKey: string)=>void
}

const AddConfig: FunctionComponent<AddConfigProps> = ({onChange})=>{
    const [newConfigKey, setNewConfigKey] = useState<string>("")
    return <><input value={newConfigKey} onChange={e=>setNewConfigKey(e.target.value)}/>
    <button
        onClick={() => {
            onChange(newConfigKey)
            setNewConfigKey("")
        }}
        type="button"
        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
    >Add Config
    </button></>
}

const DisplayServiceType: FunctionComponent<{ type: ServiceType }> = ({type}) => {
    switch (type) {
        case 'CLOCKIFY_SERVICE':
            return <>Clockify</>
        case 'TESTDATA_SERVICE':
            return <>TestData</>
    }
}
