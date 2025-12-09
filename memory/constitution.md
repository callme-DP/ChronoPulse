# [PROJECT_NAME] 宪章
<!-- 示例：Spec 宪章、TaskFlow 宪章等 -->

## 核心原则

### [PRINCIPLE_1_NAME]
<!-- 示例：I. Library-First -->
[PRINCIPLE_1_DESCRIPTION]
<!-- 示例：每个特性先做成独立库；库需自包含、可独立测试、可文档化；必须有明确目的——不要仅为组织结构而建库 -->

### [PRINCIPLE_2_NAME]
<!-- 示例：II. CLI Interface -->
[PRINCIPLE_2_DESCRIPTION]
<!-- 示例：每个库都通过 CLI 暴露能力；文本入/出协议：stdin/args → stdout，错误 → stderr；同时支持 JSON 与人类可读格式 -->

### [PRINCIPLE_3_NAME]
<!-- 示例：III. Test-First（强制） -->
[PRINCIPLE_3_DESCRIPTION]
<!-- 示例：TDD 强制：先写测试 → 用户确认 → 测试失败 → 再实现；严格执行红-绿-重构循环 -->

### [PRINCIPLE_4_NAME]
<!-- 示例：IV. 集成测试 -->
[PRINCIPLE_4_DESCRIPTION]
<!-- 示例：需重点做集成测试的场景：新库契约测试、契约变更、服务间通信、共享 schema -->

### [PRINCIPLE_5_NAME]
<!-- 示例：V. 可观测性、VI. 版本与破坏性变更、VII. 简单性 -->
[PRINCIPLE_5_DESCRIPTION]
<!-- 示例：文本 I/O 便于调试；要求结构化日志；或：MAJOR.MINOR.BUILD 版本格式；或：保持简单，遵循 YAGNI -->

## [SECTION_2_NAME]
<!-- 示例：附加约束、安全要求、性能标准等 -->

[SECTION_2_CONTENT]
<!-- 示例：技术栈要求、合规标准、部署策略等 -->

## [SECTION_3_NAME]
<!-- 示例：开发流程、评审流程、质量门禁等 -->

[SECTION_3_CONTENT]
<!-- 示例：代码评审要求、测试门禁、部署审批流程等 -->

## 需求与规范编写标准
- 用业务语境描述（例如“客户下单100件衣服，打印，应该收90块”）。
- 用 Given-When-Then 描述场景。
- 不描述实现细节（如“某字段 should be defined”“应该调用某方法”）。

## 质量标准
- ✅ 用业务语境描述（如“客户下单100件衣服，九折应收900块”）。
- ✅ 用 Given-When-Then 结构描述场景。
- ❌ 不写实现细节（如“某字段 should be defined”“应该调用某方法”）。
- 📄 详细指南：见 `memory/constitution-guide.md`（待补充）。
- **4)** 开发效率 = 运行效率：能复用框架/库就复用，无框架时交付优先。
- **5)** Spec 驱动开发：遵循 Spec → Plan → Code，每个物料注明验证路径。
- **6)** AI 协作（70/30）：AI 做 CRUD/模板/文档等重复工作；人类负责业务决策、设计与边界条件，避免无关改动。
- **7)** 稳定交付：交付物必须可运行、可验证、可追踪；关键决策和日志需留痕，避免隐性知识。

## 文档规范
- 目录：`specs/` 下每个 feature 建独立子目录（含 `spec.md`/`plan.md`/`tasks.md` 等）。
- 汇总：顶层 `docs/` 及 `docs/README.md` 做索引；知识库/运行手册放 `docs/`，状态/合规记录放 `docs/reports/`。
- 快速入门：为新成员提供 `specs/<feature>/quickstart.md` 或类似指引文件。
- 变更记录：关键结论/合并说明放 `MERGE_NOTES.md` 或 `*_STATUS.md`，便于追踪。
- 一致性：命名、结构、层级遵循 Spec→Plan→Code 流程；文档与实现保持同步更新。

## 治理
<!-- 示例：宪章优先于其他实践；修订需文档、审批、迁移计划 -->

[GOVERNANCE_RULES]
<!-- 示例：所有 PR/评审需核对合规；复杂度需有理由；运行期开发指引见 [GUIDANCE_FILE] -->

**版本**: [CONSTITUTION_VERSION] | **通过日期**: [RATIFICATION_DATE] | **最近修订**: [LAST_AMENDED_DATE]
<!-- 示例：版本：2.1.1 | 通过日期：2025-06-13 | 最近修订：2025-07-16 -->
