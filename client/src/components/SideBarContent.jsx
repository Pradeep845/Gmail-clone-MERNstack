import { CreateOutlined } from "@mui/icons-material";
import { Box, Button, List, ListItem, styled } from "@mui/material";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import ComposeMail from "./ComposeMail";
import { useState } from "react";
import { routes } from "../routes/routes";
import {useParams,NavLink} from 'react-router-dom';

const ComposeButton = styled(Button)({
    background:"#c2e7ff",
    color:'#001d35',
    textTransform:'none',
    borderRadius:16,
    minWidth:140,
    padding:15,
})

const Container = styled(Box)({
    padding:8,
    '& > ul':{
        padding:"10px 0 0 5px",
        fontSize:14,
        fontWeight:500,
        cursor :'pointer',
        '& > a':{
            textDecoration:'none',
            color:'inherit',
        }
    },
    '& > ul > a > li > svg':{
        marginRight:20,
    }
})

const SideBarContent = ()=>{
    const [openDialog,setOpenDialog]= useState(false);

    const { type } = useParams();

    const onComposeClick=()=>{
        setOpenDialog(true);
    }

    return (
        <Container>
            <ComposeButton onClick={()=>onComposeClick()}>
                <CreateOutlined/> Compose
            </ComposeButton>
            <List>
                {
                    SIDEBAR_DATA.map(data=>(
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <ListItem sx={type===data.name?{
                                backgroundColor:'#d3e3fd',
                                borderRadius:'0 10px 10px 0'
                                }:{}}>
                                <data.icon fontSize="small"/>{data.title}
                            </ListItem>
                        </NavLink>
                    ))
                }
            </List>
            <ComposeMail openDialog={openDialog} setOpenDiaolog={setOpenDialog}/>
        </Container>
    );
}

export default SideBarContent