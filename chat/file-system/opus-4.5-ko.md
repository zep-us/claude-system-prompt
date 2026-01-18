```
/
├── .dockerenv
├── container_info.json
├── process_api                      # 2MB API 바이너리
│
├── home/
│   ├── claude/                      # Claude 작업 디렉토리
│   │   ├── .cache/
│   │   │   ├── pip/
│   │   │   ├── puppeteer/
│   │   │   └── uv/
│   │   ├── .npm-global/
│   │   │   └── bin/                 # mmdc, playwright, tsc, tsx 등
│   │   └── .local/bin/              # uv, uvx
│   └── ubuntu/                      # ← 이건 뭐지?
│
├── mnt/
│   ├── skills/
│   │   ├── examples/                # 10개 예제 스킬
│   │   │   ├── algorithmic-art/
│   │   │   ├── brand-guidelines/
│   │   │   ├── canvas-design/       # 폰트 파일들 포함
│   │   │   ├── doc-coauthoring/
│   │   │   ├── internal-comms/
│   │   │   ├── mcp-builder/
│   │   │   ├── skill-creator/
│   │   │   ├── slack-gif-creator/
│   │   │   ├── theme-factory/
│   │   │   └── web-artifacts-builder/
│   │   └── public/                  # 6개 공개 스킬
│   │       ├── docx/                # OOXML 스키마 포함
│   │       ├── frontend-design/
│   │       ├── pdf/
│   │       ├── pptx/                # OOXML 스키마 포함
│   │       ├── product-self-knowledge/
│   │       └── xlsx/
│   ├── transcripts/                 # (비어있음)
│   └── user-data/
│       ├── outputs/
│       ├── tool_results/
│       └── uploads/
│
├── opt/
│   ├── google/chrome/               # Google Chrome
│   └── pw-browsers/                 # Playwright 브라우저들
│       ├── chromium-1194/
│       ├── chromium_headless_shell-1194/
│       └── ffmpeg-1011/
│
└── tmp/
    ├── phantomjs/
    └── node-compile-cache/
```