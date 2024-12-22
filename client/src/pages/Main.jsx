import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import BufferingComponent from '../components/helperComponents/BufferingComponent';

const Main = () => {
  const [openDrawer, setOpenDrawer] = useState(true);


  const toggleDrawer = () => {
    setOpenDrawer(prevState => !prevState);
  }




  return (
    <div>
        <Header toggleDrawer = {toggleDrawer}/>
        <SideBar openDrawer = { openDrawer }/>
        <Suspense fallback = {<BufferingComponent />}>
          <Outlet context={{ openDrawer }}/>
        </Suspense>
    </div>
  )
}

export default Main;