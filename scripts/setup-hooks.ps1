# Sets up git hooks for this repo.
# Run once after cloning, or after the hook script changes.
# Usage:
#   npm run setup-hooks
#
# What it does:
#   - Copies scripts/hooks/* into .git/hooks/
#   - Hooks include pre-push (runs npm run qa-content on content changes)

$ErrorActionPreference = "Stop"

$repoRoot = git rev-parse --show-toplevel
if (-not $repoRoot) {
  Write-Host "Error: not inside a git repo" -ForegroundColor Red
  exit 1
}

$hooksSrc = Join-Path $repoRoot "scripts\hooks"
$hooksDst = Join-Path $repoRoot ".git\hooks"

if (-not (Test-Path $hooksSrc)) {
  Write-Host "Error: $hooksSrc not found" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path $hooksDst)) {
  New-Item -ItemType Directory -Path $hooksDst -Force | Out-Null
}

Get-ChildItem -Path $hooksSrc -File | ForEach-Object {
  $dst = Join-Path $hooksDst $_.Name
  Copy-Item -Path $_.FullName -Destination $dst -Force
  Write-Host "Installed hook: $($_.Name)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Hooks installed. The pre-push hook will run npm run qa-content automatically when you push changes to niche-site-content.ts or preview archetypes."
