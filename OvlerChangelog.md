# Changelog of Ovler

## 2024.11.21

1. 更改了deepseek的api调用，使用beta接口，以及支持8k输出
2. 更改了default branch，应该能自动编译了。

## 2024.10.21

尝试增加了schedule，似乎无果。

## 2024.10.13

增加了编译docker镜像并推送到dockerhub的Github Action。

目的地：
<https://hub.docker.com/r/ovler/lobe-chat-database>

目前只有一个`latest`标签。多标签懒得搞了。

## 2024.10.8

1. 更新部分openAI模型调用以适配上游api
2. 更改tts行为：现在会跳过代码块不读
3. 关闭了平滑输出动画， Fix <https://github.com/lobehub/lobe-chat/issues/2594>

    - 但上游貌似有自己的想法，不往上推了

4. 调整Workflow，关闭默认workflow，开启自动跟随上游更新的workflow
