# ChronoPulse

时间与精力可视化工具，基于 Spec Kit 流程驱动。

## 概览

### 工作流程步骤
1. **speckit.specify** — 创建功能规格  

   ```bash
   speckit.specify "功能描述"
   ```

2. **speckit.clarify** — 澄清需求（推荐）  

   ```bash
   speckit.clarify
   ```

3. **speckit.plan** — 生成设计方案  

   ```bash
   speckit.plan
   ```

4. **speckit.implement** — 生成实现代码  

   ```bash
   speckit.implement
   ```

5. **speckit.analyze** — 生成测试计划与结果汇总  

   ```bash
   speckit.analyze
   ```

### 如何触发五步流程（给 Codex 的指令）
- 启动语句示例：`开始 Feature F123：<一句话目标>`。  
- 我将按顺序引导：Specify → Clarify → Plan（生成 spec/plan/tasks 等文档）→ Implement → Analyze。  
- 每一步都会暂停等待你确认/补充，再进入下一步。  
- 产物落位：`specs/<feature>/` 目录下的 `spec.md`/`plan.md`/`tasks.md` 等，并回填到 README/宪章约定。
