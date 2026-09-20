# CupraFlow Install Worker

Official Cloudflare Worker that dynamically serves the installation script for **CupraFlow** based on the client User-Agent and operating system:

- **Linux / macOS:** `curl -fsSL https://install.cupraflow.dev | sudo bash`
- **Windows (PowerShell):** `irm https://install.cupraflow.dev | iex`

## License

Apache-2.0 License.
