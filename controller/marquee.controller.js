import marqueeModel from "../model/marquee.model.js";


export const createMarquee=async(req,res)=>{
    try {
       const { info, new: isNew }=req.body
       if(!info || !isNew){
        return res.status(400).json({message:"Missing all fields are required"})
       }
       const newMarquee=marqueeModel.create({
        info,
        new:isNew
       })
       return res.status(201).json({message:"marquee created successfully",newMarquee})
    
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const  getMarquee=async(req,res)=>{
    try {
        const marquees=await marqueeModel.find()
        return res.status(200).json({
            total_marquees:marquees
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}