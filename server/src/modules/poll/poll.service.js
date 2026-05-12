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