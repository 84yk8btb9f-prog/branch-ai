'use client';

import { useState, useCallback } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Copy, Check, Terminal, GitFork, GitCompare, ArrowUpRight } from 'lucide-react';

const MONO = 'var(--font-geist-mono), monospace';
const DISPLAY = 'var(--font-geist-sans), sans-serif';

/* Accent — interaction only (primary CTA, links, active states). */
const ACCENT = '#006bff';

const DEMO_URL = 'https://branchai-fawn.vercel.app';
const GITHUB_URL = 'https://github.com/nikolas-sapa/branch-ai';
const NPM_URL = 'https://www.npmjs.com/package/branch-ai';

function fallbackCopy(text: string) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 78% 55% at 50% 0%, #000 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 55% at 50% 0%, #000 25%, transparent 78%)',
        }}
      />
    </div>
  );
}

function BlurIn({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h1 className={className} style={{ fontFamily: DISPLAY }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mr-[0.26em] inline-block"
        >
          {w}
        </motion.span>
      ))}
    </h1>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    try {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } catch {
      fallbackCopy(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={copy}
      style={{ fontFamily: MONO, color: copied ? ACCENT : undefined }}
      className="border border-[#2e2e2e] rounded-[6px] px-2 py-1 text-[11px] cursor-pointer transition-all tracking-[0.04em] text-[#8f8f8f] hover:text-[#ededed] hover:border-[#4d4d4d] flex items-center gap-1.5"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'copied' : 'copy'}
    </button>
  );
}

function DemoButton({ children = 'View live demo' }: { children?: string }) {
  return (
    <a
      href={DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFamily: DISPLAY }}
      className="inline-flex items-center gap-2 rounded-[6px] px-5 py-3 text-[14px] font-semibold text-white bg-[#006bff] hover:bg-[#0059d1] transition-colors"
    >
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}

/* Proof strip — real, verified badges only (npm package + public repo exist). */
const BADGES = [
  { href: NPM_URL, src: 'https://img.shields.io/npm/v/branch-ai?style=flat-square&labelColor=171717&color=4d4d4d', alt: 'branch-ai version on npm' },
  { href: NPM_URL, src: 'https://img.shields.io/npm/dm/branch-ai?style=flat-square&labelColor=171717&color=4d4d4d', alt: 'branch-ai monthly downloads on npm' },
  { href: GITHUB_URL, src: 'https://img.shields.io/github/stars/nikolas-sapa/branch-ai?style=flat-square&labelColor=171717&color=4d4d4d', alt: 'GitHub stars for nikolas-sapa/branch-ai' },
];

const FEATURES = [
  { num: '01', name: 'Navigate', icon: Terminal, desc: 'Every reasoning step is a node. Click any point in the tree to inspect, copy, or continue from there.' },
  { num: '02', name: 'Fork', icon: GitFork, desc: 'Branch from any node. Inject a new fact mid-thought. See how the conclusion changes without starting over.' },
  { num: '03', name: 'Compare', icon: GitCompare, desc: 'Diff two runs side by side. Same prompt, different assumptions — what changed?' },
];

const CLI_CHIPS = ['Claude Code', 'OpenAI Codex', 'Google Gemini CLI', 'Factory.ai Droid'];

const WAYS = [
  { tag: 'CLI', title: "branch 'prompt'", desc: 'Captures the full reasoning tree in your terminal. Navigate it without leaving your workflow.' },
  { tag: 'MCP', title: 'MCP server', desc: 'Claude Code agents externalize their own reasoning. Branch intercepts and stores every step automatically.' },
  { tag: 'Web', title: 'Web viewer', desc: 'Share trees with your team. Public or private. Persistent links, no setup required.' },
];

const TERMINAL_LINES = [
  [{ text: 'npm', color: '#ededed' }, { text: ' install -g branch-ai', color: '#a8a8a8' }],
  [{ text: 'branch', color: '#ededed' }, { text: ' "explain why this query is slow"', color: '#a8a8a8' }],
  [{ text: 'branch', color: '#ededed' }, { text: ' doctor', color: '#a8a8a8' }, { text: '  # check which CLIs are available', color: '#7d7d7d' }],
];

function InstallSnippet() {
  return (
    <div className="flex items-center gap-3 bg-[#171717] border border-[#2e2e2e] rounded-[6px] px-4 py-3 transition-colors hover:border-[#4d4d4d]">
      <code style={{ fontFamily: MONO }} className="text-[14px] text-[#ededed] tracking-[-0.01em]">npm install -g branch-ai</code>
      <CopyBtn text="npm install -g branch-ai" />
    </div>
  );
}

export default function BranchAILanding() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#ededed] antialiased selection:bg-[#006bff]/30 selection:text-white">
      <Backdrop />

      {/* Nav */}
      <nav className="sticky top-0 z-[100] border-b border-[#2e2e2e]/60 px-8 py-4 flex items-center justify-between bg-[#0a0a0a]/70 backdrop-blur-xl">
        <div style={{ fontFamily: MONO }} className="text-[14px] font-semibold tracking-[-0.02em] text-[#ededed]">
          branch ai
        </div>
        <ul className="flex gap-7 list-none">
          {([['#problem', 'problem'], ['#features', 'features'], ['#install', 'install'], [GITHUB_URL, 'github ↗']] as const).map(
            ([href, label]) => (
              <li key={href}>
                <a href={href} style={{ fontFamily: MONO }} className="text-[12px] text-[#8f8f8f] hover:text-[#ededed] transition-colors tracking-[0.03em]">{label}</a>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Hero */}
      <section className="py-[104px] max-w-[920px] mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-[#2e2e2e] bg-[#171717] px-3 py-1 text-[11px] tracking-[0.12em] uppercase text-[#8f8f8f] mb-7" style={{ fontFamily: MONO }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8f8f8f]" />
          reasoning trees for AI CLIs
        </motion.div>

        <BlurIn
          text="See how your AI actually reasoned."
          className="font-semibold text-[clamp(36px,6vw,64px)] leading-[1.05] tracking-[-0.03em] text-[#ededed] mb-6 max-w-[780px]"
        />
        <p className="text-[18px] text-[#8f8f8f] leading-[1.7] max-w-[600px] mb-10">
          Branch captures the extended thinking behind every answer from Claude Code, Codex, Gemini, and Droid —
          as a tree you can navigate, fork from any node, and diff across runs.
        </p>

        <div className="flex items-center gap-5 flex-wrap mb-8">
          <DemoButton />
          <InstallSnippet />
        </div>

        {/* Proof strip */}
        <div className="flex items-center gap-3 flex-wrap mb-16">
          {BADGES.map((b) => (
            <a key={b.src} href={b.href} target="_blank" rel="noopener noreferrer" className="inline-flex opacity-80 hover:opacity-100 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={b.alt} height={20} />
            </a>
          ))}
        </div>

        {/* Reasoning tree — signature element */}
        <motion.div {...reveal}>
          <div className="relative bg-[#171717]/60 border border-[#2e2e2e] rounded-[12px] px-8 py-7 max-w-[600px] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            <div style={{ fontFamily: MONO }} className="text-[11px] text-[#7d7d7d] tracking-[0.08em] uppercase mb-4">// reasoning tree · live</div>
            <pre style={{ fontFamily: MONO, whiteSpace: 'pre', margin: 0 }} className="text-[13px] leading-[1.9] text-[#8f8f8f]">
              <span className="text-[#ededed] font-medium">{'┌─ [root] How should I architect this?'}</span>{'\n'}
              <span className="text-[#4d4d4d]">{'│'}</span>{'\n'}
              <span className="text-[#4d4d4d]">{'│  ├─ '}</span>{'Option A: monolith'}{'\n'}
              <span className="text-[#4d4d4d]">{'│  │'}</span>{'\n'}
              <span className="text-[#4d4d4d]">{'│  │   └─ '}</span><span className="font-medium text-[#ededed]">{'[fork]'}</span>{' What if the team scales?'}{'\n'}
              <span className="text-[#4d4d4d]">{'│  │         ├─ '}</span>{'introduce service boundaries early'}{'\n'}
              <span className="text-[#4d4d4d]">{'│  │         └─ '}</span>{'refactor later (tech debt)'}{'\n'}
              <span className="text-[#4d4d4d]">{'│  │'}</span>{'\n'}
              <span className="text-[#4d4d4d]">{'│  └─ '}</span>{'Option B: services '}<span className="text-[#ededed]">{'← you are here'}</span>{'\n'}
              <span className="text-[#4d4d4d]">{'│        ├─ '}</span>{'define contracts first'}{'\n'}
              <span className="text-[#4d4d4d]">{'│        └─ '}</span>{'deploy independently'}
            </pre>
          </div>
        </motion.div>
      </section>

      {/* Problem */}
      <section id="problem" className="py-[80px] border-y border-[#2e2e2e]/60">
        <motion.div {...reveal} className="max-w-[920px] mx-auto px-8">
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(24px, 3.5vw, 36px)' }} className="font-semibold leading-[1.15] tracking-[-0.03em] text-[#ededed] mb-5">
            The answer arrives.<br />The thinking is already gone.
          </h2>
          <p className="text-[18px] text-[#8f8f8f] leading-[1.7] max-w-[620px] border-l-2 border-[#2e2e2e] pl-6">
            When an AI works through a hard problem, the reasoning disappears the moment you read the output.
            You get a wall of text you can&apos;t trace.{' '}
            <strong className="text-[#ededed] font-medium">If the answer is wrong, you start over. If it&apos;s right, you don&apos;t know why.</strong>
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-[80px] border-b border-[#2e2e2e]/60">
        <div className="max-w-[920px] mx-auto px-8">
          <motion.h2 {...reveal} style={{ fontFamily: DISPLAY, fontSize: 'clamp(24px, 3.5vw, 36px)' }} className="font-semibold leading-[1.15] tracking-[-0.03em] text-[#ededed] mb-12">
            Every step. Inspectable.<br />Forkable. Comparable.
          </motion.h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.num} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
                  <div className="group relative h-full bg-[#171717]/60 border border-[#2e2e2e] rounded-[12px] p-7 transition-all hover:-translate-y-1 hover:border-[#4d4d4d] overflow-hidden">
                    <span className="grid place-items-center w-9 h-9 rounded-[6px] border border-[#2e2e2e] bg-[#171717] text-[#ededed] mb-4">
                      <Icon size={16} />
                    </span>
                    <div style={{ fontFamily: MONO }} className="text-[11px] text-[#7d7d7d] tracking-[0.08em] mb-1.5">{f.num}</div>
                    <div style={{ fontFamily: DISPLAY }} className="text-[19px] font-semibold mb-2.5 tracking-[-0.02em] text-[#ededed]">{f.name}</div>
                    <p className="text-[14px] text-[#8f8f8f] leading-[1.6]">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported CLIs */}
      <section className="py-[80px] border-b border-[#2e2e2e]/60">
        <motion.div {...reveal} className="max-w-[920px] mx-auto px-8">
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(22px, 2.8vw, 30px)' }} className="font-semibold tracking-[-0.03em] text-[#ededed] mb-8">Works where you already work.</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {CLI_CHIPS.map((cli) => (
              <div key={cli} style={{ fontFamily: MONO }} className="text-[13px] text-[#8f8f8f] bg-[#171717] border border-[#2e2e2e] rounded-[6px] px-4 py-2 hover:border-[#4d4d4d] hover:text-[#ededed] transition-colors">{cli}</div>
            ))}
          </div>
          <p style={{ fontFamily: MONO }} className="text-[13px] text-[#7d7d7d]">
            Uses your existing CLI auth. <span className="text-[#ededed]">No API keys needed.</span>
          </p>
        </motion.div>
      </section>

      {/* Three ways */}
      <section className="py-[80px] border-b border-[#2e2e2e]/60">
        <div className="max-w-[920px] mx-auto px-8">
          <motion.h2 {...reveal} style={{ fontFamily: DISPLAY, fontSize: 'clamp(22px, 2.8vw, 30px)' }} className="font-semibold tracking-[-0.03em] text-[#ededed] mb-10">Terminal. Agent. Team.</motion.h2>
          <div className="flex flex-col">
            {WAYS.map((way, i) => (
              <motion.div key={way.tag} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }}>
                <div className={`flex items-start gap-5 bg-[#171717]/60 border border-[#2e2e2e] px-6 py-5 hover:bg-[#171717] transition-colors ${i === 0 ? 'rounded-t-[6px]' : i === WAYS.length - 1 ? 'rounded-b-[6px] border-t-0' : 'border-t-0'}`}>
                  <span style={{ fontFamily: MONO }} className="text-[11px] rounded-[6px] px-2.5 py-0.5 whitespace-nowrap shrink-0 mt-0.5 tracking-[0.04em] uppercase bg-[#171717] border border-[#2e2e2e] text-[#8f8f8f]">{way.tag}</span>
                  <div>
                    <div style={{ fontFamily: MONO }} className="text-[14px] text-[#ededed] font-medium mb-1">{way.title}</div>
                    <p className="text-[13px] text-[#8f8f8f]">{way.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="py-[80px] border-b border-[#2e2e2e]/60">
        <div className="max-w-[920px] mx-auto px-8">
          <motion.h2 {...reveal} style={{ fontFamily: DISPLAY, fontSize: 'clamp(22px, 2.8vw, 30px)' }} className="font-semibold tracking-[-0.03em] text-[#ededed] mb-10">Three lines to get started.</motion.h2>
          <motion.div {...reveal}>
            <div className="bg-[#171717] border border-[#2e2e2e] rounded-[12px] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="bg-[#0a0a0a]/40 border-b border-[#2e2e2e] px-4 py-2.5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2e2e2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2e2e2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2e2e2e]" />
              </div>
              <div style={{ fontFamily: MONO }} className="px-8 py-7 text-[14px] leading-[2]">
                {TERMINAL_LINES.map((parts, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="select-none text-[#7d7d7d]">$</span>
                    <span>{parts.map((p, j) => (<span key={j} style={{ color: p.color }}>{p.text}</span>))}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-[96px] border-b border-[#2e2e2e]/60">
        <motion.div {...reveal} className="max-w-[920px] mx-auto px-8 text-center">
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(24px, 3.5vw, 36px)' }} className="font-semibold leading-[1.15] tracking-[-0.03em] text-[#ededed] mb-4">
            Stop guessing why the answer changed.
          </h2>
          <p className="text-[16px] text-[#8f8f8f] leading-[1.7] max-w-[520px] mx-auto mb-10">
            Open a real reasoning tree in the live demo, or install the CLI and capture your own.
          </p>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <DemoButton />
            <InstallSnippet />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12">
        <div className="max-w-[920px] mx-auto px-8 flex items-center justify-between flex-wrap gap-4">
          <div style={{ fontFamily: MONO }} className="text-[13px] text-[#7d7d7d]">
            branch ai
          </div>
          <ul className="flex gap-6 list-none items-center">
            <li><a href={GITHUB_URL} style={{ fontFamily: MONO }} className="text-[12px] text-[#8f8f8f] hover:text-[#ededed] transition-colors">GitHub ↗</a></li>
            <li><a href={NPM_URL} style={{ fontFamily: MONO }} className="text-[12px] text-[#8f8f8f] hover:text-[#ededed] transition-colors">npm ↗</a></li>
            <li><span style={{ fontFamily: MONO }} className="text-[11px] text-[#7d7d7d] rounded-[6px] px-2.5 py-0.5 bg-[#171717] border border-[#2e2e2e]">MIT</span></li>
          </ul>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
