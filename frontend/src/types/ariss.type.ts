export type syncUserType = {
  id: string;
  name: string;
  email: string;
  profilePicUrl: string | null;
};

export interface ArissUser {
  id: string;
  name: string;
  email: string;
  profilePicUrl: string | null;
  type: string;
  status: boolean;
  createdAt: string;
}
