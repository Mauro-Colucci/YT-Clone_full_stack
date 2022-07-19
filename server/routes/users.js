import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//user update
router.put('/:id',verifyToken, update)


//delete user
router.delete('/:id',verifyToken, deleteUser)


//get user
router.get('/find/:id', getUser)


//subscribe user
router.put('/sub/:id',verifyToken, subscribe)


//unsubscribe
router.put('/unsub/:id',verifyToken, unsubscribe)


//like a video
router.put('/like/:videoId',verifyToken, like)


//dislike a video
router.put('/dislike/:videoId',verifyToken, dislike)



export default router;