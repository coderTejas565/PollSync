import { createPollSchema } from "./poll.validator.js";
import { createPollService ,getPublicPollService, getMyPollsService, publishPollService, getPublicResultsService, deletePollService} from "./poll.service.js";
import { id } from "zod/v4/locales";
import { text } from "express";
import { date } from "zod";

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

            isExpired: result.poll.published,

            questions: result.poll.questions.map(
                (question) => ({
                    id: question.id,

                    text: question.text,

                    required: question.required,

                    options: question.options.map((option) => ({
                        id: option.id,
                        text: option.text
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


export const getMyPolls = async (req,res) => {
    try {
        const polls = await getMyPollsService(req.user.id);

        res.status(200).json({
            success: true,
            data: polls,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const publishPoll = async (req,res) => {
    try {
        const poll = await publishPollService({
            pollId: req.params.pollId,

            userId: req.user.id
        })

        res.status(200).json({
            success: true,

            message: "Poll published successfully",
            
            date: poll
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const getPublicResults = async (req,res) => {
    try {
        const results = await getPublicResultsService(req.params.slug)

        res.status(200).json({
            success: true,
            data: results
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const deletePoll = async (req, res) => {
    try {
        await deletePollService({
            pollId: req.params.id,
            userId: req.user.id,
        });
        
        res.json({
            success: true,
            message: "Poll deleted successfully",
        });
    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};