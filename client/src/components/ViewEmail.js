
import { ArrowBack, Delete } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import { useLocation, useOutletContext } from "react-router-dom";
import { emptyProfilePic } from "../constants/constant";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.url";

const IconWrapper = styled(Box)({
    padding:15,
})
const Subject = styled(Typography)({
    fontSize:22,
    margin:'10px 0 20px 75px',
    display:'flex',
})
const Indicator = styled(Box)({
    fontSize:12,
    background:'#ddd',
    color:'#222',
    padding:'2px 4px',
    marginLeft:6,
    borderRadius:4,
    alignSelf:'center',
})
const Contanier = styled(Box)({
    marginLeft:15,
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    '& > div':{
        display:'flex',
        justifyContent:'space-between',
        '& > p > span': {
            fontSize: 12,
            alignItems:'center',
            alignSelf:'center',
            color: '#5E5E5E'
        }
    }
})
const Dates = styled(Typography)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E'
})

const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc',
    alignItems:'center'
});

const Bady = styled(Typography)({
    marginTop:50,
    justifyContent:'center',
    width:'80%',
    paddingLeft:'100px',
    display:'flex',
    alignItems:'center',
})

const ViewEmail = ()=>{
    const {openDrawer} = useOutletContext();
    const {state} = useLocation();
    const {email}= state;

    const moveEmailsToBinService=  useApi(API_URLS.moveEmailsToBin);

    const deleteEmail = ()=>{
        moveEmailsToBinService.call([email._id]);
        window.history.back();
    }

    return (
        <Box style={openDrawer?{marginLeft:250} : {width: '100%'}}>
            <IconWrapper>
                <ArrowBack onClick={()=>window.history.back()} color="acion" fontSize="small"/> 
                <Delete fontSize="small" color="action" style={{marginLeft:40}} onClick={()=>deleteEmail()}/>
            </IconWrapper>
            <Subject>
                {email.subject} <Indicator component='span'>Inbox</Indicator>
            </Subject>
            <Box style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
                <Image src={emptyProfilePic} alt="dp"/>
                <Contanier>
                    {/* <Box> */}
                        <Typography>{email.name}
                        <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
                        </Typography>
                        <Dates>
                        {(new Date(email.date).getDate())}&nbsp;
                        {(new Date(email.date).toLocaleString('default',{month:`long`}))}
                        {(new Date(email.date).getFullYear())}
                        </Dates>
                    {/* </Box> */}
                </Contanier>
            </Box>
            {/* <Box> */}
                <Bady>{email.body}</Bady>
            {/* </Box> */}
        </Box>
    )
}

export default ViewEmail;