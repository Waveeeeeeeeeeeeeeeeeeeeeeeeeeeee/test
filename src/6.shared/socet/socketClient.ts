import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io('http://77.238.235.94:15000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket is not initialized.');
  }
  return socket;
};
