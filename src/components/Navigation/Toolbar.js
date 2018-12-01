//functional component, this creates the toolbar 
import React from 'react';
import classes from './Toolbar.css'
import Logo from './../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle';
//default heighht for logo is 100%, but we pass 80% as a prop
const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;