import * as React from "react";
import { Button, Menu, Fade, MenuItem } from "../../../node_modules/@mui/material/index";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/BasketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignInMenu(){
    const dispatch=useAppDispatch();
    const {user}=useAppSelector((state:any)=>state.account);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{typography:'h6'}} color='inherit'>
        {user.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={()=>{
          dispatch(signOut());
          dispatch(clearBasket());
          }}>Logout</MenuItem>
      </Menu>
    </>
  );
}