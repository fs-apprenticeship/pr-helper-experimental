import { PullRequest } from "@/features/pull-request/types/pull-request";
import { Repo } from "@/features/pull-request/types/repo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  GitPullRequest,
  Minus,
  Plus,
  User,
  Users,
} from "lucide-react";

const PLACEHOLDER_STATS = {
  filesChanged: 8,
  linesAdded: 240,
  linesRemoved: 75,
};

const REVIEW_FOCUS_ITEMS = ["Large changes", "Missing tests", "Complex logic"];

export default function PullRequestSummary({
  repo,
  pr,
}: {
  repo: Repo;
  pr: PullRequest | undefined;
}) {
  if (!pr) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <p className="text-[13px] font-medium text-foreground">
            Pull request not found
          </p>
          <p className="text-[12px] text-muted-foreground">
            Check the owner, repo name, and PR number and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <GitPullRequest className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[13px] text-muted-foreground">
              {repo.owner} / {repo.name}
            </span>
          </div>
          <Badge
            className={
              pr.isOpen
                ? "border-green-500/20 bg-green-500/10 text-green-400"
                : "border-border bg-muted text-muted-foreground"
            }
          >
            {pr.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-0">
        <div>
          <h2 className="text-[15px] font-semibold leading-snug text-foreground">
            {pr.title}
            <span className="ml-1.5 font-mono text-[13px] font-normal text-foreground/50">
              #{pr.id}
            </span>
          </h2>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Author
            </span>
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-[13px] text-foreground/80">{pr.author}</span>
            </div>
          </div>
          {pr.reviewers && pr.reviewers.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Reviewers
              </span>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {pr.reviewers.map((reviewer) => (
                    <Badge
                      key={reviewer}
                      variant="secondary"
                      className="text-[11px]"
                    >
                      {reviewer}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {pr.description && (
          <p className="text-[13px] leading-5 text-muted-foreground">
            {pr.description}
          </p>
        )}

        <Separator />

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Stats
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-0.5 rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-[11px] text-muted-foreground">
                Files changed
              </span>
              <span className="text-[13px] font-medium text-foreground">
                {PLACEHOLDER_STATS.filesChanged}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 rounded-lg bg-green-500/5 px-3 py-2">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Plus className="h-3 w-3" />
                Added
              </span>
              <span className="text-[13px] font-medium text-green-400">
                +{PLACEHOLDER_STATS.linesAdded}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 rounded-lg bg-red-500/5 px-3 py-2">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Minus className="h-3 w-3" />
                Removed
              </span>
              <span className="text-[13px] font-medium text-red-400">
                -{PLACEHOLDER_STATS.linesRemoved}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Review focus
          </span>
          <div className="flex flex-wrap gap-1.5">
            {REVIEW_FOCUS_ITEMS.map((item) => (
              <Badge
                key={item}
                className="border-amber-500/20 bg-amber-500/10 text-[11px] text-amber-400"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
