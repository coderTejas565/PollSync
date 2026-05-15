import { text } from "express";
import prisma from "../../common/lib/prisma.js";
import { generateSlug } from "../../common/utils/generateSlug.js";
import { includes } from "zod";
import { id } from "zod/v4/locales";

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
                            text: option.text,
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

    const isExpired = poll.expiresAt ? new Date() > new Date(poll.expiresAt)
    : false;

    return {
        poll,
        isExpired,
    }
}


  export const getMyPollsService = async (userId) => {
    const polls = await prisma.poll.findMany({
        where: {
            creatorId: userId
        },

        include: {
            responses: true
        },

        orderBy: {
            createdAt: "desc"
        }
    })

    return polls.map((poll) => ({
        id: poll.id,

        title: poll.title,

        description: poll.description,

        slug: poll.slug,

        published: poll.published,

        isAnonymous: poll.isAnonymous,

        createdAt: poll.createdAt,

        expiresAt: poll.expiresAt,

        totalResponses: poll.responses.length,
    }))
  }


export const publishPollService = async ({pollId,userId}) => {

    const poll = await prisma.poll.findUnique({

        where: {
            id: pollId
        }

    });

    if (!poll) {

        throw new Error(
            "Poll not found"
        );

    }


    if (poll.creatorId !== userId) {

        throw new Error(
            "Unauthorized access"
        );

    }


    if (poll.published) {

        throw new Error(
            "Poll already published"
        );

    }


    const updatedPoll = await prisma.poll.update({

        where: {
            id: pollId
        },

        data: {

            published: true

        }

    });


    return updatedPoll;

};


  export const getPublicResultsService =
  async (slug) => {
    const poll = await prisma.poll.findUnique({
      where: {
        slug,
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

    if (!poll.published) {
      throw new Error(
        "Results are not published yet"
      );
    }

    return {
      pollId: poll.id,

      title: poll.title,

      totalResponses:
        poll.responses.length,

      questions: poll.questions.map(
        (question) => ({
          question: question.text,

          options: question.options.map(
            (option) => ({
              text: option.text,

              count:
                option.answers.length,
            })
          ),
        })
      ),
    };
  };

  
  export const deletePollService = async ({pollId,userId}) => {
    const poll = await prisma.poll.findUnique({
      where:{
        id: pollId,
      }
    })

    if (!poll) {
      throw new Error("Poll not found");
      
    }

    if (poll.creatorId !== userId) {
      throw new Error("Unauthorized");
      
    }

    await prisma.poll.delete({
      where:{
        id: pollId
      }
    })

    return {
      success: true
    }
  }