import { Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const payload = await req.json();

  // 只处理 PR 事件
  if (payload.action !== "opened" && payload.action !== "synchronize") {
    return NextResponse.json({ ok: true });
  }

  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const pull_number = payload.pull_request.number;

  // 初始化 GitHub App 客户端
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
      installationId: payload.installation.id,
    },
  });

  // 获取 diff
  const pr = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: { format: "diff" }
  });

  const diffText = pr.data;

  // 调 Codex API 执行审查
  const codexResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CODEX_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      input: `请作为专业代码审查机器人，对以下 Pull Request diff 进行全面审查：\n\n${diffText}`
    })
  });

  const result = await codexResponse.json();
  const review = result.output_text || "No review result.";

  // 回写评论
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pull_number,
    body: `🤖 **Codex Review Bot**\n\n${review}`
  });

  return NextResponse.json({ ok: true });
}
