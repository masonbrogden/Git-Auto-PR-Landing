import { useState, useEffect } from 'react'

const MARKETPLACE_URL = 'https://github.com/marketplace/actions/git-auto-pr'
const GITHUB_URL      = 'https://github.com/masonbrogden/Git-Auto-PR'

const YAML_LINES = [
  ['name: PR Review',                                               false],
  ['',                                                              false],
  ['on:',                                                           false],
  ['  pull_request:',                                               false],
  ['    types: [opened, synchronize, reopened]',                    false],
  ['',                                                              false],
  ['jobs:',                                                         false],
  ['  review:',                                                     false],
  ['    runs-on: ubuntu-latest',                                    false],
  ['    permissions:',                                              false],
  ['      pull-requests: write',                                    false],
  ['      contents: read',                                          false],
  ['',                                                              false],
  ['    steps:',                                                    false],
  ['      - uses: actions/checkout@v4',                             false],
  ['',                                                              false],
  ['      - uses: masonbrogden/git-auto-pr@v1',                    true],
  ['        with:',                                                 true],
  ["          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}", true],
]

const CHANGELOG = [
  {
    title: 'Published to GitHub Actions Marketplace',
    desc:  'v1.0.0 live — AI review, linting, and test coverage in one action.',
    date:  'MAY 13, 2025',
    first: true,
  },
  {
    title: 'Structured outputs released',
    desc:  'verdict, coverage_pct, linter_passed, and tests_passed now available for downstream steps.',
    date:  'APR 30, 2025',
    first: false,
  },
  {
    title: 'PostgreSQL logging support',
    desc:  'Pass DATABASE_URL to persist every review for analytics or audit.',
    date:  'APR 23, 2025',
    first: false,
  },
  {
    title: 'Initial public release',
    desc:  'Open source under MIT license. Works on any Python repository.',
    date:  'APR 15, 2025',
    first: false,
  },
]

const FOOTER_COLS = {
  Product: [
    { label: 'Marketplace',   href: MARKETPLACE_URL },
    { label: 'Install',       href: MARKETPLACE_URL },
    { label: 'Changelog',     href: GITHUB_URL + '/releases' },
  ],
  Resources: [
    { label: 'GitHub',        href: GITHUB_URL },
    { label: 'Documentation', href: GITHUB_URL + '#readme' },
    { label: 'MIT License',   href: GITHUB_URL + '/blob/main/LICENSE' },
  ],
  Connect: [
    { label: '@masonbrogden', href: 'https://github.com/masonbrogden' },
    { label: 'GitHub',        href: GITHUB_URL },
    { label: 'Marketplace',   href: MARKETPLACE_URL },
  ],
}

// ── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-12">
      <a href="/" className="flex items-center gap-2 text-white text-sm font-semibold tracking-tight">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="8.5" stroke="white" strokeWidth="1"/>
          <path d="M9 1C9 1 13 5 13 9C13 13 9 17 9 17" stroke="white" strokeWidth="1"/>
          <path d="M1 9H17" stroke="white" strokeWidth="1"/>
          <path d="M2 6H16M2 12H16" stroke="white" strokeWidth="0.75"/>
        </svg>
        Git-Auto-PR
      </a>

      <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
        <a href={GITHUB_URL}      className="hover:text-white transition-colors duration-150">GitHub</a>
        <a href={MARKETPLACE_URL} className="hover:text-white transition-colors duration-150">Marketplace</a>
        <a href="#changelog"      className="hover:text-white transition-colors duration-150">Changelog</a>
        <a href="#connect"        className="hover:text-white transition-colors duration-150">Contact</a>
      </nav>

      <div className="flex items-center gap-5 text-sm">
        <div className="hidden md:block h-4 border-l border-gray-800" />
        <a href={GITHUB_URL} className="hidden md:block text-gray-500 hover:text-white transition-colors duration-150">
          View source
        </a>
        <a
          href={MARKETPLACE_URL}
          className="border border-white text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-white hover:text-black transition-all duration-150"
        >
          Install free
        </a>
      </div>
    </header>
  )
}

// ── PR Review Mockup ──────────────────────────────────────────────────────────

const DIFF_LINES = [
  { type: 'context', text: '  def process_payment(amount):' },
  { type: 'removed', text: '-   conn = db.connect(timeout=None)' },
  { type: 'added',   text: '+   conn = db.connect(timeout=30)' },
  { type: 'context', text: '    result = conn.execute(query)' },
  { type: 'removed', text: '-   conn.close' },
  { type: 'added',   text: '+   conn.close()' },
]

const DIFF_LINE_STYLE = {
  removed: { background: 'rgba(248,81,73,0.1)',  borderLeft: '3px solid rgba(248,81,73,0.5)',  color: '#f85149' },
  added:   { background: 'rgba(63,185,80,0.1)',   borderLeft: '3px solid rgba(63,185,80,0.5)',   color: '#3fb950' },
  context: { borderLeft: '3px solid transparent', color: '#8b949e' },
}

const INLINE_CODE_STYLE = {
  color: '#f0883e', background: 'rgba(240,136,62,0.1)',
  border: '1px solid rgba(240,136,62,0.2)', borderRadius: '3px',
  padding: '1px 5px', fontSize: '11px',
  fontFamily: "'SFMono-Regular', Consolas, monospace",
}

function PRReviewMockup() {
  return (
    <div style={{
      width: '390px',
      background: '#0d1117',
      border: '1px solid #30363d',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 0 80px rgba(34,197,94,0.13), 0 0 28px rgba(34,197,94,0.06), 0 28px 72px rgba(0,0,0,0.9)',
      animation: 'heroFloat 5.5s ease-in-out infinite',
    }}>

      {/* Diff header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: '#161b22', borderBottom: '1px solid #30363d' }}>
        <span style={{ fontSize: '11px', color: '#8b949e', fontFamily: 'monospace' }}>orders/services.py</span>
        <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>
          <span style={{ color: '#3fb950' }}>+2</span>
          <span style={{ color: '#484f58', margin: '0 4px' }}>·</span>
          <span style={{ color: '#f85149' }}>−2</span>
        </span>
      </div>

      {/* Diff lines */}
      <div style={{ padding: '6px 0', fontFamily: "'SFMono-Regular', Consolas, monospace" }}>
        {DIFF_LINES.map((line, i) => (
          <div key={i} style={{ padding: '2px 14px', fontSize: '12px', lineHeight: '1.7', ...DIFF_LINE_STYLE[line.type] }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#30363d' }} />

      {/* Review comment */}
      <div style={{ padding: '14px 16px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #238636, #196c2e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: '700', color: '#fff', letterSpacing: '-0.5px',
          }}>GP</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flex: 1 }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#e6edf3' }}>git-auto-pr</span>
            <span style={{ fontSize: '10px', color: '#8b949e', background: '#21262d', border: '1px solid #30363d', borderRadius: '2px', padding: '0 5px', lineHeight: '18px' }}>bot</span>
            <span style={{ fontSize: '10px', fontWeight: '500', background: 'rgba(210,153,34,0.15)', border: '1px solid rgba(210,153,34,0.4)', color: '#d29922', borderRadius: '12px', padding: '1px 8px' }}>⚠ warning</span>
          </div>
        </div>

        {/* Comment body */}
        <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: '1.7', margin: '0 0 12px 0' }}>
          <code style={INLINE_CODE_STYLE}>timeout=None</code> blocks indefinitely if the DB is unreachable.
          Also, <code style={INLINE_CODE_STYLE}>conn.close</code> is missing parentheses — the connection is never closed.
        </p>

        {/* Suggested fix */}
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ padding: '5px 12px', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', color: '#3fb950' }}>✦</span>
            <span style={{ fontSize: '10px', color: '#8b949e' }}>Suggested fix</span>
          </div>
          <pre style={{ margin: 0, padding: '9px 12px', fontSize: '11.5px', color: '#3fb950', lineHeight: '1.7', fontFamily: "'SFMono-Regular', Consolas, monospace" }}>{`conn = db.connect(timeout=30)\nconn.close()`}</pre>
        </div>

      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative h-screen bg-black flex items-center px-8 md:px-16 overflow-hidden pt-12">
      {/* Left: text */}
      <div className="flex-1 min-w-0 max-w-lg">
        <h1
          className="font-bold text-white leading-[1.08] mb-5"
          style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)', letterSpacing: '-0.03em' }}
        >
          The automated code review system for every pull request.
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          AI review works on any language.
          <br />
          Linting and tests are Python-specific.
        </p>
      </div>

      {/* Right: floating PR mockup */}
      <div className="hidden xl:flex flex-1 items-center justify-center" style={{ zIndex: 1 }}>
        <PRReviewMockup />
      </div>

      <div className="absolute bottom-6 left-8 md:left-16 flex items-center gap-2 text-sm">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: '#5b6af0', boxShadow: '0 0 6px #5b6af0' }}
        />
        <span className="text-gray-500">AI-powered PR reviews</span>
        <a href={MARKETPLACE_URL} className="text-white hover:underline">
          marketplace →
        </a>
      </div>
    </section>
  )
}

// ── Feature section ───────────────────────────────────────────────────────────

function FeatureSection({ number, label, headline, body, children }) {
  return (
    <section className="px-8 md:px-16 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
          <h2
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            {headline}
          </h2>
          <div>
            <p className="text-gray-500 text-base leading-[1.75]">
              {body}
            </p>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-900 bg-[#0c0c0c] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.6)]">
          {children}
        </div>

      </div>
    </section>
  )
}

// ── YAML config block ─────────────────────────────────────────────────────────

function ConfigBlock() {
  return (
    <div>
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-gray-900">
        <div className="flex gap-1.5">
          <span className="block w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="block w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="block w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="text-gray-600 text-xs font-mono">.github/workflows/review.yml</span>
      </div>
      <pre className="font-mono text-sm leading-[1.8] overflow-x-auto py-6 m-0">
        {YAML_LINES.map(([text, hi], i) => (
          <div
            key={i}
            style={hi ? {
              background: 'rgba(34,197,94,0.07)',
              borderLeft: '2px solid rgba(34,197,94,0.5)',
              paddingLeft: '22px',
              marginLeft: '0',
              color: 'rgba(134,239,172,0.85)',
            } : {
              paddingLeft: '24px',
              color: '#4b5563',
            }}
          >
            {text || ' '}
          </div>
        ))}
      </pre>
    </div>
  )
}

// ── Why section ──────────────────────────────────────────────────────────────

const TERM_LINES = [
  { color: '#3fb950', text: 'jordo@Jordans-MBP ~/projects/acme-api git:(feature/auth-fix)' },
  { color: '#e6edf3', text: '$ git add middleware/auth.py tests/test_auth.py' },
  { color: '#3fb950', text: 'jordo@Jordans-MBP ~/projects/acme-api git:(feature/auth-fix) +' },
  { color: '#e6edf3', text: '$ git commit -m "fix(auth): guard against null user in token validation"' },
  { color: '#8b949e', text: '[feature/auth-fix 4a2c1d9] fix(auth): guard against null user in token validation' },
  { color: '#8b949e', text: '2 files changed, 17 insertions(+), 3 deletions(-)' },
  { color: '#e6edf3', text: '$ git push origin feature/auth-fix' },
  { color: '#8b949e', text: 'Enumerating objects: 7, done. Counting objects: 100% (7/7), done.' },
  { color: '#8b949e', text: 'To github.com:acme-eng/acme-api.git' },
  { color: '#3fb950', text: '* [new branch]  feature/auth-fix → feature/auth-fix' },
]

const PR_DIFF = [
  { type: 'hunk',    text: '@@ -24,8 +24,11 @@ def validate_token(user, token):' },
  { type: 'context', text: '   """Validate the user\'s session token."""' },
  { type: 'removed', text: '-  if user.token == token:' },
  { type: 'removed', text: '-    return user' },
  { type: 'added',   text: '+  if user and user.token == token:' },
  { type: 'added',   text: '+    return user' },
  { type: 'added',   text: '+  return None' },
]

function GHCode({ children }) {
  return (
    <code style={{
      color: '#e6edf3', background: '#21262d', border: '1px solid #30363d',
      borderRadius: '4px', padding: '0.1em 0.4em', fontSize: '11.5px',
      fontFamily: "'SFMono-Regular', Consolas, monospace",
    }}>{children}</code>
  )
}

function PRIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#3fb950" style={{ flexShrink: 0, marginTop: '3px' }}>
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"/>
    </svg>
  )
}

function SlackMsg({ initials, color, name, time, children }) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '8px', background: color, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: '700', fontSize: '13px', letterSpacing: '-0.5px',
      }}>{initials}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '3px' }}>
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '14px' }}>{name}</span>
          <span style={{ color: '#9d9d9d', fontSize: '11.5px' }}>{time}</span>
        </div>
        <div style={{ color: '#d1d2d3', fontSize: '14px', lineHeight: '1.55' }}>{children}</div>
      </div>
    </div>
  )
}

function SlackPhase() {
  return (
    <div style={{ display: 'flex', height: '440px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#19171d', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ color: '#fff', fontWeight: '900', fontSize: '15px', marginBottom: '6px' }}>Acme Engineering</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', flexShrink: 0 }} />
            <span style={{ color: '#d1d2d3', fontSize: '12.5px' }}>Mason Brogden</span>
          </div>
        </div>
        <div style={{ padding: '14px 0 8px' }}>
          <div style={{ padding: '0 16px 8px', color: '#9d9d9d', fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Channels</div>
          {['general', 'engineering', 'dev-reviews', 'deployments', 'random'].map(ch => (
            <div key={ch} style={{
              padding: '4px 12px', margin: '1px 4px', borderRadius: '4px', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              color: ch === 'dev-reviews' ? '#fff' : '#d1d2d3',
              background: ch === 'dev-reviews' ? 'rgba(255,255,255,0.13)' : 'transparent',
              fontWeight: ch === 'dev-reviews' ? '700' : '400',
            }}>
              <span># {ch}</span>
              {ch === 'dev-reviews' && (
                <span style={{ background: '#cd2553', color: '#fff', borderRadius: '10px', fontSize: '11px', fontWeight: '700', padding: '1px 6px', minWidth: '18px', textAlign: 'center' }}>2</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1d21', minWidth: 0 }}>
        <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '15px' }}># dev-reviews</span>
          <span style={{ color: '#9d9d9d', fontSize: '13px' }}>— Pull request discussion & code review</span>
        </div>
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
          <SlackMsg initials="JL" color="#4fa3e0" name="Jordan Lee" time="Today at 2:14 PM">
            Hey{' '}
            <span style={{ color: '#1d9bd1', background: 'rgba(29,155,209,0.15)', borderRadius: '3px', padding: '0 4px' }}>@Alex Chen</span>
            {' '}— I just pushed the null-user auth fix to{' '}
            <span style={{ background: 'rgba(255,255,255,0.08)', color: '#e8912d', padding: '1px 5px', borderRadius: '3px', fontSize: '12.5px', fontFamily: 'monospace' }}>feature/auth-fix</span>
            . Would you be able to take a look when you get a chance?
          </SlackMsg>
          <SlackMsg initials="AC" color="#4caf7d" name="Alex Chen" time="Today at 2:17 PM">
            No need to wait on me — open a PR and{' '}
            <span style={{ color: '#1d9bd1', background: 'rgba(29,155,209,0.15)', borderRadius: '3px', padding: '0 4px' }}>@Git-Auto-PR</span>
            {' '}will review it automatically. It runs on every PR and leaves inline comments within seconds. I'll take a final look after.
          </SlackMsg>
          <SlackMsg initials="JL" color="#4fa3e0" name="Jordan Lee" time="Today at 2:18 PM">
            Perfect, opening it now.
          </SlackMsg>
        </div>
        <div style={{ margin: '0 20px 16px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', color: '#9d9d9d', fontSize: '14px' }}>
          Message #dev-reviews
        </div>
      </div>
    </div>
  )
}

function TerminalPhase({ visibleLines }) {
  return (
    <div style={{ height: '440px', background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#3c3c3c', padding: '9px 16px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ flex: 1, textAlign: 'center', color: '#9d9d9d', fontSize: '12px', fontFamily: 'monospace' }}>zsh — project — 80×24</span>
      </div>
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', fontFamily: "'SFMono-Regular', Consolas, monospace" }}>
        {TERM_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: line.color, fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.text}
          </div>
        ))}
        {visibleLines < TERM_LINES.length && <span className="term-cursor" />}
      </div>
    </div>
  )
}

function PRPhase() {
  return (
    <div style={{ height: '440px', background: '#0d1117', overflowY: 'auto', padding: '20px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontSize: '13px', color: '#8b949e' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        <span>acme-eng / acme-api</span>
        <span style={{ color: '#30363d' }}>·</span>
        <span>Pull requests</span>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
          <PRIcon />
          <h3 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: '600', margin: 0, lineHeight: '1.3' }}>
            fix(auth): guard against null user in token validation{' '}
            <span style={{ color: '#8b949e', fontWeight: '400' }}>#47</span>
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', paddingLeft: '26px' }}>
          <span style={{ background: '#196c2e', border: '1px solid #2ea043', color: '#3fb950', borderRadius: '12px', padding: '3px 10px', fontSize: '12px', fontWeight: '500' }}>● Open</span>
          <span style={{ color: '#8b949e' }}>
            jordan-lee wants to merge 1 commit into <span style={{ color: '#58a6ff' }}>main</span> from <span style={{ color: '#58a6ff' }}>feature/auth-fix</span>
          </span>
        </div>
      </div>
      <div style={{ border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{ padding: '8px 14px', background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
          <span style={{ color: '#e6edf3', fontFamily: 'monospace' }}>middleware/auth.py</span>
          <span style={{ fontFamily: 'monospace' }}><span style={{ color: '#3fb950' }}>+17</span> <span style={{ color: '#f85149' }}>-3</span></span>
        </div>
        <div style={{ fontFamily: "'SFMono-Regular', Consolas, monospace", fontSize: '12.5px' }}>
          {PR_DIFF.map((line, i) => (
            <div key={i} style={{
              padding: '2px 14px', lineHeight: '1.7',
              background: line.type === 'removed' ? 'rgba(248,81,73,0.1)' : line.type === 'added' ? 'rgba(63,185,80,0.1)' : line.type === 'hunk' ? 'rgba(88,166,255,0.05)' : 'transparent',
              color: line.type === 'removed' ? '#f85149' : line.type === 'added' ? '#3fb950' : line.type === 'hunk' ? '#79c0ff' : '#8b949e',
              borderLeft: line.type === 'removed' ? '3px solid rgba(248,81,73,0.5)' : line.type === 'added' ? '3px solid rgba(63,185,80,0.5)' : '3px solid transparent',
            }}>{line.text}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', border: '1px solid #30363d', borderRadius: '6px', background: '#161b22' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#58a6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#0d1117', fontSize: '13px', fontWeight: '900', lineHeight: 1 }}>→</span>
        </div>
        <span style={{ color: '#8b949e', fontSize: '14px' }}>
          <span style={{ color: '#e6edf3', fontWeight: '600' }}>git-auto-pr[bot]</span> is reviewing
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '4px', alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#58a6ff', display: 'block', animation: `dotPulse 1.2s ease-in-out ${i * 0.25}s infinite` }} />
          ))}
        </span>
      </div>
    </div>
  )
}

function ReviewPhase() {
  const findings = [
    {
      badge: 'warning', badgeColor: '#d29922', badgeBg: 'rgba(210,153,34,0.15)', borderColor: '#d29922',
      text: <>Line 26 — The original code would throw <GHCode>AttributeError</GHCode> when <GHCode>user</GHCode> is <GHCode>None</GHCode>. The null guard is the correct fix.</>,
    },
    {
      badge: 'suggestion', badgeColor: '#3fb950', badgeBg: 'rgba(63,185,80,0.15)', borderColor: '#3fb950',
      text: <>Consider adding a unit test for the <GHCode>user=None</GHCode> case in <GHCode>tests/test_auth.py</GHCode> to prevent future regressions.</>,
    },
    {
      badge: 'info', badgeColor: '#58a6ff', badgeBg: 'rgba(88,166,255,0.15)', borderColor: '#58a6ff',
      text: <><GHCode>return None</GHCode> is implicit in Python — explicit return improves readability. No change required.</>,
    },
  ]
  return (
    <div style={{ height: '440px', background: '#0d1117', overflowY: 'auto', padding: '20px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px', color: '#8b949e' }}>
        <span>acme-eng / acme-api <span style={{ color: '#30363d' }}>·</span> Pull request #47</span>
        <span style={{ background: '#196c2e', border: '1px solid #2ea043', color: '#3fb950', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: '600' }}>✓ Approved</span>
      </div>
      <div style={{ border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #238636, #196c2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <span style={{ color: '#58a6ff', fontWeight: '600', fontSize: '14px' }}>git-auto-pr[bot]</span>
            <span style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e', borderRadius: '2px', padding: '0 6px', fontSize: '11px', lineHeight: '20px' }}>bot</span>
            <span style={{ color: '#8b949e', fontSize: '13px' }}>reviewed just now</span>
          </div>
        </div>
        <div style={{ padding: '8px 16px', background: '#0d1117', borderBottom: '1px solid #30363d', fontSize: '13px' }}>
          <span style={{ color: '#e6edf3', fontFamily: 'monospace' }}>middleware/auth.py</span>
          <span style={{ color: '#8b949e' }}> — automated review by Git-Auto-PR</span>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#0d1117' }}>
          {findings.map((f, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${f.borderColor}`, paddingLeft: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ background: f.badgeBg, color: f.badgeColor, borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: '600', flexShrink: 0, lineHeight: '18px' }}>{f.badge}</span>
                <span style={{ color: '#e6edf3', fontSize: '13px', lineHeight: '1.6' }}>{f.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 16px', background: '#161b22', borderTop: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: '#8b949e' }}>3 findings · 0 blockers · safe to merge</span>
          <span style={{ color: '#3fb950', fontWeight: '600' }}>✓ Approved</span>
        </div>
      </div>
    </div>
  )
}

function WhySection() {
  const [phase, setPhase] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const LABELS = ['Team chat', 'Git push', 'PR opened', 'Review posted']
  const DURATIONS = [7000, 6200, 6200, 7000]

  useEffect(() => { if (phase === 1) setVisibleLines(0) }, [phase])

  useEffect(() => {
    const t = setTimeout(() => setPhase(p => (p + 1) % 4), DURATIONS[phase])
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 1 || visibleLines >= TERM_LINES.length) return
    const t = setTimeout(() => setVisibleLines(n => n + 1), 440)
    return () => clearTimeout(t)
  }, [phase, visibleLines])

  return (
    <section className="px-8 md:px-16 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
          <h2
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            Code review is one of the biggest bottlenecks in software development.
          </h2>
          <p className="text-gray-500 text-base leading-[1.75]">
            PRs sit waiting for reviewers. Feedback quality varies wildly. Git-Auto-PR attacks both — posting a specific, line-cited review within seconds of every push.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-900" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)' }}>
          <div key={phase} style={{ animation: 'whyFadeIn 0.35s ease' }}>
            {phase === 0 && <SlackPhase />}
            {phase === 1 && <TerminalPhase visibleLines={visibleLines} />}
            {phase === 2 && <PRPhase />}
            {phase === 3 && <ReviewPhase />}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginTop: '24px' }}>
          {LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => { setPhase(i); if (i === 1) setVisibleLines(0) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '4px 10px' }}
            >
              <span style={{ display: 'block', width: i === phase ? '28px' : '8px', height: '4px', borderRadius: '2px', background: i === phase ? '#3fb950' : '#21262d', transition: 'all 0.3s ease' }} />
              <span style={{ fontSize: '11px', color: i === phase ? '#8b949e' : '#30363d', transition: 'color 0.3s', whiteSpace: 'nowrap' }}>{label}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── Changelog ─────────────────────────────────────────────────────────────────

function Changelog() {
  return (
    <section id="changelog" className="px-8 md:px-16 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">

        <h2
          className="font-bold text-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}
        >
          Changelog
        </h2>

        <div className="relative mb-12">
          <div className="absolute left-0 right-0 h-px bg-gray-900" style={{ top: '5px' }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {CHANGELOG.map((entry, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className="w-2.5 h-2.5 rounded-full mb-7 flex-shrink-0 relative z-10"
                  style={{ background: entry.first ? '#e54848' : '#2a2a2a', border: entry.first ? 'none' : '1px solid #3a3a3a' }}
                />
                <h3 className="text-white text-sm font-semibold leading-snug mb-2">{entry.title}</h3>
                <p className="text-gray-700 text-xs leading-relaxed mb-4 flex-1">{entry.desc}</p>
                <span className="text-gray-800 text-xs tracking-wide">{entry.date}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={GITHUB_URL + '/releases'}
          className="text-white text-sm hover:underline"
        >
          View all →
        </a>

      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function TestimonialCard({ quote, name, handle }) {
  return (
    <div className="rounded-xl p-10 md:p-14 flex flex-col" style={{ backgroundColor: '#0c0c0c', border: '1px solid #1a1a1a' }}>
      <blockquote
        className="font-bold text-white leading-tight flex-1"
        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', letterSpacing: '-0.02em' }}
      >
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3 mt-8">
        <img
          src={`https://github.com/${handle}.png`}
          alt={name}
          className="w-9 h-9 rounded-full flex-shrink-0"
          style={{ border: '1px solid #2a2a2a' }}
        />
        <div>
          <p className="text-white text-sm font-semibold leading-none mb-1">{name}</p>
          <p className="text-xs" style={{ color: '#4a5568' }}>@{handle}</p>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <section className="px-8 md:px-16 pb-24 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TestimonialCard
            quote="Set it up in five minutes. Every PR now gets a real, line-cited review — not a generic checklist."
            name="Daniel Adewale"
            handle="danieladewale"
          />
          <TestimonialCard
            quote="Git-Auto-PR catches things I would miss at 2am. This is mandatory on every repo I own."
            name="Joseph Lewis"
            handle="joslew22"
          />
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FaqCode = ({ children }) => (
  <code style={{
    color: '#e6edf3', background: '#21262d', border: '1px solid #30363d',
    borderRadius: '4px', padding: '0.1em 0.4em', fontSize: '0.85em',
    fontFamily: "'SFMono-Regular', Consolas, monospace",
  }}>{children}</code>
)

const FAQ_ITEMS = [
  {
    q: 'Does it work on private repositories?',
    a: 'Yes. Git-Auto-PR runs as a standard GitHub Action inside your own repo using your own API key. Private repos work exactly the same as public ones.',
  },
  {
    q: 'What does it cost?',
    a: 'The action is free and open source (MIT). You need an Anthropic API key — a typical PR review costs a few cents depending on diff size and the model you configure.',
  },
  {
    q: 'Which Claude model does it use?',
    a: <span>Defaults to <FaqCode>claude-3-5-sonnet</FaqCode>. Override it with the <FaqCode>model</FaqCode> input to use any Anthropic model.</span>,
  },
  {
    q: 'Does the AI review work on non-Python code?',
    a: <span>Yes — the AI review reads your diff and works on any language: TypeScript, Go, Rust, Java, whatever. Linting (flake8) and test coverage (pytest) are Python-specific. Disable them individually with <FaqCode>run_linter: false</FaqCode> or <FaqCode>run_tests: false</FaqCode>.</span>,
  },
  {
    q: 'How quickly does the review post?',
    a: 'Reviews typically appear within 30–60 seconds of a PR being opened or pushed to.',
  },
  {
    q: 'Can I use the review result in downstream steps?',
    a: <span>Yes. The action exposes four outputs: <FaqCode>verdict</FaqCode>, <FaqCode>coverage_pct</FaqCode>, <FaqCode>linter_passed</FaqCode>, and <FaqCode>tests_passed</FaqCode>. Reference them with <FaqCode>{'${{ steps.<id>.outputs.verdict }}'}</FaqCode> in any subsequent step.</span>,
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="px-8 md:px-16 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">

        <h2
          className="font-bold text-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}
        >
          FAQ
        </h2>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-8 py-5 text-left"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span className="text-white font-medium text-base">{item.q}</span>
                <span
                  className="flex-shrink-0 text-xl font-light transition-transform duration-200"
                  style={{ color: '#4a5568', transform: open === i ? 'rotate(45deg)' : 'none' }}
                >+</span>
              </button>
              {open === i && (
                <p className="pb-5 text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="px-8 md:px-16 py-32 md:py-40 text-center">
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-bold text-white leading-tight mb-12"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}
        >
          Automated reviews.
          <br />
          Available today.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={MARKETPLACE_URL}
            className="bg-white text-black font-semibold rounded-full px-8 py-3 text-sm hover:bg-gray-100 transition-colors duration-150"
          >
            Install from Marketplace
          </a>
          <a
            href={GITHUB_URL}
            className="rounded-full px-8 py-3 text-sm text-white transition-colors duration-150"
            style={{ border: '1px solid #2a2a2a' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#444'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
          >
            View source
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="connect" className="border-t px-8 md:px-16 pt-16 pb-12" style={{ borderColor: '#111' }}>
      <div className="max-w-7xl mx-auto">

        <div className="flex gap-16 mb-16">
          <div className="flex-shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8.5" stroke="white" strokeWidth="1"/>
              <path d="M9 1C9 1 13 5 13 9C13 13 9 17 9 17" stroke="white" strokeWidth="1"/>
              <path d="M1 9H17" stroke="white" strokeWidth="1"/>
              <path d="M2 6H16M2 12H16" stroke="white" strokeWidth="0.75"/>
            </svg>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(FOOTER_COLS).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-white text-sm font-semibold mb-5">{section}</h3>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm transition-colors duration-150"
                        style={{ color: '#4a5568' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#718096'}
                        onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: '#111' }}>
          <p className="text-xs" style={{ color: '#2d2d2d' }}>
            MIT License&nbsp;·&nbsp;Open Source&nbsp;·&nbsp;
            <a
              href="https://github.com/masonbrogden"
              className="transition-colors duration-150"
              style={{ color: '#2d2d2d' }}
              onMouseEnter={e => e.currentTarget.style.color = '#555'}
              onMouseLeave={e => e.currentTarget.style.color = '#2d2d2d'}
            >
              Mason Brogden
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}

// ── Screenshot mockups ───────────────────────────────────────────────────────

function BotCode({ children }) {
  return (
    <code style={{
      fontFamily: "'SFMono-Regular', Consolas, monospace",
      background: '#21262d', border: '1px solid #30363d',
      borderRadius: '4px', padding: '0.1em 0.4em',
      fontSize: '0.85em', color: '#e6edf3', wordBreak: 'break-word',
    }}>{children}</code>
  )
}

function MockupBotReport() {
  const thS = (last) => ({
    padding: '8px 16px', background: '#161b22', color: '#e6edf3', fontWeight: '600',
    borderBottom: '1px solid #30363d', borderRight: last ? 'none' : '1px solid #30363d',
    textAlign: 'left', whiteSpace: 'nowrap', fontSize: '14px',
  })
  const tdS = (opts = {}) => ({
    padding: '8px 16px', fontSize: '14px', color: opts.color || '#e6edf3',
    borderBottom: opts.last ? 'none' : '1px solid #30363d',
    borderRight: opts.noRight ? 'none' : '1px solid #30363d',
    textAlign: opts.center ? 'center' : 'left', fontWeight: opts.bold ? '600' : 'normal',
  })
  const rows = [
    { file: 'tests/test_bot.py',          stmts: 76, miss: 0,  cover: '100%', missing: '—',    bad: false },
    { file: 'tests/test_user_service.py', stmts: 25, miss: 0,  cover: '100%', missing: '—',    bad: false },
    { file: 'user_service.py',            stmts: 39, miss: 39, cover: '0%',   missing: '1-62', bad: true  },
  ]
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#0d1117', color: '#e6edf3' }}>
      {/* Bot comment header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: '#161b22', borderBottom: '1px solid #30363d' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#21262d', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 16 16" fill="#8b949e">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
          <span style={{ fontWeight: '600' }}>github-actions</span>
          <span style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e', borderRadius: '2px', padding: '1px 6px', fontSize: '12px', fontWeight: '500' }}>Bot</span>
          <span style={{ color: '#8b949e' }}>commented 1 minute ago</span>
        </div>
        <span style={{ color: '#8b949e', fontSize: '18px', letterSpacing: '2px' }}>···</span>
      </div>

      <div style={{ padding: '20px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 12px', paddingBottom: '10px', borderBottom: '1px solid #30363d' }}>PR Review Bot Report</h2>

        {/* Check / Status table */}
        <table style={{ borderCollapse: 'collapse', border: '1px solid #30363d', marginBottom: '28px', fontSize: '14px' }}>
          <thead>
            <tr>
              <th style={thS()}>Check</th>
              <th style={thS(true)}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdS()}>Linter</td>
              <td style={tdS({ noRight: true })}>❌ Failed</td>
            </tr>
            <tr>
              <td style={tdS()}>Tests</td>
              <td style={tdS({ noRight: true })}>✅ Passed</td>
            </tr>
            <tr>
              <td style={tdS({ last: true })}>Coverage</td>
              <td style={tdS({ noRight: true, last: true })}>72.0%</td>
            </tr>
          </tbody>
        </table>

        {/* Coverage Breakdown */}
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 14px' }}>Coverage Breakdown</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', border: '1px solid #30363d', width: '100%', fontSize: '14px' }}>
            <thead>
              <tr>
                {['File', 'Stmts', 'Miss', 'Cover', 'Missing Lines'].map((h, i) => (
                  <th key={h} style={{ padding: '8px 16px', background: '#161b22', color: '#e6edf3', fontWeight: '700', textAlign: 'center', borderBottom: '1px solid #30363d', borderRight: i < 4 ? '1px solid #30363d' : 'none', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '8px 16px', borderBottom: '1px solid #30363d', borderRight: '1px solid #30363d' }}>
                    <code style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: '4px', padding: '2px 7px', fontFamily: 'monospace', fontSize: '13px', color: '#e6edf3' }}>{row.file}</code>
                  </td>
                  <td style={tdS({ center: true })}>{row.stmts}</td>
                  <td style={tdS({ center: true })}>{row.miss}</td>
                  <td style={tdS({ center: true, color: row.bad ? '#f85149' : '#3fb950', bold: true })}>{row.cover}</td>
                  <td style={tdS({ center: true, noRight: true })}>{row.missing}</td>
                </tr>
              ))}
              <tr>
                <td style={{ padding: '4px 16px', color: '#484f58', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '1px' }}>{'- - - - - - - - - - - - - - - - - - - - - - - - - - - - -'}</td>
                <td colSpan={4} style={{ borderLeft: '1px solid #30363d' }} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MockupAIReviewTop() {
  const C = BotCode
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#0d1117', color: '#e6edf3', padding: '24px 28px', fontSize: '14px', lineHeight: '1.7' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 18px' }}>AI Code Review</h2>

      <p style={{ margin: '0 0 4px', fontWeight: '700' }}>Summary</p>
      <p style={{ margin: '0 0 20px' }}>
        This PR introduces a <C>user_service.py</C> module with basic CRUD/auth operations and a thin test suite covering <C>list_users</C> and <C>update_role</C>. The implementation contains multiple critical security vulnerabilities including SQL injection, plaintext password storage, and credential leakage in logs.
      </p>

      <p style={{ margin: '0 0 12px' }}>
        <strong>Critical Issues</strong>{' '}
        <em style={{ color: '#8b949e', fontWeight: '400' }}>(must fix before merge)</em>
      </p>

      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <li>
          <strong>SQL Injection — line 15:</strong>{' '}
          <C>{"f\"SELECT id, username, password, role FROM users WHERE username = '{username}'\""}</C>
          {' '}— raw f-string interpolation allows any caller to inject arbitrary SQL. Use parameterized queries: <C>{'cur.execute("SELECT ... WHERE username = %s", (username,))'}</C>.
        </li>
        <li>
          <strong>SQL Injection — line 47:</strong>{' '}
          <C>{"f\"UPDATE users SET role = '{new_role}' WHERE username = '{username}'\""}</C>
          {' '}— same vulnerability. Both <C>new_role</C> and <C>username</C> are injected directly into the query string.
        </li>
        <li>
          <strong>SQL Injection — line 57:</strong>{' '}
          <C>{"f\"SELECT username, role FROM users WHERE role = '{role}'\""}</C>
          {' '}— same vulnerability for the <C>role</C> parameter.
        </li>
        <li>
          <strong>Plaintext password storage — line 26:</strong>{' '}
          <C>create_user</C> inserts <C>password</C> directly into the database with no hashing. <C>hashlib</C> is imported (line 3) but never used, confirming this was intended to be hashed. Storing plaintext passwords is a critical security failure.
        </li>
        <li>
          <strong>Plaintext password comparison — line 40:</strong>{' '}
          <C>authenticate</C> compares <C>stored_password == password</C> in plain text. Even if hashing is added to storage, this comparison must use a constant-time function like <C>hmac.compare_digest</C> or <C>bcrypt.checkpw</C>.
        </li>
      </ol>
    </div>
  )
}

function MockupAIReviewBottom() {
  const C = BotCode
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#0d1117', color: '#e6edf3', padding: '24px 28px', fontSize: '14px', lineHeight: '1.7' }}>
      <ol start={6} style={{ margin: '0 0 20px', paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <li>
          <strong>Password logged in plaintext — line 29:</strong>{' '}
          <C>{'logger.info(f"User created: {username} password={password} role={role}")'}</C>
          {' '}— the raw password is written to application logs. Any log aggregation system, log file, or observer will capture user credentials.
        </li>
        <li>
          <strong>Resource leak in <C>get_user</C> — lines 13–16:</strong>{' '}
          <C>conn</C> and <C>cur</C> are never closed. Unlike <C>create_user</C> and <C>list_users</C>, there is no <C>{'finally: conn.close()'}</C> or context manager, so every call to <C>get_user</C> (and therefore every <C>authenticate</C> call) leaks a database connection.
        </li>
        <li>
          <strong>Resource leak in <C>update_role</C> — lines 45–48:</strong>{' '}
          Same pattern — <C>conn</C> and <C>cur</C> are never closed. No <C>finally</C> block or context manager is used.
        </li>
      </ol>

      <p style={{ margin: '0 0 12px' }}>
        <strong>Minor Issues</strong>{' '}
        <em style={{ color: '#8b949e', fontWeight: '400' }}>(should fix)</em>
      </p>

      <ol style={{ margin: '0 0 24px', paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <li>
          <strong>Test for <C>update_role</C> does not use context manager mock correctly — lines 29–30:</strong>{' '}
          <C>{'conn.cursor.return_value = MagicMock()'}</C> sets up a plain mock, but <C>update_role</C> calls <C>{'cur = conn.cursor()'}</C> and then <C>{'cur.execute(...)'}</C> without a context manager, so this happens to work. However, it does not assert that <C>cur.execute</C> was called with the correct arguments, meaning a silent no-op in <C>update_role</C> would still pass the test.
        </li>
        <li>
          <C>test_list_users_with_role</C>{' '}
          <strong>only checks the returned data, not the SQL executed — line 25:</strong>{' '}
          The test does not assert <C>cur.execute</C> was called with a filtered query. If <C>list_users</C> ignored the <C>role</C> argument entirely and returned pre-seeded data, the test would still pass.
        </li>
      </ol>

      <p style={{ margin: '0 0 20px' }}><strong>Verdict:</strong> Request Changes</p>
      <hr style={{ border: 'none', borderTop: '1px solid #30363d', margin: '0 0 16px' }} />
      <p style={{ margin: 0, color: '#8b949e', fontStyle: 'italic', fontSize: '13px' }}>
        Automated review by{' '}
        <a href={GITHUB_URL} style={{ color: '#58a6ff', textDecoration: 'none' }}>Git-Auto-PR</a>
      </p>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans">
      <Nav />
      <main>
        <Hero />

        <FeatureSection
          number="1.0"
          label="Lint"
          headline="Catch every linting violation before it lands."
          body="Git-Auto-PR runs Flake8 on every changed Python file on every PR. Violations surface directly in the PR comment — not buried in CI logs, not discovered days later in review."
        >
          <MockupBotReport />
        </FeatureSection>

        <FeatureSection
          number="2.0"
          label="Test"
          headline="Know your test coverage before you merge."
          body="The action runs pytest with coverage tracking and posts results directly on the PR. Set a minimum coverage threshold to gate merges on quality — no separate CI configuration required."
        >
          <MockupAIReviewTop />
        </FeatureSection>

        <FeatureSection
          number="3.0"
          label="Review"
          headline="Line-cited AI code review on every pull request."
          body="Claude reads your diff and writes a specific, technical review — not a checklist. It references exact line numbers, surfaces real bugs, and suggests concrete improvements on every PR automatically."
        >
          <MockupAIReviewBottom />
        </FeatureSection>

        <FeatureSection
          id="configure"
          number="4.0"
          label="Configure"
          headline="Three lines to get started. Fully configurable from there."
          body="Add the workflow file, set your Anthropic API key as a secret, open a PR. Every input has a sensible default. Override only what you need. Structured outputs let you chain downstream steps on the review result."
        >
          <ConfigBlock />
        </FeatureSection>

        <WhySection />
        <Changelog />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
