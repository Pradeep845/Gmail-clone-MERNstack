import { Box, Divider, Typography } from "@mui/material";


const NoMails = ({message})=>{
    return (
        <Box sx = {{textAlign:'center',marginTop:10}}>
            <Typography>{message?.heading}</Typography>
            <Typography>{message?.subHeading}</Typography>
            <Divider/>
        </Box>
    )
}
export default NoMails;