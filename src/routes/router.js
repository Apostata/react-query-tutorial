import {Suspense, memo, Fragment} from 'react'
import { BrowserRouter, Navigate , Route, Routes, Link  } from 'react-router-dom'
import { Routes as RoutesList } from './routes'
import Layout from '../components/UI/Layout'

export const renderLinks = (route)=>{
    let params=null;
    if(route?.initialData){
        params = new URLSearchParams(route?.initialData).toString()
    }
    return  (
    <Fragment  key={`link-${route.path}-${Math.random()}`}>
        {route?.show !== false?
            <li>
                <Link to={`${route.path}${params?`?${params}`:''}`}>{route.label}</Link>
                {(route?.children?.length>0 && route?.children?.some((child)=>child.show !== false)) && (
                <ul>
                    {route?.children?.map((child)=>renderLinks({...child, path:`${route.path}${child.path}${params?`?${params}`:''}`}))}
                </ul>
                )}
            </li>
        :null}
    </Fragment>)
}


const renderRoutes = (route)=>{
    const Component = route.element
    
   
    return <Fragment key={`${route.label}-${Math.random()}`}>
        <Route  path={`${route.path}`} exact={route.exact} element={<Component />} />
        {route?.children?.length>0 &&
            route?.children.map((child)=>renderRoutes({...child, path:`${route.path}${child.path}`}))
        }
    </Fragment>
}

export const Router = memo(()=>{
    return(
   
        <BrowserRouter>
            <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {RoutesList.map((route)=>renderRoutes(route))}
                    <Route path="/" exact element={<Navigate to="/home" />} />
                </Routes>
                </Suspense>
            </Layout>
        </BrowserRouter>
    )
})
