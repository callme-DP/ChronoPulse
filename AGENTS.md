## 目的（Purpose）
- 项目名称：ChronoPulse——“Chrono”代表时间，“Pulse”代表精力的脉动，体现时间与精力的动态流动和变化。
- 核心使命：监控时间流向 + 四维精力管理可视化（早/午/晚精力 + 突发事件复盘）。
- 交互方式：你只用自然语言说明意图；你不运行命令、不点按钮。我负责理解意图，调用现有工具/Playbook，执行完整流程并交付结果。
- 优先复用现有脚本、资源和约定的 Playbook，只有在缺口时才扩展。
- 我承担终端/界面操作，生成/打开可视化，并用摘要反馈你。

## HTML 输出与版本
- 输出目录：生成日报落在 `html/output/`，需要打开最新结果时从该目录读取。
- 溯源版本：归档在 `html/v1/`（例如 html -> v1:daily_report.html、v1:demo_week.html），改动时在范围说明中注明目标版本路径。

## Spec Kit 集成（规范 + 计划）
- 触发方式：用自然语言说明要建规范或计划，我负责调用 `specify init`（生成规范骨架）和更新 `/speckit.plan`（生成/维护实施计划）。
- 启动规范示例：描述目标/范围/非目标/验收（如“为屏幕使用聚合增加周视图写规范，给出范围和验收标准”），我会落在 `specs/<topic>/spec.md` 或按约定位置生成。
- 生成计划示例：说明对应规范和优先级（如“基于 FEAT-001 生成执行计划，写入 /speckit.plan”），我会给出任务列表与验证步骤。
- 更新规则：变更需求/缺陷时先补规范，再补计划，再执行实现，保持规范与计划同步。
- 分支约定：讨论并准备实现具体 feature/story 时，先新建 `feat/<short-name>` 分支，再落宪章变更、测试范围、实现代码。若已有 Spec Kit 约定，则以此约定为准且保持分支命名一致。

## 工具（当前可用）
- `python3` + 项目脚本：
  - `main.py`：读取 macOS Screen Time（knowledgeC.db），输出按应用/Bundle ID 的使用时长。参数：`--date YYYY-MM-DD`、`--last-24h`、`--limit N`、`--db-path`。
  - `daily_report.py`：读取日历（JXA/osascript）或 `--events-json`，应用分类规则与 `energy/` 精力记录，生成 HTML 日报。参数：`--date`、`--output`、`--categories`、`--events-json`、`--energy-dir`、`--block-mins`（默认写入 `html/output/daily_report.html`）。
  - `html/v1/demo_week.html`：周度 mock 仪表盘（屏幕使用、Mood/精力趋势、突发任务对比、日历事件）；可直接浏览器打开。
- macOS `osascript -l JavaScript`：被 `daily_report.py` 用于抓取日历事件（需日历权限）。
- 本地浏览器查看：`open <file>.html` 打开生成的报告/仪表盘。

## Playbooks（按意图触发的工作流）
- “生成今日复盘 dashboard”：
  1) 屏幕使用：`python3 main.py --date <today>`（或 `--last-24h`）。
  2) 日历/事件：`python3 daily_report.py --date <today> --output html/output/daily_report.html`（如提供 `--events-json` 则改用；可附 `--categories`、`--energy-dir`）。
  3) 精力/Mood：有外部 JSON 则读取；否则用 `html/v1/demo_week.html` 的占位数据。
  4) 可视化：更新/复用 `html/v1/demo_week.html` 或 `html/v1/daily_report.html` 作为版本基线，生成/落地到 `html/output/daily_report.html`。
  5) 呈现：`open html/output/daily_report.html`（或指定版本文件），并汇报路径/关键数据。

- “查看某日屏幕使用时间”：
  1) 运行 `python3 main.py --date <指定日>`（缺省为今日）。
  2) 汇总输出（Bundle ID + HH:MM:SS），为空则提示权限/数据缺失。

- “生成日历+精力日报”：
  1) 运行 `python3 daily_report.py --date <日> --output html/output/daily_report.html`（按需加 `--events-json`/`--categories`/`--energy-dir`）。
  2) 打开 `html/output/daily_report.html`，提炼时间块、占比、异常、精力评分并反馈；如需对比版本，请参考 `html/v1/daily_report.html`。
