
import noticeModel from '../model/notice.model.js';
import notice from '../model/notice.model.js';

export const createNotice = async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "Both title and type are required" });
    }

    const newNotice = await notice.create({ type, title });

    return res.status(201).json({
      message: "Notice created successfully",
      notice: newNotice
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


export const getAllNotice=(async(req,res)=>{
    try {
     
    const retrievedNotices=await notice.find()
       return res.status(200).json({
      message: "Data retrieved successfully",
      notices: retrievedNotices
    });
    } catch (error) {
         console.log(error.message);
           return res.status(500).json({message:"Internal server error"},error.message)
    }
})

export const updateNotice=(async(req,res)=>{
    try {
        const {id}=req.body
        if(!id){
            return res.status(404).json({message:"invalid id"})
        }
      const {type,title}=req.body
      const updateNotice=await notice.findByIdAndUpdate(
        id,
        {title,type},
        {new:true,runValidators:true}
      )
      if(!updateNotice){
        return res.status(404).json({
            message:"Notice not found"
        })
      }
      return res.status(200).json({
        message:"Notice update successfully",
        updateNotice:updateNotice
      })

    } catch (error) {
        return res.status(500).json({message:"Internal server error"},error.message)
    }
})

export const deleteNotice=(async(req,res)=>{
    try {
        const {id}=req.body
        if(!id){
            return res.status(404).json({message:"Notice not found"})
        }
        const retrievedNotices=await notice.findByIdAndDelete({id})
        return res.status(200).json({message:"Notice deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"},error.message) 
    }
})