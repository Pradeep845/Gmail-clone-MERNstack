import { useOutletContext,useParams } from "react-router-dom"
import { API_URLS } from "../services/api.url";
import useApi from '../hooks/useApi';
import { useEffect, useState } from "react";
import { Box, Checkbox,List} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "./common/NoMails";
import { EMPTY_TABS } from "../constants/constant";

const Emails = () => {
    const [selectedEmails,setSelectedEmails] = useState([]);
    const [refreshScreen,setRefreshScreen] = useState(false);

    const {openDrawer} = useOutletContext();
    const { type }= useParams();

    const getEmailService=  useApi(API_URLS.getEmailFromType);
    const moveEmailsToBinService=  useApi(API_URLS.moveEmailsToBin);
    const DeleteEmailsFromBinService=  useApi(API_URLS.deleteEmail);

    useEffect(()=>{
        getEmailService.call({},type);
    },[type,refreshScreen]);

    const selectAllEmails = (e)=>{
        if(e.target.checked){
            let emails = getEmailService?.response?.map(email=> email._id);
            setSelectedEmails(emails);
        }
        else{
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = (e) => {
        if(type==='bin'){
            DeleteEmailsFromBinService.call(selectedEmails);
        }
        else{
            moveEmailsToBinService.call(selectedEmails);
        }
        setRefreshScreen(prevState=>!prevState);
    }

    return (
        <Box style={ openDrawer?{marginLeft:250} : {width: '100%'}}>
            <Box style={{ padding:'20px 10px 0px 10px', display:'flex',alignItems:'center', background:'yellow'}}>
                <Checkbox size="small" onChange={(e)=>selectAllEmails(e)}/>
                <DeleteOutline onClick={(e)=>deleteSelectedEmails(e)}/>
            </Box>
            <List>
                {

                    getEmailService?.response?.map(email=>(
                        <Email 
                            key = {email._id}   
                            email= {email}
                            selectedEmails={selectedEmails}
                            setSelectedEmails= {setSelectedEmails}
                            setRefreshScreen={setRefreshScreen}
                        />
                    ))
                }
            </List>
                {
                    getEmailService?.response?.length===0 
                    &&
                    <NoMails message={EMPTY_TABS[type]}/>
                }
        </Box>
    )
}
export default Emails