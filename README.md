# Token Dumper
[![wakatime](https://wakatime.com/badge/user/08bf60cd-1f17-4475-9eb0-d95c9b6cdf72/project/f3ccb06a-43cd-4343-82e0-09f3654c992d.svg)](https://wakatime.com/badge/user/08bf60cd-1f17-4475-9eb0-d95c9b6cdf72/project/f3ccb06a-43cd-4343-82e0-09f3654c992d)

This is a tool for dump user from telegram bots based on [MTCute](https://mtcute.dev/)

## Installation

```bash
pnpm install
```

## Usage

```bash
pnpx tsx src/index.ts
```

### Help

```bash
pnpx tsx src/index.ts --help
```
returns
```txt
Usage: Token Dumper [options] <token>

A tool to dump users from telegram bots tokens

Arguments:
  token                    The token of the bot

Options:
  -V, --version            output the version number
  --apiId <apiId>          The api id of telegram app
  --apiHash <apiHash>      The api hash of telegram app
  -o, --output <output>    The output file
  -s, --step <step>        The step of messages to get (default: "1")
  -c, --count <count>      The count of steps to get (default: "10000")
  -t, --timeout <timeout>  The timeout between steps (default: "5000")
  -h, --help               display help for command

Telegram ID and Hash can be obtained from https://my.telegram.org
```