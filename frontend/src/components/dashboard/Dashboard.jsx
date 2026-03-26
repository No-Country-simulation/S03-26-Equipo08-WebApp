import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TextsmsIcon from '@mui/icons-material/Textsms';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {NavLink} from 'react-router';


export function Dashboard () {
const [open, setOpen] = React.useState(false);

const DrawerList = (
    <Box sx={{ width: 250,
      height: '100vh',
      background: '#4A90E2',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRight: '1px solid #e5e7eb'}} role="presentation">
    
    <List>
        <nav>
            <ul style={{marginLeft:'11%' , color:'white'}}>
                <li style={{marginTop:'12%'}}><DashboardIcon/><NavLink style={{marginLeft:'3%' , fontWeight:'bold'}} to="/dashboard">Dashboard</NavLink></li>
                <li style={{marginTop:'12%'}}><TextsmsIcon/><NavLink style={{marginLeft:'3%', fontWeight:'bold'}} to="testimonios">Testimonios</NavLink></li>
                <li style={{marginTop:'12%'}}><DownloadDoneIcon/><a style={{marginLeft:'3%' , fontWeight:'bold'}} href="">Moderación</a></li>
                <li style={{marginTop:'12%'}}><CategoryIcon/><a style={{marginLeft:'3%', fontWeight:'bold'}} href="">Categorias</a></li>
                <li style={{marginTop:'12%'}}><ArrowBackIosNewIcon/><a style={{marginLeft:'3%', fontWeight:'bold'}} href="">Embeds</a></li>
            </ul>
        </nav>
    </List>
    <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>

    <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
    <img
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
    />

    <div style={{ marginLeft: '10px' }}>
      <p style={{ margin: 0, fontWeight: 'bold' , color:'white' }}>Lautaro Frioni</p>
      <p style={{ margin: 0, fontSize: '12px', color: 'white' }}>Admin</p>
    </div>
  </div>

  {/* Dropdown */}
  {open && (
    <div style={{
      marginTop: '10px',
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '6px'
    }}>
      <p style={{ padding: '10px', margin: 0, cursor: 'pointer' }}>Your profile</p>
      <p style={{ padding: '10px', margin: 0, cursor: 'pointer' }}>Settings</p>
      <p style={{ padding: '10px', margin: 0, cursor: 'pointer', color: 'red' }}>Log out</p>
    </div>
  )}

</div>
    </Box>
);
    return(
        <>
            <div>
                {DrawerList}
            </div>
        </>
    )
}

export default Dashboard