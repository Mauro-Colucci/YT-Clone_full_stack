import { createError } from '../error.js'
import User from '../models/User.js'
import Video from '../models/Video.js'

export const addVideo = async(req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body})
    try {
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    } catch (error) {
        next(error)
    }
}
export const updateVideo = async(req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                },
                {new: true}
            )
        res.status(200).json(updatedVideo)
        }else {
            return next(createError(403, "you can only update your video"))
        }
    } catch (error) {
        next(error)
    }
}
export const deleteVideo = async(req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id)
        res.status(200).json("video deleted")
        }else {
            return next(createError(403, "you can only delete your video"))
        }
    } catch (error) {
        next(error)
    }
}
export const getVideo = async(req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}
export const addView = async(req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc:{views: 1}
        })
        res.status(200).json("number of views have been increased")
    } catch (error) {
        next(error)
    }
}
export const random = async(req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample: {size: 40}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const trend = async(req, res, next) => {
    try {
        //most viewed videos uses -1 in the mongodb sort method. 1 would be less viewed
        const videos = await Video.find().sort({views: -1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const sub = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(channelId=>{
                return Video.find({userId: channelId})
            })
        )
        //using flat since the list shows a nested array. js sort method to show latest sub first
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}
export const getByTag = async(req, res, next) => {
    //query reffers to tags?tag=
    const tags = req.query.tags.split(',')
    try {
        //searches the tags IN our previously declared const inside our model, and limits the list to 20
        const videos = await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const search = async(req, res, next) => {
    const query = req.query.q
    try {
        //mongo regex method to match query to titles. i options ignores capitalization
        const videos = await Video.find({title: {$regex: query, $options:"i"}}).limit(40)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}