let ioInstance = null;

export const setIO = (io) => {
    ioInstance = io;
};

export const getIO = () => {
  return ioInstance;
};

export const registerSocketHandlers = (io) => {

  io.on("connection",(socket) => {

      console.log("Socket connected:",socket.id);

      socket.on("join-poll",(pollId) => {
          socket.join(pollId);
          console.log(`Joined poll room: ${pollId}`);
        }
      );

      socket.on("disconnect",() => {
          console.log("Socket disconnected");
        }
      );
    }
  );
};