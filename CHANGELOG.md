# Changes

## 1.3.0 candidate

- Default Companion controls, embedded Timer, mobile remote and help to English. Existing Spanish Companion labels remain available through the language option.
- Preserve a running browser timer when reclaiming ownership after a module restart.
- Report an initial OSC feedback timeout and a missing LAN Timer page accurately.
- Respect Advanced field visibility, align the seconds variable with the display, and avoid expanding text variables twice.
- Add readable variable names and generate both prepare and load-and-start speaker presets.
- Add SHOW/HIDE actions, presets, output visibility feedback and a switch in Timer. Hiding the presenter signal does not pause the clock.
- Add independent chroma/background and text presets. Web output supports an explicit transparent alpha background for browser capture; native desktop windows remain opaque.
- Keep existing action IDs, OSC paths, saved preset identifiers and the eventspro-timer-v1 schema compatible.

This candidate has automated protocol and browser-state tests. Physical Windows/phone LAN, external-monitor and destination capture acceptance remain separate checks. A built package is not Bitfocus approval or catalogue availability.
