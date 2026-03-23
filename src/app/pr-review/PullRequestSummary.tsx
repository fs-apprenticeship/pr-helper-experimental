import { PullRequest } from "@/types/pull-request";
import { Repo } from "@/types/repo";

export default function PullRequestSummary({
  repo,
  pr,
}: {
  repo: Repo;
  pr: PullRequest | undefined;
}) {
  return (
    <div className={`flex items-center justify-center gap-x-4 rounded-xl p-6 shadow-lg outline outline-white/5 ${pr ? "bg-slate-800" : "bg-red-500"}`}>
      {pr ? (
        <div>
          <h3 className="font-semibold mb-4 text-xl">{`${repo.owner} / ${repo.name}`}</h3>
          <p>{`${pr.title} #${pr.id}`}</p>
          <p className="text-sm font-semibold">{`Requested by: ${pr.author}`}</p>
        </div>
      ) : (
        <h3 className="font-semibold">PR not found</h3>
      )}
    </div>
  );
}
