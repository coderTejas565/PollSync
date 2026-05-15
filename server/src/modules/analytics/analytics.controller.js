import { getPollAnalyticsService } from "./analytics.service.js"



export const getPollAnalytics = async (req,res) => {
    try {
        const analytics = await getPollAnalyticsService({
            pollId: req.params.pollId,
            userId: req.user.id
        })

        res.status(200).json({
            success: true,
            data: analytics
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message,
        })
    }
}