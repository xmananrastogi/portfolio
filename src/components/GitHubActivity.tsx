import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, GitPullRequest, Star, GitFork } from 'lucide-react';

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: { message: string }[];
    pull_request?: { title: string };
  };
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const GITHUB_USERNAME = 'xmananrastogi';

function getEventDescription(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent':
      return event.payload.commits?.[0]?.message?.split('\n')[0] || 'Pushed code';
    case 'PullRequestEvent':
      return `${event.payload.action} PR: ${event.payload.pull_request?.title || ''}`;
    case 'CreateEvent':
      return `Created ${event.payload.ref_type || 'resource'}${event.payload.ref ? `: ${event.payload.ref}` : ''}`;
    case 'IssuesEvent':
      return `${event.payload.action} issue`;
    case 'WatchEvent':
      return 'Starred a repository';
    case 'ForkEvent':
      return 'Forked repository';
    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type || 'resource'}`;
    default:
      return event.type.replace('Event', '');
  }
}

function getEventIcon(type: string) {
  switch (type) {
    case 'PullRequestEvent':
      return GitPullRequest;
    case 'WatchEvent':
      return Star;
    case 'ForkEvent':
      return GitFork;
    default:
      return Github;
  }
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// Generate a contribution-style heatmap (52 weeks × 7 days)
function ContributionGrid({ events }: { events: GitHubEvent[] }) {
  // Build a map of date → count
  const countMap = new Map<string, number>();
  events.forEach((e) => {
    const date = e.created_at.split('T')[0];
    countMap.set(date, (countMap.get(date) || 0) + 1);
  });

  // Generate 52 weeks × 7 days grid
  const weeks: { date: string; count: number }[][] = [];
  const today = new Date();

  for (let w = 51; w >= 0; w--) {
    const week: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toISOString().split('T')[0];
      week.push({ date: dateStr, count: countMap.get(dateStr) || 0 });
    }
    weeks.push(week);
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px]" aria-label="GitHub contribution activity">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                className="h-[11px] w-[11px] rounded-[2px] transition-colors"
                style={{
                  backgroundColor:
                    day.count === 0
                      ? 'rgba(255,255,255,0.04)'
                      : day.count === 1
                        ? 'rgba(45, 211, 127, 0.3)'
                        : day.count <= 3
                          ? 'rgba(45, 211, 127, 0.55)'
                          : 'rgba(45, 211, 127, 0.85)',
                }}
                title={`${day.date}: ${day.count} event${day.count !== 1 ? 's' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted">
        <span>Less</span>
        {[0.04, 0.3, 0.55, 0.85].map((opacity) => (
          <div
            key={opacity}
            className="h-[10px] w-[10px] rounded-[2px]"
            style={{
              backgroundColor:
                opacity === 0.04
                  ? 'rgba(255,255,255,0.04)'
                  : `rgba(45, 211, 127, ${opacity})`,
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [eventsRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);

        if (eventsRes.ok) {
          const data = await eventsRes.json();
          setEvents(data);
        }

        if (userRes.ok) {
          const data = await userRes.json();
          setUserInfo(data);
        }
      } catch {
        // Silently fail — section just won't show data
      } finally {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-16 md:py-24" aria-label="GitHub Activity">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse rounded-2xl border border-white/10 bg-surface p-8">
            <div className="h-6 w-48 rounded bg-white/10" />
            <div className="mt-4 h-24 rounded bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  const recentEvents = events.slice(0, 8);

  return (
    <section className="px-4 py-16 md:py-24" aria-label="GitHub Activity">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cv-green">
            Open source
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            GitHub Activity
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            Live contribution data from{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal-cyan underline decoration-signal-cyan/30 underline-offset-4 transition hover:decoration-signal-cyan"
            >
              @{GITHUB_USERNAME}
            </a>
            . Cross-verify everything.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.45fr]">
          {/* Main activity card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-surface p-6"
          >
            {/* Contribution grid */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-semibold text-text-primary">Contribution activity</h3>
              <ContributionGrid events={events} />
            </div>

            {/* Recent events feed */}
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Recent activity</h3>
            <div className="space-y-2">
              {recentEvents.map((event, index) => {
                const Icon = getEventIcon(event.type);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-cv-green">
                      <Icon size={14} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-text-secondary">
                        {getEventDescription(event)}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {event.repo.name.split('/')[1] || event.repo.name} · {timeAgo(event.created_at)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {events.length === 0 && (
              <p className="py-8 text-center text-sm text-muted">
                No recent public activity found.
              </p>
            )}
          </motion.div>

          {/* Stats sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid content-start gap-4"
          >
            {userInfo && (
              <>
                {[
                  { label: 'Public repos', value: userInfo.public_repos },
                  { label: 'Followers', value: userInfo.followers },
                  { label: 'Following', value: userInfo.following },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-surface p-5"
                  >
                    <div className="font-mono text-3xl font-semibold text-text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </>
            )}

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-text-primary px-5 py-3.5 text-sm font-semibold text-background transition hover:bg-white"
              aria-label="View full GitHub profile (opens in new tab)"
            >
              <Github size={17} aria-hidden="true" />
              View full profile
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
