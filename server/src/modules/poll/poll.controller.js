import { createPollSchema } from "./poll.validator.js";
import { createPollService } from "./poll.service.js";

export const createPoll = async(req,res) =>{
    try {
        const validatedData = createPollSchema.parse(req.body)

        const poll = await createPollService(
            validatedData,
            req.user.id
        )

        res.status(201).json({
            success: true,
            poll
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}