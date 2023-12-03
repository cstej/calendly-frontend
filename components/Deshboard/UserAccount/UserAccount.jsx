import React, { useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';
import api from '@/pages/api/api';
import { useEffect } from 'react';
import { LogOutModal } from '@/components/Modals/LogOutModel';
import { useRouter } from 'next/router';

const UserAccount = ({ tabItems }) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].id);
  const [userInitials, setUserInitials] = useState('')
  const[open,setOpen]=useState(false)
  const router=useRouter()
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleLogout=()=>{
    api.post("/users/logout")
    .then((response) => {
      console.log("Logout successfully");
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    })
    .finally(() => {
      // Close the logout modal
     router.push("/login")
      setOpen(false);
    });
  } 
 
    
  
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
 const fetchData=()=>{
  api.get("/users/user/first-letter")
  .then((response)=>{
    const data=response.data
    setUserInitials(data.firstLetter)
  }).catch((error) => {
    console.error('Error fetching user initials:', error);
  })
 }
  // const userInitials = 'U'; // Replace this with the user's initials
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white sticky top-0 z-[999] dark:bg-gray-900 border-b-1 border-black shadow-sm">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex flex-wrap items-center justify-between">
       
          <ul className="flex flex-wrap font-medium mt-0 space-x-8 text-sm">
            {tabItems.map((ele, i) => (
              <Button
                key={i}
                size='sm'
                variant='text'
                onClick={() => handleTabClick(ele.id)}
                className={`capitalize ${activeTab === ele.id ? 'text-blue-500' : 'text-gray-900 dark:text-white'} hover:underline`}
              >
                {ele.label}
              </Button>
            ))}
            <Menu>
              <MenuHandler>
                <Button size="sm" variant="text" color="transparent">
                  Menu
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>Help Center</MenuItem>
                <MenuItem>Calendly Community</MenuItem>
                <MenuItem>Chat With Us</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuHandler>
                <Button size="sm" variant="text" color="transparent">
                  Account
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>Setting</MenuItem>
                <MenuItem>Availability</MenuItem>
                <MenuItem>Share My Link</MenuItem>
                <MenuItem>Admin</MenuItem>
                <MenuItem>Analytics</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </ul>
          <div className="relative inline-block">
            <div className="flex items-center">
              
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center" onClick={handleOpen}>
                {userInitials} 
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogOutModal  open={open} handleOpen={handleOpen}  handleClick={handleLogout} title="Logout"  />
    </div>
  );
};

export default UserAccount;
