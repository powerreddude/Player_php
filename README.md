# Player_php

- Play songs from any device
- Built to be compatable with [bandcamp-dl](https://github.com/iheanyi/bandcamp-dl)
- Best hosted with [apache](https://www.apache.org)

---
## Setup
1. Clone this project to the web folder of your apache server with php installed ([docker](https://hub.docker.com/r/mattrayner/lamp))
2. Add this to the config of your server for http and https 
`Alias "/music" "{path to your music}"`
3. Connect to your server and enjoy the music!

---

## Downloading music

The recommended way to download music is with [bandcamp-dl](https://github.com/iheanyi/bandcamp-dl)

`$ bandcamp-dl -ku [URL]`
