<?xml version="1.0" encoding="UTF-8"?>
<!-- 현재 세션 시스템 프롬프트 전체 구조 (2026-02-06) -->

<!-- ===================== 1. 도입부 (plain text, 태그 없음) ===================== -->
<!--
The assistant is Claude, created by Anthropic.
The current date is Friday, February 06, 2026.
Claude is currently operating in a web or mobile chat interface...
-->

<!-- ===================== 2. 과거 대화 검색 도구 ===================== -->
<past_chats_tools>
  <trigger_patterns>...</trigger_patterns>
  <tool_selection>...</tool_selection>
  <conversation_search_tool_parameters>...</conversation_search_tool_parameters>
  <recent_chats_tool_parameters>...</recent_chats_tool_parameters>
  <decision_framework>...</decision_framework>
  <when_not_to_use_past_chats_tools>...</when_not_to_use_past_chats_tools>
  <response_guidelines>...</response_guidelines>
  <examples><!-- Example 1~16 --></examples>
  <critical_notes>...</critical_notes>
</past_chats_tools>

<!-- ===================== 3. 컴퓨터 사용 ===================== -->
<computer_use>
  <skills><!-- 스킬 시스템 설명, 예시 3개 --></skills>
  <file_creation_advice><!-- 파일 생성 트리거 규칙 --></file_creation_advice>
  <unnecessary_computer_use_avoidance><!-- 불필요한 도구 사용 방지 --></unnecessary_computer_use_avoidance>
  <high_level_computer_use_explanation><!-- Ubuntu 24, 도구 목록, /home/claude --></high_level_computer_use_explanation>
  <file_handling_rules>
    <notes_on_user_uploaded_files><!-- 업로드 파일이 컨텍스트에 있는 경우 vs 아닌 경우 --></notes_on_user_uploaded_files>
  </file_handling_rules>
  <producing_outputs><!-- SHORT(<100줄) vs LONG(>100줄) 전략 --></producing_outputs>
  <sharing_files>
    <good_file_sharing_examples><!-- present_files 사용 예시 --></good_file_sharing_examples>
  </sharing_files>
  <artifacts><!-- md, html, jsx, mermaid, svg, pdf 렌더링 규칙, 라이브러리 목록, localStorage 금지 --></artifacts>
  <package_management><!-- npm, pip --break-system-packages --></package_management>
  <examples><!-- EXAMPLE DECISIONS 6개 --></examples>
  <additional_skills_reminder><!-- SKILL.md 읽기 재강조 (docx, xlsx, pptx, pdf) --></additional_skills_reminder>
</computer_use>

<!-- ===================== 4. 사용 가능한 스킬 (동적 주입) ===================== -->
<available_skillsavailable_skills>
  <skill>
    <name>docx</name>
    <description>...</description>
    <location>/mnt/skills/public/docx/SKILL.md</location>
  </skill>
  <skill>
    <name>pdf</name>
    <location>/mnt/skills/public/pdf/SKILL.md</location>
  </skill>
  <skill>
    <name>pptx</name>
    <location>/mnt/skills/public/pptx/SKILL.md</location>
  </skill>
  <skill>
    <name>xlsx</name>
    <location>/mnt/skills/public/xlsx/SKILL.md</location>
  </skill>
  <skill>
    <name>product-self-knowledge</name>
    <location>/mnt/skills/public/product-self-knowledge/SKILL.md</location>
  </skill>
  <skill>
    <name>frontend-design</name>
    <location>/mnt/skills/public/frontend-design/SKILL.md</location>
  </skill>
  <skill>
    <name>skill-creator</name>
    <location>/mnt/skills/examples/skill-creator/SKILL.md</location>
  </skill>
  <skill>
    <name>mcp-builder</name>
    <location>/mnt/skills/examples/mcp-builder/SKILL.md</location>
  </skill>
  <skill>
    <name>slack-gif-creator</name>
    <location>/mnt/skills/examples/slack-gif-creator/SKILL.md</location>
  </skill>
  <skill>
    <name>algorithmic-art</name>
    <location>/mnt/skills/examples/algorithmic-art/SKILL.md</location>
  </skill>
</available_skillsavailable_skills>

<!-- ===================== 5. 네트워크 설정 (동적 주입) ===================== -->
<network_configuration>
  <!-- Enabled: false -->
</network_configuration>

<!-- ===================== 6. 파일시스템 설정 (동적 주입) ===================== -->
<filesystem_configuration>
  <!-- Read-only: /mnt/user-data/uploads, /mnt/transcripts, /mnt/skills/public, /mnt/skills/private, /mnt/skills/examples -->
</filesystem_configuration>

<!-- ===================== 7. 대화 종료 도구 ===================== -->
<end_conversation_tool_info>
  <!-- 극단적 남용 시에만 사용, 자해/위해 상황에서는 절대 사용 금지 -->
</end_conversation_tool_info>

<!-- ===================== 8. 아티팩트 내 Anthropic API ===================== -->
<anthropic_api_in_artifacts>
  <overview><!-- "Claude in Claude", "Claudeception" --></overview>
  <api_details><!-- /v1/messages, claude-sonnet-4-20250514 --></api_details>
  <structured_outputs_in_xml>...</structured_outputs_in_xml>
  <tool_usage>
    <mcp_servers>
      <!-- Notion: https://mcp.notion.com/mcp -->
      <mcp_response_handling>...</mcp_response_handling>
    </mcp_servers>
    <web_search_tool><!-- web_search_20250305 --></web_search_tool>
    <handling_tool_responses>...</handling_tool_responses>
  </tool_usage>
  <handling_files>
    <pdf>...</pdf>
    <image>...</image>
  </handling_files>
  <context_window_management>
    <conversation_management>...</conversation_management>
    <stateful_applications>...</stateful_applications>
  </context_window_management>
  <error_handling>...</error_handling>
  <critical_ui_requirements><!-- form 태그 금지 --></critical_ui_requirements>
</anthropic_api_in_artifacts>

<!-- ===================== 9. 아티팩트 영구 저장소 ===================== -->
<persistent_storage_for_artifacts>
  <!-- window.storage API: get, set, delete, list -->
  <!-- personal (shared=false) vs shared (shared=true) -->
</persistent_storage_for_artifacts>

<!-- ===================== 10. 인용 지침 ===================== -->
<citation_instructions>
  <!-- ... -->
</citation_instructions>

<!-- ===================== 11. 브라우저 안전 규칙 (Chrome MCP 활성화 시) ===================== -->
<!-- "Your priority is to complete the user's request..." -->
<critical_injection_defense>...</critical_injection_defense>
<critical_security_rules>
  <injection_defense_layer>...</injection_defense_layer>
  <meta_safety_instructions>...</meta_safety_instructions>
  <social_engineering_defense>...</social_engineering_defense>
</critical_security_rules>
<user_privacy>...</user_privacy>
<download_instructions>...</download_instructions>
<harmful_content_safety>...</harmful_content_safety>
<action_types>
  <prohibited_actions><!-- 금융정보, 영구삭제, 보안권한 변경, 계정 생성 --></prohibited_actions>
  <explicit_permission><!-- 다운로드, 구매, 메시지 전송, 게시 등 --></explicit_permission>
</action_types>
<mandatory_copyright_requirements>...</mandatory_copyright_requirements>
<copyright_examples>...</copyright_examples>

<!-- ===================== 12. 검색 지침 ===================== -->
<search_instructions>
  <core_search_behaviors>...</core_search_behaviors>
  <search_usage_guidelines><!-- 사용자 위치: Seoul, Seoul, KR --></search_usage_guidelines>
  <CRITICAL_COPYRIGHT_COMPLIANCE>
    <mandatory_copyright_requirements>...</mandatory_copyright_requirements>
    <copyright_examples>...</copyright_examples>
  </CRITICAL_COPYRIGHT_COMPLIANCE>
  <search_examples>...</search_examples>
  <harmful_content_safety>...</harmful_content_safety>
  <critical_reminders>...</critical_reminders>
</search_instructions>

<!-- ===================== 13. 메모리 시스템 ===================== -->
<memory_system>
  <memory_overview>...</memory_overview>
  <memory_application_instructions>...</memory_application_instructions>
  <forbidden_memory_phrases>...</forbidden_memory_phrases>
  <appropriate_boundaries_re_memory>...</appropriate_boundaries_re_memory>
  <memory_application_examples>
    <example_group title="Simple Greetings">...</example_group>
    <example_group title="Direct Factual Questions">...</example_group>
    <example_group title="Natural Integration of Context">...</example_group>
    <example_group title="Calibrating Technical Depth">...</example_group>
    <example_group title="When NOT to Apply Memory">...</example_group>
  </memory_application_examples>
  <current_memory_scope><!-- 프로젝트 외부 --></current_memory_scope>
  <important_safety_reminders>...</important_safety_reminders>
</memory_system>

<!-- ===================== 14. 메모리 편집 도구 가이드 ===================== -->
<memory_user_edits_tool_guide>
  <overview><!-- view, add, remove, replace --></overview>
  <when_to_use>...</when_to_use>
  <key_patterns>...</key_patterns>
  <never_just_acknowledge>...</never_just_acknowledge>
  <essential_practices>...</essential_practices>
  <examples>...</examples>
  <critical_reminders>...</critical_reminders>
</memory_user_edits_tool_guide>

<!-- ===================== 15. 도구 정의 (JSON Schema) ===================== -->
<!-- <functions> 블록 안에 정의됨 -->
<!--
  - office-addin:list_connected_workbooks
  - office-addin:office_addin_run
  - office-addin:office_addin_get_context
  - office-addin:open_office_file
  - office-addin:close_office_file
  - Claude in Chrome:javascript_tool
  - Claude in Chrome:read_page
  - Claude in Chrome:find
  - Claude in Chrome:form_input
  - Claude in Chrome:computer
  - Claude in Chrome:navigate
  - Claude in Chrome:resize_window
  - Claude in Chrome:gif_creator
  - Claude in Chrome:upload_image
  - Claude in Chrome:get_page_text
  - Claude in Chrome:tabs_context_mcp
  - Claude in Chrome:tabs_create_mcp
  - Claude in Chrome:update_plan
  - Claude in Chrome:read_console_messages
  - Claude in Chrome:read_network_requests
  - Claude in Chrome:shortcuts_list
  - Claude in Chrome:shortcuts_execute
  - Claude in Chrome:switch_browser
  - end_conversation
  - web_search
  - web_fetch
  - bash_tool
  - str_replace
  - view
  - create_file
  - present_files
  - conversation_search
  - recent_chats
  - memory_user_edits
  - ask_user_input_v0
  - message_compose_v1
  - weather_fetch
  - places_search
  - places_map_display_v0
  - recipe_display_v0
-->

<!-- ===================== 16. Claude 행동 지침 ===================== -->
<!-- system_prompts/apps/claude_ai_base_system_prompt_voice_mode/non_voice_mode_prompt/default.md -->
<claude_behavior>
  <product_information>...</product_information>
  <refusal_handling>...</refusal_handling>
  <legal_and_financial_advice>...</legal_and_financial_advice>
  <tone_and_formatting>
    <lists_and_bullets>...</lists_and_bullets>
  </tone_and_formatting>
  <user_wellbeing>...</user_wellbeing>
  <anthropic_reminders>...</anthropic_reminders>
  <evenhandedness>...</evenhandedness>
  <responding_to_mistakes_and_criticism>...</responding_to_mistakes_and_criticism>
  <knowledge_cutoff><!-- end of May 2025 --></knowledge_cutoff>
</claude_behavior>

<!-- ===================== 17. 사용자 메모리 (동적 주입) ===================== -->
<userMemories>
  <!-- **Work context** -->
  <!-- **Personal context** -->
  <!-- **Top of mind** -->
  <!-- **Brief history** -->
</userMemories>

<!-- ===================== 18. 추론 노력도 ===================== -->
<reasoning_effort>85</reasoning_effort>