import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../routes/routes'


const listRoutes = (route)=>{
    return  (
    <li key={`link-${route.path}-${Math.random()}`}>
        <Link to={route.path}>{route.label}</Link>
        {route?.children?.length>0 && (
        <ul>
           {route?.children?.map((child)=>listRoutes({...child, path:`${route.path}${child.path}`}))}
        </ul>
        )}
    </li>)
}


const Layout = ({children}) => {
  return (
    <>
        <nav>
            <ul>
                {Routes.map((route)=>listRoutes(route))}
            </ul>
        </nav>
        <div>
            {children}
        </div>
    </>
  )
}


export default Layout