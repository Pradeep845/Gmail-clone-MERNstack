import Email from "../model/email.js";




export const saveSentEmails  = (request,response)=>{
    try{
       const email =  new Email(request.body);
       email.save();
       response.status(200).json('email saved successfully');
    }
    catch(err){
        response.status(500).json(err.message);
    }
}

export const getEmails = async (request, response)=>{
    try{
        let emails;
        // console.log("this is ",request.params.type);
        if(request.params.type === 'allmails'){
            emails= await Email.find();
        }
        else if(request.params.type==='bin'){
            emails = await Email.find({bin:true});
        }
        else if(request.params.type==='starred'){
            emails = await Email.find({starred:true,bin:false});
        }
        else{
            emails= await Email.find({type:request.params.type});
        }
        return response.status(200).json(emails);
    }
    catch(err){
        console.log(err);
        response.status(500).json(err.message);
    }
}

export const moveEmailsToBin = async(request,response)=>{
    try{
        await Email.updateMany({ _id:{$in:request.body}},{$set:{bin:true,starred:false,type:''}});
        return response.status(200).json('emails deleted Successfully');
    }
    catch(err){
        console.log(err);
        response.status(500).json(err.message);
    }
}


export const toggleStarredEmails = async (request,response)=>{
    try{
        await Email.updateOne({_id: request.body.id},{$set:{starred:request.body.value}});
        return response.status(200).json("email is starred mark");
    }
    catch(error){
        console.log(error);
        response.status(500).json(error.message);
    }
}

export const deleteEmail =async (request,response) =>{
    try{
        await Email.deleteMany({_id:{$in:request.body}});
        return response.status(200).json("Messages deleted succesfully")
    }
    catch(error){
        console.log(error);
        response.status(500).json(error.message);
    }
}