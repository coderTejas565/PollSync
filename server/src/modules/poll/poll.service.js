import { text } from "express";
import prisma from "../../common/lib/prisma.js";
import { generateSlug } from "../../common/utils/generateSlug.js";

export const createPollService = async (
    data,
    creatorId
) =>{
    const slug = generateSlug(data.title)

    const poll = await prisma.poll.create({
        data: {
            title: data.title,

            description: data.description,

            slug,

            expiresAt: new Date(data.expiresAt),

            isAnonymous: data.isAnonymous,

            creatorId,

            questions: {
                create: data.questions.map((questions) =>({
                    text: questions.text,

                    required: questions.required,

                    options: {
                        create: question.options.map((option)=>({
                            text: option,
                        })
                    ),
                    },
                }),
            ),
            },
        },
        include:{
            questions:{
                include:{
                    options:true,
                },
            },
        },
    });
    
    return poll;
}