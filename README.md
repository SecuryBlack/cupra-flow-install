# CupraFlow Install

One-liner installer distribution for CupraFlow.

## Windows

Open PowerShell as Administrator and run:

```powershell
irm https://install.cupraflow.dev/windows | iex
```

## What it does

1. Detects architecture (x86_64 / ARM64)
2. Downloads the latest release from GitHub
3. Verifies SHA256 checksum
4. Installs to `C:\Program Files\CupraFlow`
5. Creates default config at `C:\ProgramData\CupraFlow\config.toml`
6. Registers and starts the CupraFlow Windows Service
7. Configures restart-on-failure

## Files

- `install.ps1` — PowerShell install script
- `index.html` — Landing page with copy-paste one-liner
