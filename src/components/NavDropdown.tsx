import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  title: string;
  path: string;
  items: { name: string; path: string; desc?: string }[];
  isActive: boolean;
  isSpecial?: boolean;
}

export function NavDropdown({ title, path, items, isActive, isSpecial }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1">
        <Link
          to={path}
          className={cn(
            "text-sm font-medium tracking-wide transition-all hover:text-brand-accent py-2 flex items-center gap-1",
            isActive ? "text-brand-accent" : "text-gray-300",
            isSpecial && "px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
          )}
        >
          {isSpecial && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1" />}
          {title}
          <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 p-2 bg-brand-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[60]"
          >
            <div className="flex flex-col gap-1">
              <Link
                to={path}
                className="flex flex-col p-3 rounded-xl hover:bg-brand-accent/10 border border-transparent hover:border-brand-accent/20 transition-all group"
              >
                <span className="text-sm font-bold text-brand-accent">
                  Alle {title} (Übersicht)
                </span>
              </Link>
              <div className="h-px bg-white/5 my-1 mx-2" />
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                    {item.name}
                  </span>
                  {item.desc && (
                    <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
