import React from 'react'
import { Routes } from '../../routes/routes'
import { renderLinks } from  '../../routes/router'


const Layout = ({children}) => {
  return (
    <>
        <nav>
            <ul>
                {Routes.map((route)=>renderLinks(route))}
            </ul>
        </nav>
        <div className='main_content'>
            {children}
        </div>
    </>
  )
}


export default Layout