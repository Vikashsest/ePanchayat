import express from 'express';
import { getUserDashboardData } from '../controller/userDashboard.controller.js';

const router=express.Router()

router.get("/user/dashboard",getUserDashboardData)

export default router