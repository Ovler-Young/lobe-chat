# Changelog of Ovler

## 2025.2.6

1. 修复DeepSeek thinking部分上游修改带来的bug

## 2025.1.21

1. 重新关闭了平滑输出动画。
2. 修改了分支名，以适配新的workflow。
3. workflow 增加 concurrency, 以避免同时运行多个workflow。
4. sync时自动把`lobeThinking`替换为`thinking`, 把`lobeArtifact`替换成`artifact`。
5. fix 自动替换脚本，排除workflow。
6. 自动替换deepseek的api接口为beta接口。
7. fix 自动替换脚本，排除本changelog。

## 2024.11.21

1. 更改了deepseek的api调用，使用beta接口，以及支持8k输出（conflict，已失效）
2. 更改了default branch，应该能自动编译了。

## 2024.10.21

尝试增加了schedule，似乎无果。

## 2024.10.13

增加了编译docker镜像并推送到dockerhub的Github Action。

目的地：
<https://hub.docker.com/r/ovler/lobe-chat-database>

目前只有一个`latest`标签。多标签懒得搞了。

## 2024.10.8

1. 更新部分openAI模型调用以适配上游api（conflict，已失效）
2. 更改tts行为：现在会跳过代码块不读
3. 关闭了平滑输出动画， Fix <https://github.com/lobehub/lobe-chat/issues/2594>

    - 但上游貌似有自己的想法，不往上推了

4. 调整Workflow，关闭默认workflow，开启自动跟随上游更新的workflow
