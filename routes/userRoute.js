import express from "express";
import { fetchAllUsers } from "../controllers/allUserControllers.js";
import { requireSignIn , isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router();
// Fetch all user
router.get("/all-users", requireSignIn, isAdmin, fetchAllUsers);


export default router;
