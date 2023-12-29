import styled from "@emotion/styled";
import { Close, DeleteOutline } from "@mui/icons-material";
import { Box, Button, Dialog, InputBase, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.url";

const dialogStyle ={
    height:'90%',
    width:'80%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow: 'none',
    borderRadius:'10px 10px 0 0'
}

const Header = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    // marginLeft:'40x',
    padding:'10px 15px',
    background:'#208fcc',
})

const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '& > div':{
        fontSize:14,
        fontWeight:500,
        marginTop:'10px'
    }
})
const Footer = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px'

})
const SendButton = styled(Button)({
    background:'#1515ff',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100,
})

const ComposeMail = ({openDialog,setOpenDiaolog})=>{
    const [data,setData] = useState({});
    const sentEmailServices = useApi(API_URLS.saveSentEmail);
    const saveDraftServices = useApi(API_URLS.saveDraftEmail);

    const config = {
        Host : "smtp.elasticemail.com",
        Username : "gmailclone494@yopmail.com",
        Password : "B6263FC023718403D361CBDC38BE65CA6349",
        Port: 2525
    }
    const closeComposeMail=(e)=>{
        e.preventDefault();
        const payload = {
            to:data.to,
            from: 'itsmine4907@gmail.com',
            subject:data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'itsmine',
            starred:false,
            type:'drafts',
        }
        saveDraftServices.call(payload);
        if(!saveDraftServices.error){
            setOpenDiaolog(false);
            setData({});
        }
        else{
            
        }
        setOpenDiaolog(false);
    }
    const sendMail = (e)=>{
        e.preventDefault();
        if(window.Email)
        window.Email.send({
            ...config,
            To : data.to,
            From : "itsmine4907@gmail.com",
            Subject : data.subject,
            Body : data.body,
        }).then(
          message => alert(message)
        );
        // payload
        const payload = {
            to:data.to,
            from: 'itsmine4907@gmail.com',
            subject:data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'itsmine',
            starred:false,
            type:'sent',
        }
        sentEmailServices.call(payload);
        if(!sentEmailServices.error){
            setOpenDiaolog(false);
            setData({});
        }
        else{
            
        }
        setOpenDiaolog(false);
    }
    const onValueChange=(e)=>{
        // console.log(e.target.name,e.target.value);
        setData({ ...data, [e.target.name]:e.target.value});
    }
    return (
        <Dialog
            open={openDialog}
            PaperProps={{sx:dialogStyle}}
        >
            {/* Hello from compose mail */}
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e)=>closeComposeMail(e)}/>
            </Header>
            <RecipientsWrapper>
              <InputBase placeholder="Recipients" name = "to" onChange={(e)=>onValueChange(e)}/>
              <InputBase placeholder="Subject" name = "subject" onChange={(e)=>onValueChange(e)}/>
            </RecipientsWrapper>
            <TextField 
                multiline
                rows={19}
                sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
                name = "body"
                onChange={(e)=>onValueChange(e)}
                />
            <Footer>
                <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>
                <DeleteOutline onClick={()=>setOpenDiaolog(false)}/>
            </Footer>
        </Dialog>
    );
}
export default ComposeMail;