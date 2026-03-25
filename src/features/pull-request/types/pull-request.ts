export interface PullRequest {
  id: number;
  title: string;
  description?: string;
  author: string;
  reviewers?: string[];
  assignees?: string;
  labels?: string;
  isOpen: boolean;
}
