# specs 目录说明

约定参考 Spec Kit 示例结构，每个特性单独一个文件夹，命名为 `FEAT-XXX-<module>`，内部包含：
- `spec.md`：需求/范围/验收
- `plan.md`：实现方案与里程碑
- `tasks.md`：可执行任务清单
- `research.md`：调研与背景
- `quickstart.md`：最小可运行示例或操作指引
- `data-model.md`（可选）：数据模型/接口契约
- `checklists/`、`contracts/`（可选）：检查清单、契约/协议

使用方式：
1) 新建目录：`specs/FEAT-XXX-<module>/`
2) 复制/参考模板文件（可用根目录 `templates/` 下的 spec/plan 模板）
3) 填写以上文件，并在根 `SPEC.md` 记录/引用编号
