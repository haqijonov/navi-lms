"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Lock,
  Star,
  Clock,
  Video,
  BookOpen,
  Code,
  CarFront,
  ChevronRight,
} from "lucide-react";

// Mock data for demonstration
const mockLessons = [
  {
    id: 1,
    order: 1,
    title: "Introduction to Variables",
    status: "completed",
    isMilestone: false,
    duration: "12 min",
    type: "video",
  },
  {
    id: 2,
    order: 2,
    title: "Understanding Data Types",
    status: "completed",
    isMilestone: false,
    duration: "15 min",
    type: "theory",
  },
  {
    id: 3,
    order: 3,
    title: "Operators and Expressions",
    status: "completed",
    isMilestone: false,
    duration: "18 min",
    type: "practice",
  },
  {
    id: 4,
    order: 4,
    title: "Control Flow Basics",
    status: "current",
    isMilestone: false,
    duration: "20 min",
    type: "video",
  },
  {
    id: 5,
    order: 5,
    title: "Loops and Iteration",
    status: "locked",
    isMilestone: false,
    duration: "22 min",
    type: "practice",
  },
  {
    id: 6,
    order: 6,
    title: "First Project Challenge",
    status: "locked",
    isMilestone: true,
    duration: "45 min",
    type: "project",
  },
  {
    id: 7,
    order: 7,
    title: "Functions Deep Dive",
    status: "locked",
    isMilestone: false,
    duration: "25 min",
    type: "video",
  },
  {
    id: 8,
    order: 8,
    title: "Arrays and Collections",
    status: "locked",
    isMilestone: false,
    duration: "20 min",
    type: "theory",
  },
  {
    id: 9,
    order: 9,
    title: "Object-Oriented Basics",
    status: "locked",
    isMilestone: false,
    duration: "30 min",
    type: "video",
  },
  {
    id: 10,
    order: 10,
    title: "Working with APIs",
    status: "locked",
    isMilestone: false,
    duration: "28 min",
    type: "practice",
  },
  {
    id: 11,
    order: 11,
    title: "Error Handling",
    status: "locked",
    isMilestone: false,
    duration: "18 min",
    type: "theory",
  },
  {
    id: 12,
    order: 12,
    title: "Final Capstone Project",
    status: "locked",
    isMilestone: true,
    duration: "60 min",
    type: "project",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Tooltip rendered in portal (body) so it never clips with road layers */
function LessonTooltip({ open, anchorRect, lesson }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !open || !anchorRect || !lesson) return null;

  const tooltipW = 270;
  const tooltipH = 150;
  const gap = 16;

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  let left = anchorRect.left + anchorRect.width / 2 - tooltipW / 2;
  left = Math.max(12, Math.min(left, viewportW - tooltipW - 12));

  const spaceBelow = viewportH - anchorRect.bottom;
  const spaceAbove = anchorRect.top;

  const shouldShowAbove =
    spaceBelow < tooltipH + gap && spaceAbove > tooltipH + gap;

  let top = shouldShowAbove
    ? anchorRect.top - tooltipH - gap
    : anchorRect.bottom + gap;

  top = Math.max(12, Math.min(top, viewportH - tooltipH - 12));
  const arrowUp = !shouldShowAbove;

  const content = (
    <div
      style={{ position: "fixed", top, left, width: tooltipW, zIndex: 9999 }}
      className="animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="relative rounded-2xl bg-white/98 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_70px_rgba(15,23,42,0.18)] p-4">
        <h4 className="text-sm font-bold text-slate-900 mb-2.5 leading-tight">
          {lesson.title}
        </h4>

        <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {lesson.type === "video" && <Video className="h-3.5 w-3.5" />}
            {lesson.type === "theory" && <BookOpen className="h-3.5 w-3.5" />}
            {lesson.type === "practice" && <Code className="h-3.5 w-3.5" />}
            {lesson.type === "project" && <Star className="h-3.5 w-3.5" />}
            <span className="capitalize">{lesson.type}</span>
          </div>
        </div>

        {lesson.status === "completed" && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 border border-green-200">
            <Check className="h-3 w-3" />
            Completed
          </div>
        )}

        {lesson.status === "current" && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-[#0042FF] text-xs font-semibold px-3 py-1.5 border border-blue-200">
            <CarFront className="h-3 w-3" />
            Continue learning
          </div>
        )}

        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-0 h-0",
            arrowUp
              ? "top-[-9px] border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[9px] border-b-white/98"
              : "bottom-[-9px] border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-white/98"
          )}
        />
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

/** Strong curvy serpentine journey: bottom-left -> top-right */
function buildSerpentinePathPoints({ lessonsCount, width, height, padding }) {
  const pts = [];
  const ampY = Math.max(80, height * 0.16);
  const ampX = Math.max(55, width * 0.04);
  const freq = 2.8;

  for (let i = 0; i < lessonsCount; i++) {
    const t = lessonsCount === 1 ? 0 : i / (lessonsCount - 1);

    const xBase = padding + (width - padding * 2) * t;
    const yBase = height - padding - (height - padding * 2) * t;

    const bendY = Math.sin(t * Math.PI * freq) * ampY;
    const bendX = Math.cos(t * Math.PI * (freq * 0.85)) * ampX;

    const microY = Math.sin(t * Math.PI * 7.5 + 0.7) * 12;
    const microX = Math.cos(t * Math.PI * 6.2 + 0.2) * 10;

    pts.push({
      x: xBase + bendX + microX,
      y: yBase + bendY + microY,
    });
  }
  return pts;
}

/** Convert points to smooth quadratic path */
function pointsToQuadraticPath(points) {
  if (!points?.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const d = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const cx = p0.x + (p1.x - p0.x) * 0.5;
    const cy = p0.y + (p1.y - p0.y) * 0.5;
    d.push(`Q ${cx} ${cy}, ${p1.x} ${p1.y}`);
  }
  return d.join(" ");
}

/** Angle for car direction from neighbors */
function angleFromNeighbors(points, idx) {
  const prev = points[Math.max(0, idx - 1)];
  const next = points[Math.min(points.length - 1, idx + 1)];
  const dx = next.x - prev.x;
  const dy = next.y - prev.y;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export default function Roadmap({ lessons = mockLessons, monthId }) {
  const scrollContainerRef = useRef(null);
  const wrapRef = useRef(null);

  const [wrapW, setWrapW] = useState(0);
  const [hoveredLessonId, setHoveredLessonId] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);

  // Inertia drag refs
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(null);

  // ✅ NEW: drag vs click guard
  const didDragRef = useRef(false);
  const downXRef = useRef(0);

  const safeLessons = useMemo(() => lessons.slice(0, 12), [lessons]);
  const hoveredLesson = safeLessons.find((l) => l.id === hoveredLessonId);
  const current = safeLessons.find((l) => l.status === "current");
  const currentIndex = Math.max(
    0,
    safeLessons.findIndex((l) => l.status === "current")
  );

  // Measure visible width -> allow ONLY max 3 lessons off-screen
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWrapW(entry.contentRect.width);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const CANVAS_H = 560;
  const PAD = 120;
  const spacing = 230;
  const maxOffscreen = 3;
  const extraW = spacing * maxOffscreen;
  const CANVAS_W = Math.max(wrapW || 1100, 1100) + extraW;

  const points = useMemo(() => {
    return buildSerpentinePathPoints({
      lessonsCount: safeLessons.length,
      width: CANVAS_W,
      height: CANVAS_H,
      padding: PAD,
    });
  }, [safeLessons.length, CANVAS_W]);

  const pathD = useMemo(() => pointsToQuadraticPath(points), [points]);

  const completedPathD = useMemo(() => {
    const slice = points.slice(0, Math.min(points.length, currentIndex + 1));
    return pointsToQuadraticPath(slice);
  }, [points, currentIndex]);

  // Auto scroll to current lesson
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const p = points[currentIndex];
    if (!p) return;
    const target = Math.max(0, p.x - el.clientWidth * 0.45);
    el.scrollLeft = target;
  }, [currentIndex, points]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stopInertia = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const startInertia = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    stopInertia();

    const step = () => {
      velocityRef.current *= 0.92;
      if (Math.abs(velocityRef.current) < 0.25) {
        velocityRef.current = 0;
        rafRef.current = null;
        return;
      }
      el.scrollLeft -= velocityRef.current;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // ✅ NEW
    didDragRef.current = false;
    downXRef.current = e.clientX;

    isDownRef.current = true;
    stopInertia();
    el.setPointerCapture?.(e.pointerId);

    startXRef.current = e.clientX;
    scrollLeftRef.current = el.scrollLeft;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;
  };

  const onPointerMove = (e) => {
    const el = scrollContainerRef.current;
    if (!el || !isDownRef.current) return;

    // ✅ NEW: only treat as drag after threshold
    const dxAbs = Math.abs(e.clientX - downXRef.current);
    if (dxAbs > 6) didDragRef.current = true;

    // only prevent default when dragging
    if (didDragRef.current) e.preventDefault();

    const x = e.clientX;
    const dx = x - startXRef.current;
    el.scrollLeft = scrollLeftRef.current - dx;

    const now = performance.now();
    const dt = Math.max(8, now - lastTRef.current);
    const vx = (x - lastXRef.current) / dt;
    velocityRef.current = vx * 18;

    lastXRef.current = x;
    lastTRef.current = now;
  };

  const onPointerUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    startInertia();
  };

  // tooltip close debounce
  const hoverCloseTimer = useRef(null);
  const scheduleClose = () => {
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = setTimeout(() => {
      setHoveredLessonId(null);
      setAnchorRect(null);
    }, 120);
  };
  const cancelClose = () => {
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
  };

  const carPos = points[currentIndex] || points[0];
  const carAngle = angleFromNeighbors(points, currentIndex);

  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-[40px] bg-gradient-to-br from-slate-50/80 to-blue-50/60 backdrop-blur-xl border border-slate-200/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
        {/* Header (unchanged) */}
        <div className="relative z-10 flex items-center justify-between gap-4 px-8 md:px-12 pt-8 md:pt-10 pb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Your Learning Journey
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {current
                ? `Currently on Lesson ${current.order}`
                : "Start your adventure"}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm bg-white/70 rounded-full px-4 py-2 border border-slate-200/60">
              <div className="h-2.5 w-2.5 rounded-full bg-[#0042FF]" />
              <span className="text-slate-700 font-semibold">
                {safeLessons.filter((l) => l.status === "completed").length}/
                {safeLessons.length}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span>Drag to explore</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Road area */}
        <div
          ref={(node) => {
            scrollContainerRef.current = node;
            wrapRef.current = node;
          }}
          className="relative overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none"
          style={{
            height: 600,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Canvas */}
          <div
            className="relative"
            style={{ width: CANVAS_W, height: CANVAS_H }}
          >
            {/* (background / road / car unchanged...) */}

            {/* Road */}
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            >
              <defs>
                <linearGradient
                  id="roadGradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(148,163,184,0.26)" />
                  <stop offset="50%" stopColor="rgba(148,163,184,0.40)" />
                  <stop offset="100%" stopColor="rgba(148,163,184,0.30)" />
                </linearGradient>
                <filter id="roadShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.22" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient
                  id="progress"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(0,66,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(0,66,255,0.9)" />
                </linearGradient>
              </defs>

              <path
                d={pathD}
                fill="none"
                stroke="rgba(15,23,42,0.10)"
                strokeWidth="54"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roadShadow)"
              />
              <path
                d={pathD}
                fill="none"
                stroke="url(#roadGradient)"
                strokeWidth="48"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.62)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeDasharray="18 22"
              />

              {current && (
                <path
                  d={completedPathD}
                  fill="none"
                  stroke="url(#progress)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              )}
            </svg>

            {/* Car on road */}
            {current && carPos && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: carPos.x,
                  top: carPos.y,
                  transform: `translate(-50%, -50%) rotate(${carAngle}deg)`,
                }}
              >
                <div className="relative">
                  <div className="absolute -inset-5 rounded-full bg-[#0042FF]/14 blur-xl" />
                  <div className="h-11 w-11 rounded-full bg-white/85 backdrop-blur border border-slate-200 shadow-lg flex items-center justify-center">
                    <CarFront className="h-5 w-5 text-[#0042FF]" />
                  </div>
                </div>
              </div>
            )}

            {/* ✅ FIXED NAVIGATION NODES */}
            {safeLessons.map((lesson, idx) => {
              const p = points[idx];
              if (!p) return null;

              const isCurrent = lesson.status === "current";
              const isCompleted = lesson.status === "completed";
              const isLocked = lesson.status === "locked";
              const isMilestone = lesson.isMilestone;
              const clickable = !isLocked;

              const nodeSize = isMilestone ? 76 : isCurrent ? 68 : 58;
              const href = monthId
                ? `/lesson/${lesson.id}?tab=video&month=${monthId}`
                : `/lesson/${lesson.id}?tab=video`;

              const NodeContent = (
                <div
                  className={cn(
                    "relative rounded-full flex items-center justify-center transition-all duration-300 border-[3px] border-white shadow-xl",
                    isCompleted &&
                      "bg-gradient-to-br from-[#0042FF] to-[#0033CC]",
                    isCurrent &&
                      "bg-gradient-to-br from-[#0042FF] to-[#0033CC]",
                    isLocked && "bg-gradient-to-br from-slate-300 to-slate-400",
                    clickable &&
                      "cursor-pointer hover:scale-105 hover:-translate-y-1",
                    isCurrent && "scale-110"
                  )}
                  style={{ width: nodeSize, height: nodeSize }}
                >
                  {isCurrent && (
                    <>
                      <div className="absolute -inset-5 rounded-full bg-[#0042FF]/18 blur-2xl animate-pulse" />
                      <div
                        className="absolute -inset-2 rounded-full ring-[3px] ring-[#0042FF]/35 animate-ping"
                        style={{ animationDuration: "2.5s" }}
                      />
                    </>
                  )}

                  {isCompleted && (
                    <Check className="h-8 w-8 text-white" strokeWidth={3} />
                  )}
                  {isCurrent && (
                    <Check className="h-8 w-8 text-white" strokeWidth={3} />
                  )}
                  {isLocked && <Lock className="h-6 w-6 text-slate-700" />}

                  {isMilestone && (
                    <div className="absolute -top-2 -right-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-[3px] border-white shadow-lg p-2">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  )}

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <div
                      className={cn(
                        "text-[12px] font-extrabold rounded-full px-2.5 py-1 shadow-sm border-2 border-white",
                        isCurrent
                          ? "bg-[#0042FF] text-white"
                          : "bg-white text-slate-800"
                      )}
                    >
                      #{lesson.order}
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={lesson.id}
                  className="absolute"
                  style={{
                    left: p.x,
                    top: p.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    {clickable ? (
                      <Link
                        href={href}
                        prefetch={false}
                        className="outline-none block"
                        aria-label={`Open lesson ${lesson.order} video`}
                        // ✅ prevent container drag capture from killing click
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          // do NOT set didDrag here; only the container sets it on move threshold
                        }}
                        // ✅ if user was dragging, cancel navigation
                        onClick={(e) => {
                          if (didDragRef.current) {
                            e.preventDefault();
                            return;
                          }
                        }}
                        // Tooltip triggers (use currentTarget for rect)
                        onMouseEnter={(e) => {
                          cancelClose();
                          setHoveredLessonId(lesson.id);
                          setAnchorRect(
                            e.currentTarget.getBoundingClientRect()
                          );
                        }}
                        onMouseLeave={() => scheduleClose()}
                        onFocus={(e) => {
                          setHoveredLessonId(lesson.id);
                          setAnchorRect(
                            e.currentTarget.getBoundingClientRect()
                          );
                        }}
                        onBlur={() => scheduleClose()}
                        onTouchStart={(e) => {
                          cancelClose();
                          setHoveredLessonId(lesson.id);
                          setAnchorRect(
                            e.currentTarget.getBoundingClientRect()
                          );
                        }}
                        onTouchEnd={() => scheduleClose()}
                      >
                        {NodeContent}
                      </Link>
                    ) : (
                      <div
                        className="block"
                        onMouseEnter={(e) => {
                          // locked: optional tooltip disabled; keep empty or show locked info if you want
                        }}
                      >
                        {NodeContent}
                      </div>
                    )}

                    {isCurrent && (
                      <div className="absolute -top-20 whitespace-nowrap pointer-events-none">
                        <div
                          className="rounded-full bg-gradient-to-r from-[#0042FF] to-[#0033CC] text-white text-xs font-bold px-4 py-2 shadow-xl border-2 border-white animate-bounce"
                          style={{ animationDuration: "2.5s" }}
                        >
                          🎯 You are here
                        </div>
                        <div className="mx-auto mt-1 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-[#0042FF]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tooltip */}
        <LessonTooltip
          open={!!hoveredLessonId}
          anchorRect={anchorRect}
          lesson={hoveredLesson}
        />

        {/* Legend (unchanged) */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200/60 px-8 md:px-12 py-6">
          <LegendItem
            icon={<Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
            label="Completed"
            color="bg-[#0042FF]"
          />
          <LegendItem
            icon={<CarFront className="h-3.5 w-3.5 text-white" />}
            label="Current"
            color="bg-[#0042FF]"
            glow
          />
          <LegendItem
            icon={<Lock className="h-3.5 w-3.5 text-slate-600" />}
            label="Locked"
            color="bg-slate-300"
          />
          <div className="text-xs text-slate-500 italic">
            Hover for details • Drag to scroll
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendItem({ icon, label, color, glow }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <div
        className={cn(
          "relative h-6 w-6 rounded-full flex items-center justify-center border-2 border-white shadow-md",
          color
        )}
      >
        {glow && (
          <div className="absolute -inset-1 rounded-full bg-[#0042FF]/20 blur-sm" />
        )}
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
}
