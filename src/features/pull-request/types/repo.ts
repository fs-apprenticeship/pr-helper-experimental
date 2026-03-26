import { PullRequest } from "./pull-request";

export interface Repo {
  id: number;
  name: string;
  owner: string;
  "pull-requests": PullRequest[];
}
