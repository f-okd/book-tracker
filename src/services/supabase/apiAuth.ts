import supabase from './supabase';

export interface ICredentials {
  email: string;
  password: string;
}

export const supabaseLogin = async ({ email, password }: ICredentials) => {
  // will also store user + session data in local storage
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
};

export const supbaseGetCurrentUser = async () => {
  // retrieve active session from local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // we can get the user from the session but it would be more secure to redownload from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
};

export const supbaseLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
