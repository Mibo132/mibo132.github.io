# Clash of Cities

A GPS territory strategy game: claim real-world hexes, build on them and walk to use them. This site is the web version; it plays online on the shared game server (https://clash-of-cities-api.onrender.com), together with the iPhone app.

Play: **https://mibo132.github.io** (Safari on iPhone; allow location access).

This repository only hosts the built website. The source is `prototype/web` in the main game repository. Rebuild there with `API_BASE=https://clash-of-cities-api.onrender.com python3 prototype/web/build.py`, then copy `site/` here.
