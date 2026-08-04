# Security Policy

## Reporting a vulnerability

Do not open a public GitHub issue for security vulnerabilities.

Email **niksapa150@gmail.com** with a description of the issue, steps to
reproduce, and its potential impact. You should get an initial response
within a few days.

Please include:

- Affected version (`branch --version` or the `package.json` version)
- Whether the issue is in the CLI, the MCP server, or the viewer
- A minimal reproduction if possible

We'll credit reporters in the release notes unless you'd prefer to stay
anonymous.

## Scope

Relevant areas: session file handling (`~/.branch/sessions/`), the
`branch-mcp` stdio server, the viewer's `/api/fork` and `/api/inject` routes,
and the Vercel Blob sharing flow (`branch share`, `BRANCH_AUTO_SHARE`).

The viewer is designed to run on `localhost` only and has no authentication —
see the Security section in `README.md` before deploying it anywhere else.

## Supported versions

Only the latest published version on npm receives security fixes. Please
upgrade (`npm install -g branch-ai@latest`) before reporting an issue to
confirm it still reproduces.
