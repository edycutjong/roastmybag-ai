# Security Policy

## Supported Versions

This project is developed on the `main` branch. Only the latest commit on `main`
receives security fixes.

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| older tags | :x:             |

## Reporting a Vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report privately via GitHub's
[private vulnerability reporting](https://github.com/edycutjong/roastmybag-ai/security/advisories/new)
on this repository.

Please include:

- a description of the issue and its impact,
- the affected file(s) or endpoint(s),
- steps to reproduce (a proof of concept is ideal),
- any suggested remediation.

### What to expect

- **Acknowledgement:** within 5 business days.
- **Assessment:** an initial severity assessment within 10 business days.
- **Fix:** valid issues are patched on `main` and disclosed via a GitHub Security
  Advisory once a fix is available.

If a report is declined, you will get an explanation of why it falls outside the
scope below.

## Scope

In scope:

- the Next.js application in this repository (`app/`, `components/`, `lib/`),
- the API route handlers and their input validation,
- handling of API keys and secrets in server-side code,
- the CI/CD workflows in `.github/workflows/`.

Out of scope:

- vulnerabilities in third-party services this project calls (report those to the
  respective vendor),
- findings that require a compromised host or physical access,
- automated scanner output without a demonstrated impact,
- rate limiting or denial of service against the public demo deployment.

## Secrets

This project reads all credentials from environment variables and never commits
them. Secret scanning and push protection are enabled on this repository. If you
believe a credential has been exposed, report it through the private channel
above rather than opening an issue.
