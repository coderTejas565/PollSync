import { text } from "express";
import prisma from "../../common/lib/prisma.js";
import { generateSlug } from "../../common/utils/generateSlug.js";
import { includes } from "zod";

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
                create: data.questions.map((question) =>({
                    text: question.text,

                    required: question.required,

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


export const getPublicPollService = async(
    slug
) => {
    const poll = await prisma.poll.findUnique({
        where:{
            slug,
        },
        
        include:{
            questions:{
                include:{
                    options:true,
                }
            }
        }
    });

    if (!poll) {
        throw new Error("Poll not found")
    }

    const isExpired = new Date() > new Date(poll.expiresAt)

    return {
        poll,
        isExpired,
    }
}


export const getPollAnalyticsService =
  async ({
    pollId,
    userId,
  }) => {
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },

      include: {
        questions: {
          include: {
            options: {
              include: {
                answers: true,
              },
            },
          },
        },

        responses: true,
      },
    });

    if (!poll) {
      throw new Error("Poll not found");
    }

    if (poll.creatorId !== userId) {
      throw new Error(
        "Unauthorized access"
      );
    }

    const analytics = {
      pollId: poll.id,

      title: poll.title,

      totalResponses:
        poll.responses.length,

      questions: poll.questions.map(
        (question) => ({
          questionId: question.id,

          question: question.text,

          required: question.required,

          options: question.options.map(
            (option) => ({
              optionId: option.id,

              text: option.text,

              count:
                option.answers.length,
            })
          ),
        })
      ),
    };

    return analytics;
  };