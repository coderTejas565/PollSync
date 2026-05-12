import { submitResponseSchema } from "./response.validator.js";
import { submitResponseService } from "./response.service.js";

export const submitResponse = async (req,res) => {
    try {
        const validatedData = submitResponseSchema.parse(req.body);

        const response = await submitResponseService({
            pollId: req.params.pollId,

            answers: validatedData.answers,

            userId: req.user?.id || null,
        })

        res.status(201).json({
            success: true,
            response
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}