(function () {
  "use strict";

  let CODE_CONTENT = {};

  // Lightweight syntax highlighting
  function highlightLine(text) {
    // Escape HTML
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // XML tags: <tag_name> or </tag_name> or <tag_name ...>
    escaped = escaped.replace(
      /(&lt;\/?[\w:_-]+(?:\s[^&]*?)?\/?\s*&gt;)/g,
      '<span class="xml-tag">$1</span>'
    );

    // JSON keys: "key":
    escaped = escaped.replace(
      /(&quot;[\w\s]+&quot;)\s*:/g,
      '<span class="json-key">$1</span>:'
    );
    // Also handle "key" without HTML entity (for template literals)
    escaped = escaped.replace(
      /("[\w\s_-]+")\s*:/g,
      '<span class="json-key">$1</span>:'
    );

    // Bold markdown: **text**
    escaped = escaped.replace(
      /\*\*([^*]+)\*\*/g,
      '<span class="bold-text">**$1**</span>'
    );

    // Comments: // text or # text (at start of line)
    if (/^\s*(\/\/|#\s)/.test(escaped)) {
      escaped = '<span class="code-comment">' + escaped + "</span>";
    }

    return escaped;
  }

  function renderContent(container, content, filenameEl, filename) {
    const lines = content.split("\n");

    let html = "";
    lines.forEach(function (line, i) {
      html +=
        '<div class="code-line">' +
        '<span class="line-number">' +
        (i + 1) +
        "</span>" +
        '<span class="line-content">' +
        highlightLine(line) +
        "</span>" +
        "</div>";
    });

    container.innerHTML = html;

    // Update filename
    if (filenameEl && filename) {
      filenameEl.textContent = filename;
    }
  }

  function renderCodeViewer(slideNum) {
    const data = CODE_CONTENT[slideNum];
    if (!data) return;

    const container = document.querySelector(
      '[data-slide="' + slideNum + '"] .code-viewer-body'
    );
    if (!container) return;

    const filenameEl = document.querySelector(
      '[data-slide="' + slideNum + '"] .code-viewer-filename'
    );

    // If filePath is specified, fetch the file dynamically
    if (data.filePath) {
      container.innerHTML =
        '<div class="code-line"><span class="line-content" style="color:var(--text-muted)">Loading...</span></div>';

      fetch(data.filePath)
        .then(function (response) {
          if (!response.ok) throw new Error("Failed to load " + data.filePath);
          return response.text();
        })
        .then(function (content) {
          renderContent(
            container,
            content,
            filenameEl,
            data.filename || data.filePath
          );
        })
        .catch(function (err) {
          container.innerHTML =
            '<div class="code-line"><span class="line-content" style="color:#E85050">Error: ' +
            err.message +
            "</span></div>";
        });
    } else {
      // Use inline content
      const content = data.content || "";
      renderContent(container, content, filenameEl, data.filename);
    }
  }

  function init() {
    // Render all code viewers
    Object.keys(CODE_CONTENT).forEach(function (slideNum) {
      renderCodeViewer(parseInt(slideNum));
    });
  }

  // Load code content from external JSON file
  function loadCodeContent(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load " + url);
        return response.json();
      })
      .then(function (data) {
        CODE_CONTENT = data;
        init();
      })
      .catch(function (err) {
        console.warn("Code content not loaded:", err.message);
        init();
      });
  }

  // Expose API for external use
  window.CodeViewer = {
    load: loadCodeContent,
    setContent: function (data) {
      CODE_CONTENT = data;
      init();
    },
    render: renderCodeViewer,
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      // Try to load from default location
      loadCodeContent("./data/code-content.json");
    });
  } else {
    loadCodeContent("./data/code-content.json");
  }
})();
