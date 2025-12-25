import { Router } from "express";   
import { submitContactForm } from "../controllers/contact.controller.js";
import rateLimit from "../middlewares/rateLimit.js";

const router = Router()

router.post('/' , rateLimit , submitContactForm)

export default router;
