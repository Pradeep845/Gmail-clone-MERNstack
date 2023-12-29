import { Star, StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.url";

const Wrapper = styled(Box)({
    padding:'0 0 0 10px',
    background:'#f2f6fc',
    cursor:'pointer',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    '& > div':{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        '& > p':{
            fontSize:14,
        }
    }
})

const Indicator = styled(Typography)({
    fontSize:'12px !important',
    background:'#ddd',
    color:'#222',
    padding:'0 4px',
    borderRadius:4,
    marginRight:6,
})

const Dates = styled(Typography)({
    marginLeft:'auto',
    marginRight:'20px',
    fontSize:'12px',
    color:'#5f6368',
})

const Email = ({email,selectedEmails,setRefreshScreen,setSelectedEmails})=>{
    const navigate = useNavigate();
    const toggleStarredServices = useApi(API_URLS.toggleStarredEmail);

    const toggleStarredEmials=()=>{
        toggleStarredServices.call({id:email._id,value:!email.starred});
        setRefreshScreen(prevState=>!prevState);
    }

    const valueChange = ()=>{
        if(selectedEmails.includes(email._id))
        {
            setSelectedEmails(prevState=> prevState.filter(id=> id!=email._id));
        }
        else{
            setSelectedEmails(prevState=>[...prevState,email._id]);
        }
    }

    return (
        <Wrapper>
            <Checkbox
                size="small"
                checked={selectedEmails.includes(email._id)}
                onClick={()=>valueChange()}
            />
            {
                email.starred?
                    <Star fontSize="small" style={{marginRight:10,color:'#FFDF00'}} onClick={()=>toggleStarredEmials()}/>
                    :
                    <StarBorder fontSize="small" style={{marginRight:10}} onClick={()=>toggleStarredEmials()}/>
            }
            <Box onClick={()=>navigate(routes.view.path,{state:{email:email}})}>
                <Typography style ={{width:200 , overflow:'hidden'}}>{email.name}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography style={{ height:20,overflow:'hidden'}}>{email.subject} {email.body && '-'} {email.body}</Typography>
                <Dates>
                    {(new Date(email.date).getDate())}
                    {(new Date(email.date).toLocaleString('default',{month:`short`}))}
                </Dates>
            </Box>
        </Wrapper>
    )
}

export default Email;