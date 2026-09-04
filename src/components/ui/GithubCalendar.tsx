"use client";

import React, { useMemo, useState } from "react";
import fallbackData from "../../data/githubContributions.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GithubCalendarProps {
  username?: string;
  className?: string;
}

export const GithubCalendar: React.FC<GithubCalendarProps> = ({
  className = "",
}) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Use the cached real contributions data from GitHub
  const data = fallbackData as {
    total: { lastYear: number };
    contributions: ContributionDay[];
  };

  // Group into weeks (7 days per column)
  const weeks = useMemo(() => {
    const raw = data.contributions;
    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    raw.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === raw.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, [data.contributions]);

  // GitHub level colors matching the dark zinc theme
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border-[#0e4429]";
      case 2:
        return "bg-[#006d32] border-[#006d32]";
      case 3:
        return "bg-[#26a641] border-[#26a641]";
      case 4:
        return "bg-[#39d353] border-[#39d353]";
      default:
        return "bg-zinc-900 border-zinc-800/80 hover:border-zinc-700";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`w-full overflow-x-auto select-none ${className}`}>
      <div className="min-w-[680px]">
        {/* Days of week + Heatmap Grid */}
        <div className="flex gap-1 items-start">
          {/* Weekday indicators */}
          <div className="flex flex-col gap-1 pr-2 text-[9px] font-mono text-zinc-500 pt-3">
            <span className="h-[11px] leading-[11px]">Mon</span>
            <span className="h-[11px] leading-[11px] opacity-0">Tue</span>
            <span className="h-[11px] leading-[11px]">Wed</span>
            <span className="h-[11px] leading-[11px] opacity-0">Thu</span>
            <span className="h-[11px] leading-[11px]">Fri</span>
            <span className="h-[11px] leading-[11px] opacity-0">Sat</span>
            <span className="h-[11px] leading-[11px] opacity-0">Sun</span>
          </div>

          {/* Grid columns */}
          <div className="flex gap-[3px] flex-1">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPos({
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      });
                      setHoveredDay(day);
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`size-[11px] rounded-[2px] border transition-transform hover:scale-125 hover:z-20 cursor-pointer ${getCellColor(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
          <div className="font-mono text-[11px]">
            <span className="text-zinc-300 font-semibold">{data.total.lastYear}</span> contributions in the last year
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            <div className="flex gap-1 items-center">
              <span className="size-2.5 rounded-[2px] bg-zinc-900 border border-zinc-800" />
              <span className="size-2.5 rounded-[2px] bg-[#0e4429]" />
              <span className="size-2.5 rounded-[2px] bg-[#006d32]" />
              <span className="size-2.5 rounded-[2px] bg-[#26a641]" />
              <span className="size-2.5 rounded-[2px] bg-[#39d353]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: "fixed",
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translate(-50%, -100%)",
          }}
          className="pointer-events-none z-50 whitespace-nowrap rounded-md border border-zinc-800 bg-zinc-950/95 px-2.5 py-1 text-[11px] font-mono text-zinc-200 shadow-xl backdrop-blur-md"
        >
          <span className="font-semibold text-emerald-400">
            {hoveredDay.count === 0 ? "No" : hoveredDay.count}
          </span>{" "}
          {hoveredDay.count === 1 ? "contribution" : "contributions"} on{" "}
          <span className="text-zinc-400">{formatDate(hoveredDay.date)}</span>
        </div>
      )}
    </div>
  );
};
