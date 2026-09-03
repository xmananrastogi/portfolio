import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex w-full justify-start pt-10 md:pt-20 md:gap-10">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-8 w-8 items-center justify-center rounded-full bg-black md:left-3">
                <div className="h-3 w-3 rounded-full border border-zinc-700 bg-zinc-800" />
              </div>
              <h3 className="hidden text-xl font-bold text-zinc-400 md:block md:pl-20 md:text-3xl lg:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-16 pr-4 md:pl-4">
              <h3 className="mb-4 block text-xl font-bold text-zinc-400 md:hidden text-left">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        
        {/* The Track */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-[1.1rem] top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-zinc-800 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-[1.1rem]"
        >
          {/* The Animated Line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-zinc-200 via-zinc-400 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
