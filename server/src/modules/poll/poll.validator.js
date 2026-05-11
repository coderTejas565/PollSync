import { text } from "express"
import { z } from "zod"

export const createPollSchema = z.object({
    title: z.string().min(3),

    description: z.string().optional(),

    expiresAt: z.string(),

    isAnonymous: z.boolean(),

    questions: z.array(z.object({
        text: z.string().min(3),

        required: z.boolean(),

        options:z.array(z.string().min(1)).min(2)
    }))
})