import noticeModel from "../model/notice.model.js";
import Request from "../model/Request.model.js";
import { Scheme } from "../model/Scheme.model.js";

export const getUserDashboardData=async(req,res)=>{
    try {
        const total_notices=await noticeModel.countDocuments()
        const total_schemes=await Scheme.countDocuments()
        const total_requests=await Request.countDocuments()
        return res.status(200).json({
        message:"User dashboard data fetched successfully",
            total_notices:total_notices,
            total_schemes:total_schemes,
            total_requests:total_requests
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}