import prisma from "../../common/lib/prisma.js";
import { getIO } from "../socket/socket.handler.js";

export const submitResponseService =
  async ({
    pollId,
    answers,
    userId,
  }) => {
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },

      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!poll) {
      throw new Error("Poll not found");
    }

    const isExpired =
      new Date() > new Date(poll.expiresAt);

    if (isExpired) {
      throw new Error(
        "Poll has expired"
      );
    }

    if (!poll.isAnonymous) {
        if (!userId) {
            throw new Error("Login required to submit this poll");
            
        }
        const existingResponse = await prisma.response.findFirst({
                where:{
                    pollId,
                    userId
                }
            })
            
            if (existingResponse) {
                throw new Error("You have already submitted this poll");
                
            }
    }


    const requiredQuestions =
      poll.questions.filter(
        (question) => question.required
      );

    for (const question of requiredQuestions) {
      const answered = answers.find(
        (answer) =>
          answer.questionId === question.id
      );

      if (!answered) {
        throw new Error(
          `Question "${question.text}" is required`
        );
      }
    }

    for (const answer of answers) {
      const question = poll.questions.find(
        (q) => q.id === answer.questionId
      );

      if (!question) {
        throw new Error(
          "Invalid question"
        );
      }

      const validOption =
        question.options.find(
          (option) =>
            option.id === answer.optionId
        );

      if (!validOption) {
        throw new Error(
          "Invalid option selected"
        );
      }
    }

    const response =
      await prisma.response.create({
        data: {
          pollId,

          userId: poll.isAnonymous
            ? null
            : userId,

          answers: {
            create: answers.map(
              (answer) => ({
                questionId:
                  answer.questionId,

                optionId:
                  answer.optionId,
              })
            ),
          },
        },

        include: {
          answers: true,
        },
      });
      
      const totalResponses = await prisma.response.count
      ({
        where: {
          pollId,
        },
      });
      const io = getIO();
      if (io) {
        io.to(pollId).emit(
          "new-response",
          {
            pollId,
            totalResponses,
          }
        );
      }
      return response;
    };