import { Prettify } from '../utils/Prettify.js';

export type User = Prettify<{
  id: string;
  email: string;
  name: string;
  display_name?: string;
  job_title?: string;
  time_zone?: string;
  country?: string;
  region?: string;
  company_name?: string;
  password?: string;
}>;

export type SessionUser = Prettify<{
  id: string;
  email: string;
  name: string;
  token: string;
}>;