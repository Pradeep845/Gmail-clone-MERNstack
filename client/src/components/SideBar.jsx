import { Drawer, styled } from "@mui/material";
import SideBarContent from "./SideBarContent";

const StyledDrawer = styled(Drawer)({
    // marginTop: '54px'
})

const SideBar = ({openDrawer,toggleDrawer})=>{
    return (
            <StyledDrawer
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
                hideBackdrop={true}
                ModalProps={{
                    keepMounted: true
                }}
                variant="persistent"
                sx={{
                    '& .MuiDrawer-paper':{
                        marginTop:'64px',
                        width:250,
                        background:'#efe3f3',
                        borderRight:'none',
                        height:'calc(100vh-64px)',
                    }
                }}
            >
            <SideBarContent/>
            </StyledDrawer>
    );
};

export default SideBar;