# Security Operations Guide

This repository uses GitHub Advanced Security workflows to detect and remediate security risks in JavaScript and workflow/config files.

## Scope

Security automation is focused on:

- JavaScript sources under `/assets/js` and `/work/js`
- GitHub workflows and repository configuration under `/.github`

## Enabled automation in this repository

- **CodeQL Security Scan** (`.github/workflows/codeql.yml`)
  - Runs on push to `main`, pull requests to `main`, weekly schedule, and manual dispatch.
- **Dependency Review** (`.github/workflows/dependency-review.yml`)
  - Runs on pull requests and fails for high-severity dependency risks.
- **Dependabot updates** (`.github/dependabot.yml`)
  - Weekly updates for GitHub Actions dependencies.
- **Weekly Security Alerts Summary** (`.github/workflows/security-alerts-summary.yml`)
  - Posts/updates a tracked triage issue with open code and secret scanning alert counts.

## Required repository settings (one-time)

Enable these in **Settings → Security & analysis**:

1. Code scanning
2. Secret scanning
3. Dependabot alerts
4. Dependabot security updates
5. Copilot Autofix (for AI-generated remediation suggestions on supported alerts)

Enable these in **Settings → Branches** for `main`:

1. Require a pull request before merging
2. Require status checks to pass before merging:
   - `CodeQL Security Scan / Analyze JavaScript`
   - `Dependency Review / Review dependencies`
3. Require review from Code Owners (optional but recommended for `.github/**` and JS paths)

## Triage process and SLAs

1. Prioritize **critical/high** alerts first.
2. Assign an owner within 24 hours.
3. Create/update tracking using the **Security Alert Triage** issue template.
4. For false positives, dismiss with clear evidence and rationale.
5. Close remediation issue only after merged fix and successful security checks.

## End-to-end validation drill

To validate this setup:

1. Create a temporary branch and intentionally add an insecure JavaScript pattern.
2. Open a PR against `main`.
3. Confirm CodeQL and dependency review checks run automatically.
4. Confirm alerts appear under the repository Security tab.
5. Confirm Copilot Autofix suggestions appear for supported alerts.
6. Fix the issue and confirm checks pass.
7. Confirm weekly summary issue records the alert lifecycle.

Remove any intentionally insecure test code before merging.
