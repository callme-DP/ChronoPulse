# 任务清单（待拆分）

参考 SPEC 中 T1–T9，可按以下分组落地：
- 示例与校验：`events.sample.json`、`categories.json`、字段/越界/空数据提示。
- Mood 写入脚本：早/午/晚 CLI 追加 + 200KB 滚动。
- 周级数据：汇总 Screen Time + Calendar + Mood → 周级 JSON。
- 周报改造：页面/模板接收周级 JSON，缺值占位。
- 校验与归档：耗时=事件合计、Mood 缺段提示；`html/v1/daily|weekly` 快照。
- 类别映射与时间口径：按日历名映射类别；直接用事件 start/end，日/周/月/年不重算。
- 字段调研：确认 Calendar 字段名/时区/标题/备注。
