import { Prettify } from '../utils/Prettify.js';

export type User = Prettify<{
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  job_title?: string;
  time_zone?: string;
  country?: string;
  region?: string;
  company_name?: string;
  password?: string; // Added for authentication
}>;

export type SessionUser = Prettify<{
  id: string;
  email: string;
  token: string;
}>;