import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight, GitCommit, Terminal } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { SpotlightCard } from "./ui/SpotlightCard";
import { GithubCalendar } from "./ui/GithubCalendar";

const featuredRepos = [
  {
    name: "vitalize-fullstack",
    desc: "Academic platform for VIT students — 9,103 past papers searchable, LLaMA 3.1 AI solutions, KaTeX OCR.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 12,
    forks: 3,
    url: "https://github.com/xmananrastogi/vitalize-fullstack",
  },
  {
    name: "WoundTrack-AI",
    desc: "Cell segmentation & migration tracking pipeline. 441 cells across 800+ frames with LoG detection & LAP.",
    language: "Python",
    langColor: "#3572A5",
    stars: 8,
    forks: 2,
    url: "https://github.com/xmananrastogi/WoundTrack-AI",
  },
  {
    name: "portfolio",
    desc: "3D personal portfolio featuring custom holographic particle avatar, WebGL globe, and MacOS dock.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 15,
    forks: 4,
    url: "https://github.com/xmananrastogi/portfolio",
  },
];

const GithubSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="github"
      className="px-5 py-24 md:px-10"
      aria-label="GitHub activity and open source"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Activity & Open Source
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
              GitHub Telemetry
            </h2>
          </div>
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs font-mono text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200"
          >
            <Github size={14} className="text-zinc-300" />
            <span>@xmananrastogi</span>
            <ArrowUpRight size={13} className="text-zinc-500" />
          </a>
        </div>

        <div ref={ref} className="space-y-4">
          {/* Main Activity Heatmap Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0, type: "spring", bounce: 0 }}
          >
            <SpotlightCard className="p-6">
              {/* Header stats strip */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                    <GitCommit size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Contributions
                    </div>
                    <div className="text-sm font-semibold text-zinc-200">
                      586 Commits & Pull Requests
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
                  <div>
                    <span className="text-zinc-500">REPOS:</span>{" "}
                    <span className="text-zinc-200 font-semibold">9</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">PEAK:</span>{" "}
                    <span className="text-emerald-400 font-semibold">112 / day</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-zinc-500">PRIMARY:</span>{" "}
                    <span className="text-zinc-200 font-semibold">Python · TS</span>
                  </div>
                </div>
              </div>

              {/* GitHub Contribution Heatmap */}
              <GithubCalendar />
            </SpotlightCard>
          </motion.div>

          {/* Featured Repositories Sub-grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRepos.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.1,
                  type: "spring",
                  bounce: 0,
                }}
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <SpotlightCard className="p-5 h-full flex flex-col justify-between transition-colors group-hover:border-zinc-700">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <Terminal size={14} className="text-zinc-400" />
                          <span className="font-mono text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                            {repo.name}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-zinc-600 transition-transform group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2 mb-4">
                        {repo.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: repo.langColor }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star size={12} />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
