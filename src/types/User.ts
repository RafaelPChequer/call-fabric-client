import { Prettify } from '../utils/Prettify.js';

export type SessionUser = Prettify<{
  id: string;
  name: string;
  token: string;
}>;

export type Call = Prettify<{
  state: string;
  token: string;
  roomName: string;
  userName: string;
}>;
