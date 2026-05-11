import { createPollSchema } from "./poll.validator.js";
import { createPollService } from "./poll.service.js";
import { getPublicPollService } from "./poll.service.js";
import { id } from "zod/v4/locales";
import { text } from "express";

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


export const getPublicPoll = async (req,res) => {
    try {
        const { slug } = req.params;

        const result = await getPublicPollService(slug)

        const safePoll = {
            id: result.poll.id,

            title: result.poll.title,

            description: result.poll.description,

            slug: result.poll.description,

            expiresAt: result.poll.expiresAt,

            isexpired: result.poll.published,

            questions: result.poll.questions.map(
                (question) => ({
                    id: question.id,

                    text: question.text,

                    required: question.required,

                    options: question.options.map((option) => ({
                        id: option.id,
                        text: option.id
                    }))
                })
            )
        }

        res.status(200).json({
            success: true,
            poll: safePoll,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        })
    }
}