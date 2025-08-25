"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChartBar, FaSearch, FaUsers } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { MdBolt } from "react-icons/md";
import { VscRocket, VscSparkleFilled } from "react-icons/vsc";

interface MousePositionProps {
  x: number;
  y: number;
}

export default function IndexPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [downloads, setDownloads] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePositionProps>({
    x: 50,
    y: 30,
  });

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setMounted(true);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === "undefined") return;
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNpmData() {
      const downloadsRes = await fetch(
        "https://api.npmjs.org/downloads/point/last-month/multi.dbx"
      );
      const downloadsData = await downloadsRes.json();
      setDownloads(downloadsData.downloads);

      const versionRes = await fetch(
        "https://registry.npmjs.org/multi.dbx/latest"
      );
      const versionData = await versionRes.json();
      setVersion(versionData.version);
    }

    fetchNpmData();
  }, []);

  const containerStyle = {
    background: `radial-gradient(ellipse 80% 60% at ${mousePosition.x}% ${
      mousePosition.y * 0.3
    }%, rgba(255, 255, 255, 0.12), transparent 70%),
      radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 60%),
      #000000`,
    transition: "background 2s ease-out",
  };

  const gridStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
    backgroundSize: "80px 80px",
    transform: `translate(${mousePosition.x * 0.02}px, ${
      mousePosition.y * 0.02
    }px)`,
    animation: "gridFloat 20s linear infinite",
  };

  return (
    <div
      className={`min-h-screen w-full relative bg-black overflow-hidden ${
        !isMobile ? "cursor-none" : ""
      }`}
    >
      {mounted && !isMobile && (
        <div
          className="fixed w-6 h-6 bg-white/80 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
          style={{
            left: `${(mousePosition.x * window.innerWidth) / 100}px`,
            top: `${(mousePosition.y * window.innerHeight) / 100}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      <style jsx>{`
        @keyframes gridFloat {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 15px);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px);
            opacity: 0.8;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes scroll {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }
        .float-dot {
          animation: float 4s ease-in-out infinite;
        }
        .pulse-border {
          animation: pulse 3s ease-in-out infinite;
        }
        .scroll-dot {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 z-0" style={containerStyle} />
      <div className="absolute inset-0 z-0 opacity-30" style={gridStyle} />

      <div className="absolute inset-0 z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full float-dot"
            style={{
              left: `${15 + i * 8}%`,
              top: `${20 + ((i * 7) % 60)}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `translateX(${
                mousePosition.x * 0.01 * (i % 2 === 0 ? 1 : -1)
              }px)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
        <div
          className="text-[15rem] md:text-[25rem] lg:text-[30rem] font-bold text-white/5 select-none"
          style={{ opacity: 1, transition: "opacity 2s ease-out 0.5s" }}
        >
          DOCS
        </div>
      </div>

      <div className="relative z-20">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-20">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 border-2 border-white/20 rounded-lg flex items-center justify-center mr-3">
                  <IoBookSharp color="white" />
                </div>
                <span className="text-lg font-light text-white/60">
                  Documentation Kit
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9] text-center">
                Build Better
                <br />
                <span className="text-white/60">Documentation</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed text-center">
                Create stunning documentation sites with modern design, powerful
                features, and developer-friendly tools. Ship faster, document
                better.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={"/docs"}>
                <button
                  className={`px-8 py-4 bg-white text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 active:scale-95 ${
                    !isMobile ? "cursor-none" : ""
                  }`}
                >
                  Get Started
                </button>
              </Link>

              <Link href={"https://www.npmjs.com/package/multi.dbx"}>
                <button
                  className={`px-8 py-4 bg-white text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 active:scale-95 ${
                    !isMobile ? "cursor-none" : ""
                  }`}
                >
                  Npm
                </button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mt-16 pt-12 border-t border-gray-800">
              {[
                { number: downloads ?? "Loading...", label: "Downloads" },
                { number: version ?? "Loading...", label: "Version" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 flex justify-center pb-8 top-10">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pulse-border">
            <div className="w-1 h-3 bg-white rounded-full mt-2 scroll-dot" />
          </div>
        </div>



        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Join thousands of developers who trust our platform for their
              documentation needs. Start building better docs today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className={`px-12 py-6 bg-white text-black rounded-lg font-semibold text-xl hover:scale-105 hover:shadow-xl hover:shadow-white/30 transition-all duration-300 active:scale-95 ${
                  !isMobile ? "cursor-none" : ""
                }`}
              >
                Start Building Now
              </button>
              <button
                className={`px-12 py-6 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold text-xl hover:border-white hover:text-white hover:scale-105 transition-all duration-300 active:scale-95 ${
                  !isMobile ? "cursor-none" : ""
                }`}
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        <footer className="py-16 px-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 border-2 border-white/30 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-xl font-semibold text-white">
                    DocKit
                  </span>
                </div>
                <p className="text-gray-400">
                  Build better documentation with modern tools and beautiful
                  design.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/docs"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Guides
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/Epe2t7YWqq"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 DocKit. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
