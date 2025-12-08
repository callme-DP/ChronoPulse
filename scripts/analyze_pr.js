import axios from "axios";
import simpleGit from "simple-git";

const git = simpleGit();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.GITHUB_REF.split("/")[2];

// ---------------------
// 获取 PR diff
// ---------------------
async function getPRDiff() {
  const res = await axios.get(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}`,
    {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    }
  );

  const diffRes = await axios.get(res.data.diff_url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });

  return diffRes.data;
}

// ---------------------
// 调用 OpenAI
// ---------------------
async function aiReview(diff) {
  const prompt = `
你是高级架构师 + speckit 分析器。

请基于 speckit/config.yaml 的一致性规则，对以下 PR diff 做全面审查：

需要输出：

## 1. 变更摘要
（说明本次修改了哪些模块、功能影响范围）

## 2. 一致性检查结果
（命名、分层、结构是否符合项目规范）

## 3. 潜在风险
（可能出错的地方、隐藏 bug、性能隐患）

## 4. 建议修复方案
（每条建议要清晰且可执行）

## 5. 最终审查结论
（Approve / Request changes）

以下是 diff：

${diff.substring(0, 15000)}
`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    },
    {
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    }
  );

  return response.data.choices[0].message.content;
}

// ---------------------
// 发布评论
// ---------------------
async function postComment(body) {
  await axios.post(
    `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`,
    { body },
    { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
  );
}

// ---------------------
// 主执行流程
// ---------------------
async function main() {
  console.log("🚀 正在获取 PR diff...");
  const diff = await getPRDiff();

  console.log("🚀 正在调用 OpenAI 审查代码...");
  const review = await aiReview(diff);

  console.log("🚀 正在向 GitHub 发布评论...");
  await postComment(`
## 🤖 AI 自动代码审查结果（OpenAI + Speckit）

${review}

---
由 **Lumi Dev Reviewer** 自动生成。
`);

  console.log("✅ 审查完成！");
}

main().catch(err => {
  console.error("❌ 执行失败：", err.message);
});
