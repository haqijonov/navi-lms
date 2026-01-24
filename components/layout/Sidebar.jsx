"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  Radio,
  Database,
  Code,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./AppShell";

const menuItems = [
  {
    type: "group",
    label: "Courses",
    icon: BookOpen,
    children: [
      { href: "/courses", label: "My Courses", icon: GraduationCap },
      { href: "/live", label: "Live", icon: Radio },
    ],
  },
  { href: "/knowledge", label: "Knowledge Base", icon: Database },
  { href: "/practice", label: "Practice", icon: Code },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { isSidebarOpen } = useSidebar();

  // Close mobile menu when sidebar state changes on desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsMobileOpen(false);
    }
  }, [isSidebarOpen]);

  // Auto-open courses group if on courses page
  useEffect(() => {
    if (pathname?.startsWith("/courses") || pathname === "/live") {
      setIsCoursesOpen(true);
    }
  }, [pathname]);

  const renderMenuItem = (item, index) => {
    if (item.type === "group") {
      const Icon = item.icon;
      const isGroupActive = item.children?.some(
        (child) =>
          pathname === child.href ||
          (child.href === "/courses" && pathname?.startsWith("/courses"))
      );

      return (
        <div key={index} className="space-y-1">
          {/* Group Header */}
          <button
            onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-sm",
              isGroupActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              !isSidebarOpen && "lg:justify-center lg:px-3"
            )}
            title={!isSidebarOpen ? item.label : undefined}
          >
            <Icon size={20} className="flex-shrink-0" />
            {isSidebarOpen && (
              <>
                <span className="flex-1 text-left animate-in fade-in duration-300">
                  {item.label}
                </span>
                {isCoursesOpen ? (
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                  />
                ) : (
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-200"
                  />
                )}
              </>
            )}
          </button>

          {/* Group Children */}
          {isSidebarOpen && (
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isCoursesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="ml-7 space-y-1 pt-1">
                {item.children?.map((child, childIndex) => {
                  const ChildIcon = child.icon;
                  const isActive =
                    pathname === child.href ||
                    (child.href === "/courses" &&
                      pathname?.startsWith("/courses"));

                  return (
                    <Link
                      key={childIndex}
                      href={child.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        "hover:scale-[1.02] hover:shadow-sm",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <ChildIcon size={18} className="flex-shrink-0" />
                      <span>{child.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Regular menu item
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link
        key={index}
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
          "hover:scale-[1.02] hover:shadow-sm",
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          !isSidebarOpen && "lg:justify-center lg:px-3"
        )}
        title={!isSidebarOpen ? item.label : undefined}
      >
        <Icon size={20} className="flex-shrink-0" />
        {isSidebarOpen && (
          <span className="animate-in fade-in duration-300">{item.label}</span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-full glass-strong shadow-md hover:shadow-lg transition-all"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 glass-strong border-r border-slate-200/50 transition-all duration-300 ease-in-out",
          "lg:w-64",
          isSidebarOpen ? "lg:w-64" : "lg:w-20",
          isMobileOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col z-50 h-full p-6">
          {/* Logo */}
          <div
            className={cn(
              "mb-8 transition-all duration-300",
              !isSidebarOpen && "lg:flex lg:justify-center"
            )}
          >
            <img
              src="/Logo 1@2x-8 (1).png"
              className={cn(
                "text-2xl font-bold text-primary transition-all duration-300",
                !isSidebarOpen && "lg:text-xl lg:text-center"
              )}
              alt=""
              width={100}
            />
            {isSidebarOpen && (
              <p className="text-xs text-slate-500 mt-1 animate-in fade-in duration-300">
                Learning Platform
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </nav>
        </div>
      </aside>
    </>
  );
}
