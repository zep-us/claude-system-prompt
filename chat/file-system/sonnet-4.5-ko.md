```
ROOT FILESYSTEM DETAILED STRUCTURE (Depth 4)
==============================================

/ (ROOT)
│
├── .dockerenv (Docker 컨테이너 식별자)
├── container_info.json (컨테이너 메타데이터)
├── process_api (메인 실행 바이너리, 2MB)
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
│   │   └── [많은 C/C++ 헤더들...]
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
│   │       └── [표준 라이브러리들...]
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
│   └── [시스템 설정들...]
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
└── [proc, sys, dev - 가상 파일시스템들]

==============================================
주요 발견사항:

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
   - /mnt/skills/ (Skills 시스템)
   - /mnt/user-data/ (사용자 I/O)
   - /mnt/transcripts/ (음성/대화 기록)

7. TOOL RESULTS:
   - /mnt/user-data/tool_results/ ← 새로 발견!
     (도구 실행 결과 저장소로 추정)

==============================================
```