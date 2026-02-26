import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Activity, Zap, Shield, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    label: "Performance Boost",
    value: "98%",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: "Security Score",
    value: "100%",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    label: "Uptime Reliability",
    value: "99.9%",
    icon: <Activity className="w-5 h-5" />,
  },
];

export default function App() {
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroTextRef2 = useRef(null);
  const statsRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(
    () => {
      // ===== LOADER ANIMATION =====
      const path = document.querySelector("#svg path");

      if (path) {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const loaderTL = gsap.timeline();

        loaderTL
          .to(path, {
            strokeDashoffset: 0,
            duration: 10,
            ease: "power2.out",
          })
          .fromTo(
            ".logo-name",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 3, ease: "power2.out" },
            "-=9",
          )
          .to(
            ".loading-page",
            {
              opacity: 0,
              duration: 1.5,
            },
            "-=6.8",
          )
          .set(".loading-page", { display: "none" });
      }

      // Initial Load Animation
      const tl = gsap.timeline({ delay: 4.5 });

      tl.from(heroTextRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          heroTextRef2.current,
          {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8",
        )
        .from(
          ".stat-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )
        .from(
          ".scroll-indicator",
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.4",
        );

      tl.from(
        visualRef.current,
        {
          x: "-40vw",
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
        },
        0.6,
      );

      // Scroll Animation - Car Movement
      if (carRef.current && containerRef.current) {
        gsap.to(carRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
          x: "80vw",
          // rotation: 10,
          scale: 1.0,
          ease: "none",
        });
      }
      gsap.to(visualRef.current, {
        x: "90vw",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Custom Cursor Movement
      let mouseX = 0;
      let mouseY = 0;

      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursorRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.1,
          ease: "power3.out",
        });
      });

      // Smooth follower (lerp effect)
      gsap.ticker.add(() => {
        gsap.to(cursorFollowerRef.current, {
          x: mouseX - 20,
          y: mouseY - 20,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      const interactiveElements = document.querySelectorAll("button, .group");

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursorFollowerRef.current, {
            scale: 1.8,
            borderColor: "#3b82f6",
            duration: 0.3,
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(cursorFollowerRef.current, {
            scale: 1,
            borderColor: "#ffffff",
            duration: 0.3,
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <style>{`
       /* Car glow */
        .car-image {
          filter: drop-shadow(0 6px 30px rgba(200,255,0,0.3))
                  drop-shadow(0 0 100px rgba(200,255,0,0.08));
        }

        @media (max-width: 1056px) {
          .logoname {
           display: none;
            } 
          }
        }
    `}</style>

      <div
        ref={containerRef}
        className="relative min-h-[300vh] bg-[#050505] text-white font-sans selection:bg-blue-500/30 cursor-none"
      >
        {/* Loading Screen */}
        <div className="loading-page fixed inset-0 bg-black flex flex-col items-center justify-center gap-6 z-9999">
          <svg
            id="svg"
            viewBox="0 0 512 512"
            className="w-32 h-32 stroke-white fill-transparent stroke-3"
          >
            <path d="M415.44 512h-95.11L212.12 357.46v91.1L125.69 512H28V29.82L68.47 0h108.05l123.74 176.13V63.45L386.69 0h97.69v461.5zM38.77 35.27V496l72-52.88V194l215.5 307.64h84.79l52.35-38.17h-78.27L69 13zm82.54 466.61l80-58.78v-101l-79.76-114.4v220.94L49 501.89h72.34zM80.63 10.77l310.6 442.57h82.37V10.77h-79.75v317.56L170.91 10.77zM311 191.65l72 102.81V15.93l-72 53v122.72z" />
          </svg>

          <div className="logo-name text-white tracking-[12px] uppercase text-4xl font-light">
            ITZFIZZ
          </div>
        </div>
        {/* Hero Section */}
        <section className="bg-[#f2f0eb] relative h-screen flex flex-col items-center justify-center z-10 px-4 overflow-hidden">
          <div className="absolute top-10 left-10 flex items-center gap-2">
            <img
              className="w-32 h-8 logoname"
              src="/black_logoitzfizz@2x.webp"
              alt="ITZ FIZZ Logo"
            />
          </div>

          <div className="text-5xl md:text-8xl font-extrabold tracking-[0.3em] uppercase text-center leading-tight">
            <div
              ref={heroTextRef}
              className="text-transparent bg-clip-text bg-linear-to-r from-black to-black border-black"
            >
              W E L C O M E
            </div>
            <div
              ref={heroTextRef2}
              className="text-transparent bg-clip-text bg-black/5 bg-linear-to-r from-gray-500 to-black border-[3px] border-black"
            >
              I T Z F I Z Z
            </div>
          </div>

          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-item group p-6 rounded-2xl border border-black/25 bg-black/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2 text-black">
                  {stat.icon}
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">
                    {stat.label}
                  </span>
                </div>
                <div className="text-4xl text-black font-mono font-bold tracking-tighter">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[10px] uppercase tracking-[0.4em]">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </section>

        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
        />

        <div
          ref={cursorFollowerRef}
          className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-9998 mix-blend-difference"
        />

        {/* Scroll Animation Track */}
        <div className="relative h-[450vh] z-20">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            {/* The "Car" or Object */}
            <div
              ref={carRef}
              className="relative left-[-20vw] w-[40vw] max-w-125 aspect-video group cursor-pointer"
            >
              <div
                ref={visualRef}
                className="absolute inset-0 pointer-events-none"
              >
                <img
                  src="/car.png"
                  alt="Visual Element"
                  className="w-full h-full object-contain duration-700 car-image"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold italic tracking-tighter">
                      FIZZ_DRIVE
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full" />
            </div>

            {/* Floating Content during scroll */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 max-w-md text-right pointer-events-none">
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-4 opacity-10 text-stroke">
                Velocity
              </h2>
              <p className="text-sm text-white/40 font-mono leading-relaxed">
                Experience the seamless integration of motion and data. Our
                scroll-driven architecture ensures every interaction feels
                intentional and fluid.
              </p>
            </div>
          </div>
        </div>

        {/* Footer / Final Section */}
        <section className="h-screen flex items-center justify-center bg-[#f2f0eb] text-black z-30 relative">
          <div className="text-center max-w-2xl px-6">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
              Ready to Accelerate?
            </h3>
            <div className="mt-12 pt-12 border-t border-black/10 flex justify-between text-[12px] uppercase tracking-widest font-bold opacity-40">
              <span>© ITZFIZZ</span>
              <span>Built with GSAP & React</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
