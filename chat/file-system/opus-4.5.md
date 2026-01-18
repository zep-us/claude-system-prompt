```
/
├── .dockerenv
├── container_info.json
├── process_api                      # 2MB API binary
│
├── home/
│   ├── claude/                      # Claude working directory
│   │   ├── .cache/
│   │   │   ├── pip/
│   │   │   ├── puppeteer/
│   │   │   └── uv/
│   │   ├── .npm-global/
│   │   │   └── bin/                 # mmdc, playwright, tsc, tsx, etc.
│   │   └── .local/bin/              # uv, uvx
│   └── ubuntu/                      # ← What's this?
│
├── mnt/
│   ├── skills/
│   │   ├── examples/                # 10 example skills
│   │   │   ├── algorithmic-art/
│   │   │   ├── brand-guidelines/
│   │   │   ├── canvas-design/       # includes font files
│   │   │   ├── doc-coauthoring/
│   │   │   ├── internal-comms/
│   │   │   ├── mcp-builder/
│   │   │   ├── skill-creator/
│   │   │   ├── slack-gif-creator/
│   │   │   ├── theme-factory/
│   │   │   └── web-artifacts-builder/
│   │   └── public/                  # 6 public skills
│   │       ├── docx/                # includes OOXML schemas
│   │       ├── frontend-design/
│   │       ├── pdf/
│   │       ├── pptx/                # includes OOXML schemas
│   │       ├── product-self-knowledge/
│   │       └── xlsx/
│   ├── transcripts/                 # (empty)
│   └── user-data/
│       ├── outputs/
│       ├── tool_results/
│       └── uploads/
│
├── opt/
│   ├── google/chrome/               # Google Chrome
│   └── pw-browsers/                 # Playwright browsers
│       ├── chromium-1194/
│       ├── chromium_headless_shell-1194/
│       └── ffmpeg-1011/
│
└── tmp/
    ├── phantomjs/
    └── node-compile-cache/
```