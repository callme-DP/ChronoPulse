# AI PR Review 工作流说明

## 1. 两种审查路径
- **Connector（chatgpt-codex-connector）**：在 PR 评论区直接给出行内建议。提示词封装在 Connector 平台上，可根据需要在该平台修改，仓库内无脚本。
- **GitHub Action Summary**：工作流 `.github/workflows/pr-review.yml` 触发 PR，运行 `scripts/analyze_pr.js`，拉取 diff → 调用模型 → 发表评论。

## 2. Summary 格式在哪里定义？
- 文件：`scripts/analyze_pr.js`
- 位置：`aiReview` 函数内的 `prompt` 字符串，定义了输出模板：
  - `## 1. 变更摘要`
  - `## 2. 一致性检查结果`
  - `## 3. 潜在风险`
  - `## 4. 建议修复方案`
  - `## 5. 最终审查结论`
- 如需调整格式/语言/章节，直接修改该 prompt。

## 3. 运行依赖（当前分支）
- 工作流：`.github/workflows/pr-review.yml`（默认使用 `OPENAI_API_KEY` + `GITHUB_TOKEN`）。
- 脚本：`scripts/analyze_pr.js`（OpenAI Chat Completions；模型默认 `gpt-4.1`）。
- 必需环境变量（Secrets）：
  - `OPENAI_API_KEY`
  - `GITHUB_TOKEN`（GitHub 提供的 `github.token` 也可用）
- 日志位置：GitHub Actions → `Run PR Analyzer` 步骤。

## 4. 可选扩展与注意事项
- 若需切换到其他 API（如 GPTS），需：
  - 在工作流里增加对应 Secrets（如 `GPTSAPI_KEY`、Base URL 等）。
  - 在 `scripts/analyze_pr.js` 增加 API Key/Base URL 选择与回退逻辑，避免缺失 Secret 时直接退出。
  - 保留对 `OPENAI_API_KEY` 的兼容，以免现有 Secret 缺失造成失败。
- 429/限流：可在 `aiReview` 调用处添加指数退避重试，或缩短 diff 截断长度降低 token 消耗。

## 5. 后续改进建议
- 为 429/网络错误增加 2~3 次重试与回退。
- 支持双 provider（GPTS 优先，OpenAI 兜底），确保 Secrets 不全时也能工作。
- 将 prompt 模板抽到配置文件，便于多人协同修改。
