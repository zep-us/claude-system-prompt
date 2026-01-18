```
ROOT FILESYSTEM DETAILED STRUCTURE (Depth 4)
==============================================

/ (ROOT)
│
├── .dockerenv (Docker container identifier)
├── container_info.json (Container metadata)
├── process_api (Main executable binary, 2MB)
│
├── home/
│   ├── claude/
│   │   ├── .cache/
│   │   │   ├── pip/
│   │   │   ├── puppeteer/
│   │   │   └── uv/
│   │   ├── .config/
│   │   │   └── uv/
│   │   ├── .local/
│   │   │   └── bin/
│   │   ├── .npm/
│   │   │   └── _logs/
│   │   └── .npm-global/
│   │       ├── bin/
│   │       ├── lib/
│   │       └── share/
│   └── ubuntu/
│
├── mnt/
│   ├── skills/
│   │   ├── examples/
│   │   │   ├── algorithmic-art/
│   │   │   ├── brand-guidelines/
│   │   │   ├── canvas-design/
│   │   │   ├── doc-coauthoring/
│   │   │   ├── internal-comms/
│   │   │   ├── mcp-builder/
│   │   │   ├── skill-creator/
│   │   │   ├── slack-gif-creator/
│   │   │   ├── theme-factory/
│   │   │   └── web-artifacts-builder/
│   │   └── public/
│   │       ├── docx/
│   │       ├── frontend-design/
│   │       ├── pdf/
│   │       ├── pptx/
│   │       ├── product-self-knowledge/
│   │       └── xlsx/
│   ├── transcripts/
│   └── user-data/
│       ├── outputs/
│       ├── tool_results/
│       └── uploads/
│
├── opt/
│   ├── google/
│   │   └── chrome/
│   └── pw-browsers/
│       ├── .links/
│       ├── chromium-1194/
│       │   └── chrome-linux/
│       ├── chromium_headless_shell-1194/
│       │   └── chrome-linux/
│       └── ffmpeg-1011/
│
├── tmp/
│   ├── hsperfdata_root/
│   ├── node-compile-cache/
│   │   └── v22.21.0-x64-9de703df-0/
│   └── phantomjs/
│       └── phantomjs-2.1.1-linux-x86_64.tar.bz2-extract-1763690394151/
│
├── usr/
│   ├── bin/
│   ├── include/
│   │   ├── node/
│   │   │   ├── cppgc/
│   │   │   ├── libplatform/
│   │   │   ├── openssl/
│   │   │   └── uv/
│   │   ├── python3.12/
│   │   │   ├── cpython/
│   │   │   ├── greenlet/
│   │   │   └── internal/
│   │   └── [many C/C++ headers...]
│   │
│   ├── lib/
│   │   ├── jvm/
│   │   │   └── java-21-openjdk-amd64/
│   │   ├── libreoffice/
│   │   │   ├── presets/
│   │   │   ├── program/
│   │   │   └── share/
│   │   ├── node_modules/
│   │   │   ├── corepack/
│   │   │   └── npm/
│   │   ├── python3/
│   │   │   └── dist-packages/
│   │   └── python3.12/
│   │       ├── asyncio/
│   │       ├── collections/
│   │       ├── concurrent/
│   │       ├── ctypes/
│   │       ├── email/
│   │       ├── encodings/
│   │       ├── http/
│   │       ├── importlib/
│   │       ├── json/
│   │       ├── lib-dynload/
│   │       ├── logging/
│   │       ├── multiprocessing/
│   │       ├── unittest/
│   │       ├── urllib/
│   │       ├── xml/
│   │       └── [standard libraries...]
│   │
│   └── share/
│
├── etc/
│   ├── java/
│   │   └── security/
│   ├── java-21-openjdk/
│   │   ├── jfr/
│   │   ├── management/
│   │   └── security/
│   ├── libreoffice/
│   │   └── registry/
│   ├── python3/
│   ├── python3.12/
│   ├── ssl/
│   │   ├── certs/
│   │   │   └── java/
│   │   └── private/
│   └── [system configuration files...]
│
├── var/
│   ├── backups/
│   ├── cache/
│   ├── lib/
│   ├── log/
│   ├── mail/
│   └── tmp/
│
├── root/
│   ├── .cache/
│   └── .ssh/
│
└── [proc, sys, dev - virtual filesystems]

==============================================
KEY FINDINGS:

1. DEVELOPMENT ENVIRONMENT:
   - Node.js v22.21.0
   - Python 3.12
   - Java 21 OpenJDK
   - npm & corepack
   - uv (Python package installer)

2. BROWSERS:
   - Playwright browsers (Chromium 1194)
   - Headless Chromium shell
   - PhantomJS
   - Google Chrome
   - FFmpeg for media processing

3. DOCUMENT PROCESSING:
   - LibreOffice suite
   - ImageMagick
   - PDF tools

4. PYTHON PACKAGES (based on .cache):
   - pip cache
   - uv cache
   - Puppeteer (Node.js)

5. NPM GLOBAL PACKAGES:
   - npm itself
   - corepack
   - Additional packages in .npm-global/

6. MOUNTED RESOURCES:
   - /mnt/skills/ (Skills system)
   - /mnt/user-data/ (User I/O)
   - /mnt/transcripts/ (Audio/conversation transcripts)

7. TOOL RESULTS:
   - /mnt/user-data/tool_results/ ← Newly discovered!
     (believed to be a repository for tool execution results)

==============================================
```