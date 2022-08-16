import {Suspense, memo, Fragment} from 'react'
import { BrowserRouter, Navigate , Route, Routes  } from 'react-router-dom'
import { Routes as RoutesList } from './routes'
import Layout from '../components/UI/Layout'


const renderRoutes = (route)=>{
    const Component = route.element
    return <Fragment key={`${route.label}-${Math.random()}`}>
        <Route  path={route.path} exact={route.exact} element={<Component />} />
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
