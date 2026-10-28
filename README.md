# EventsPRO Timer PRO for Bitfocus Companion

Controls Timer PRO countdowns, stopwatch, clock, named speaker slots and messages. Includes a self-contained Timer web interface hosted by Companion for local-network use, or an OSC connection to an installed Timer PRO application.

## Connections

- **Timer in browser over local network**: open `http://COMPANION-IP:8000/instance/CONNECTION-NAME/index.html` (encode spaces as `%20`). Port 8000 is the default Companion web port; replace it with the configured Companion web port if changed. The module does not discover the host or port automatically. Companion maintains the timer state. Use the Timer mobile-control QR on the same reachable LAN. No internet is required during a session.
- **Installed Timer (OSC)**: enter the Timer computer IPv4 address. Default receive port is 9010 and Companion feedback port is 9011. Existing connection configuration is retained.

The module provides start, pause, reset, +/-1 minute, countdown preparation for 5/10/15/20/30/60 minutes, stopwatch lap capture, named intervention loading, saved messages and live time/status feedback. Loading a duration or an intervention does not start it. The separate named-intervention start action remains available.

See [connection help](companion/HELP.md) for setup and limitations.

## Development

Requires Node.js 22.18 or newer within major 22 and Yarn 4. Dependencies and lockfile are managed with Yarn. `yarn install --immutable`, `yarn test`, `yarn package`.

Module ID: `eventspro-toolspro-timer`. Version: 1.2.1. Existing action, feedback, variable, preset and OSC command IDs are retained. Module API remains 1.13.6 and the official shared build supports runtime node22.

## Validation limits

Automated state, transport, HTTP isolation and packaged IPC checks have passed locally. Physical acceptance with Companion, Windows and a phone on an offline LAN remains pending. Browser agenda data remains in browser storage; restarting the module does not preserve the live timer state. The module does not change the Mac application or its installation.

Repository approval is permission to maintain this repository. It does not itself establish catalogue availability or a completed module review.

## License

MIT. See [LICENSE](LICENSE). Existing repository license retained. EventsPRO source copyright and third-party notices are included in [notices](companion/THIRD-PARTY-NOTICES.md).
