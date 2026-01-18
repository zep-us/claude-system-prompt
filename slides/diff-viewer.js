(function () {
  "use strict";

  // File pairs configuration for each diff viewer
  var FILE_PAIRS = {
    "diff-sonnet-public": {
      left: "../system-prompt/@claude-desktop/claude-behavior/sonnet-4.5-public-nov-19-2025.md",
      right: "../system-prompt/@claude-desktop/claude-behavior/sonnet-4.5-extracted.md",
    },
    "diff-opus-public": {
      left: "../system-prompt/@claude-desktop/claude-behavior/opus-4.5-public-nov-24-2025.md",
      right: "../system-prompt/@claude-desktop/claude-behavior/opus-4.5-extracted.md",
    },
    "diff-sonnet-opus": {
      left: "../system-prompt/@claude-desktop/claude-behavior/sonnet-4.5-extracted.md",
      right: "../system-prompt/@claude-desktop/claude-behavior/opus-4.5-extracted.md",
    },
    "diff-opus46-public": {
      left: "../system-prompt/@claude-desktop/claude-behavior/opus-4.6-public-feb-05-2026.md",
      right: "../system-prompt/@claude-desktop/claude-behavior/opus-4.6-extracted.md",
    },
  };

  // Normalize line for comparison (ignore whitespace differences)
  function normalizeLine(line) {
    return line.replace(/\s+/g, " ").trim();
  }

  // Check if two lines are essentially the same (ignoring whitespace)
  function linesMatch(a, b) {
    return normalizeLine(a) === normalizeLine(b);
  }

  // Compute similarity between two lines (0 to 1)
  function computeSimilarity(a, b) {
    if (!a || !b) return 0;

    var normA = normalizeLine(a);
    var normB = normalizeLine(b);

    // If normalized versions match, they're identical
    if (normA === normB) return 1;

    // Check if one contains the other (substring match)
    if (normA.includes(normB) || normB.includes(normA)) {
      var shorter = normA.length < normB.length ? normA : normB;
      var longer = normA.length < normB.length ? normB : normA;
      return shorter.length / longer.length;
    }

    // Word-based Jaccard similarity
    var wordsA = normA.toLowerCase().split(/\s+/).filter(Boolean);
    var wordsB = normB.toLowerCase().split(/\s+/).filter(Boolean);

    if (wordsA.length === 0 && wordsB.length === 0) return 1;
    if (wordsA.length === 0 || wordsB.length === 0) return 0;

    var setA = new Set(wordsA);
    var setB = new Set(wordsB);
    var intersection = 0;
    setA.forEach(function (w) {
      if (setB.has(w)) intersection++;
    });
    var union = setA.size + setB.size - intersection;

    // Also consider character-level similarity for short lines
    var charSim = 0;
    if (normA.length < 50 || normB.length < 50) {
      var commonChars = 0;
      var longer = normA.length > normB.length ? normA : normB;
      var shorter = normA.length > normB.length ? normB : normA;
      for (var i = 0; i < shorter.length; i++) {
        if (longer.includes(shorter[i])) commonChars++;
      }
      charSim = commonChars / longer.length;
    }

    var wordSim = union > 0 ? intersection / union : 0;
    return Math.max(wordSim, charSim);
  }

  // Compute line-by-line diff using LCS algorithm with fuzzy matching
  function computeDiff(leftLines, rightLines) {
    var m = leftLines.length;
    var n = rightLines.length;

    // Build LCS table with fuzzy matching
    var lcs = [];
    for (var i = 0; i <= m; i++) {
      lcs[i] = [];
      for (var j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          lcs[i][j] = 0;
        } else if (linesMatch(leftLines[i - 1], rightLines[j - 1])) {
          // Lines match (ignoring whitespace)
          lcs[i][j] = lcs[i - 1][j - 1] + 1;
        } else {
          lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
        }
      }
    }

    // Backtrack to find diff
    var tempLeft = [];
    var tempRight = [];
    var i = m,
      j = n;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && linesMatch(leftLines[i - 1], rightLines[j - 1])) {
        tempLeft.unshift({
          lineNum: i,
          text: leftLines[i - 1],
          type: "unchanged",
        });
        tempRight.unshift({
          lineNum: j,
          text: rightLines[j - 1],
          type: "unchanged",
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
        tempLeft.unshift({ lineNum: null, text: "", type: "empty" });
        tempRight.unshift({
          lineNum: j,
          text: rightLines[j - 1],
          type: "added",
        });
        j--;
      } else if (i > 0) {
        tempLeft.unshift({
          lineNum: i,
          text: leftLines[i - 1],
          type: "removed",
        });
        tempRight.unshift({ lineNum: null, text: "", type: "empty" });
        i--;
      }
    }

    // Post-process: convert removed/added pairs to modified if similar
    var leftResult = [];
    var rightResult = [];
    var k = 0;

    while (k < tempLeft.length) {
      var left = tempLeft[k];
      var right = tempRight[k];

      // Case 1: removed on left, empty on right - look for nearby added
      if (left.type === "removed" && right.type === "empty") {
        // Look ahead for potential matching added line
        var foundMatch = false;
        for (var look = k + 1; look < Math.min(k + 5, tempLeft.length); look++) {
          if (tempLeft[look].type === "empty" && tempRight[look].type === "added") {
            var sim = computeSimilarity(left.text, tempRight[look].text);
            if (sim >= 0.3) {
              // Generous threshold
              // Convert to modified pair
              leftResult.push({
                lineNum: left.lineNum,
                text: left.text,
                type: "modified",
              });
              rightResult.push({
                lineNum: tempRight[look].lineNum,
                text: tempRight[look].text,
                type: "modified",
              });
              // Mark as processed
              tempLeft[look].type = "_processed";
              tempRight[look].type = "_processed";
              foundMatch = true;
              break;
            }
          }
        }
        if (!foundMatch) {
          leftResult.push(left);
          rightResult.push(right);
        }
      }
      // Case 2: empty on left, added on right - look for nearby removed
      else if (left.type === "empty" && right.type === "added") {
        // Look ahead for potential matching removed line
        var foundMatch = false;
        for (var look = k + 1; look < Math.min(k + 5, tempLeft.length); look++) {
          if (tempLeft[look].type === "removed" && tempRight[look].type === "empty") {
            var sim = computeSimilarity(tempLeft[look].text, right.text);
            if (sim >= 0.3) {
              // Convert to modified pair
              leftResult.push({
                lineNum: tempLeft[look].lineNum,
                text: tempLeft[look].text,
                type: "modified",
              });
              rightResult.push({
                lineNum: right.lineNum,
                text: right.text,
                type: "modified",
              });
              tempLeft[look].type = "_processed";
              tempRight[look].type = "_processed";
              foundMatch = true;
              break;
            }
          }
        }
        if (!foundMatch) {
          leftResult.push(left);
          rightResult.push(right);
        }
      }
      // Skip already processed
      else if (left.type === "_processed" || right.type === "_processed") {
        // Skip
      }
      // Normal case
      else {
        leftResult.push(left);
        rightResult.push(right);
      }
      k++;
    }

    return { left: leftResult, right: rightResult };
  }

  function renderDiffViewer(containerId, diffData) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var diffBody = container.querySelector(".diff-body");
    if (!diffBody) return;

    // Create panels if they don't exist
    var leftPanel = diffBody.querySelector(".diff-panel-left");
    var rightPanel = diffBody.querySelector(".diff-panel-right");

    if (!leftPanel || !rightPanel) {
      diffBody.innerHTML =
        '<div class="diff-panel-left"></div>' +
        '<div class="diff-panel-right"></div>';
      leftPanel = diffBody.querySelector(".diff-panel-left");
      rightPanel = diffBody.querySelector(".diff-panel-right");
    }

    leftPanel.innerHTML = renderLines(diffData.left);
    rightPanel.innerHTML = renderLines(diffData.right);

    alignLineHeights(leftPanel, rightPanel);
    syncScroll(leftPanel, rightPanel);
  }

  function alignLineHeights(leftPanel, rightPanel) {
    var leftLines = leftPanel.querySelectorAll(".diff-line");
    var rightLines = rightPanel.querySelectorAll(".diff-line");
    var count = Math.min(leftLines.length, rightLines.length);

    for (var i = 0; i < count; i++) {
      leftLines[i].style.minHeight = "";
      rightLines[i].style.minHeight = "";
    }

    for (var i = 0; i < count; i++) {
      var lh = leftLines[i].offsetHeight;
      var rh = rightLines[i].offsetHeight;
      if (lh !== rh) {
        var max = Math.max(lh, rh) + "px";
        leftLines[i].style.minHeight = max;
        rightLines[i].style.minHeight = max;
      }
    }
  }

  function renderLines(lines) {
    return lines
      .map(function (line) {
        var lineNumStr = line.lineNum !== null ? line.lineNum : "";
        var content = line.type === "empty" ? "" : highlightLine(line.text);
        return (
          '<div class="diff-line ' +
          line.type +
          '">' +
          '<span class="diff-line-num">' +
          lineNumStr +
          "</span>" +
          '<span class="diff-line-content">' +
          content +
          "</span>" +
          "</div>"
        );
      })
      .join("");
  }

  function highlightLine(text) {
    var escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // XML tag highlight
    escaped = escaped.replace(
      /(&lt;\/?[\w:_-]+(?:\s[^&]*?)?\/?\s*&gt;)/g,
      '<span class="xml-tag">$1</span>'
    );

    // Bold markdown
    escaped = escaped.replace(
      /\*\*([^*]+)\*\*/g,
      '<span class="bold-text">**$1**</span>'
    );

    return escaped;
  }

  function syncScroll(panelA, panelB) {
    var syncing = false;
    panelA.addEventListener("scroll", function () {
      if (syncing) return;
      syncing = true;
      panelB.scrollTop = panelA.scrollTop;
      requestAnimationFrame(function () {
        syncing = false;
      });
    });
    panelB.addEventListener("scroll", function () {
      if (syncing) return;
      syncing = true;
      panelA.scrollTop = panelB.scrollTop;
      requestAnimationFrame(function () {
        syncing = false;
      });
    });
  }

  // Load file and return its content
  function loadFile(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load " + url);
        return response.text();
      })
      .catch(function (err) {
        console.warn("File not loaded:", url, err.message);
        return "";
      });
  }

  // Load both files and compute diff
  function loadAndRenderDiff(containerId) {
    var pair = FILE_PAIRS[containerId];
    if (!pair) {
      console.warn("No file pair configured for:", containerId);
      return Promise.resolve();
    }

    return Promise.all([loadFile(pair.left), loadFile(pair.right)]).then(
      function (contents) {
        var leftContent = contents[0];
        var rightContent = contents[1];

        var leftLines = leftContent.split("\n");
        var rightLines = rightContent.split("\n");

        var diffData = computeDiff(leftLines, rightLines);
        renderDiffViewer(containerId, diffData);
      }
    );
  }

  function init() {
    // Load all configured diff viewers
    var promises = Object.keys(FILE_PAIRS).map(function (id) {
      return loadAndRenderDiff(id);
    });

    Promise.all(promises).then(function () {
      console.log("All diff viewers loaded");
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        Object.keys(FILE_PAIRS).forEach(function (id) {
          var container = document.getElementById(id);
          if (!container) return;
          var diffBody = container.querySelector(".diff-body");
          if (!diffBody) return;
          var lp = diffBody.querySelector(".diff-panel-left");
          var rp = diffBody.querySelector(".diff-panel-right");
          if (lp && rp) alignLineHeights(lp, rp);
        });
      }, 150);
    });
  }

  // Expose API for external use
  window.DiffViewer = {
    loadAndRender: loadAndRenderDiff,
    configure: function (config) {
      Object.assign(FILE_PAIRS, config);
    },
    refresh: init,
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
