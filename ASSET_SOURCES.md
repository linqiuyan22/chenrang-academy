# 素材来源与署名

本站未使用任何 AI 生成图像。素材来自「用户自有素材包」与手写 SVG；本版为单文件构建，图像与字体全部以 data URI 内联在 `index.html` 中，下表「原文件」指原始素材包（仓库外，`D:\常用文件合集\魔法学院素材包\`）里的文件。

## 一、用户提供素材

| 原文件 | 站内位置 |
|---|---|
| `aed99788…jpg` | 首页主视觉（`.hero-media`）、入场圆窗内的学院城副本 |
| `437ba28e…png` | 院徽：页首 `brand-crest`、学院章节 `crest-img`、档案卡册 `pass-mini-crest`、页脚 `footer-crest`、`favicon.webp` |
| `huaban-6940165825.png` | 入场星盘中央的太阳（`#mc-sun`） |
| `huaban-5676424521.png` | 学院信息卡四角的金色卷草（`.art-corner`） |
| `huaban-5676428815.png` | 学院章节院徽背光环（`.crest-zodiac-halo`） |
| `75c8df25…jpg` | 建筑 Ⅰ 圣环山谷 |
| `9308bb84…jpg` | 建筑 Ⅱ 苍翠环屿 |
| `huaban-5465493430.png` | 建筑 Ⅲ 巨像圣所 |

处理方式：裁切、缩放、转 WebP；个别图像做了色彩调整以统一色调，未改动画面内容。

## 二、公共领域素材（本版未使用）

早前版本用过 [WelshPixie/vintageart](https://github.com/WelshPixie/vintageart)（授权 **CC0**）的 `frame28.svg`、`ornament9.svg`、`divider29.svg` 三件纹样。本版改为手绘几何 SVG，这三件已不再引用（可用 git 历史 `805a512` 找回）。记录保留以便追溯。

曾下载并试排、最终未采用的：`argemone`、`calendula`、`honeysuckle`、`liliumchalcedonium`、`ornament12/56/61`、`ornates3`、`smallcurls`、`divider34`、`frame20/23/27/29`、`ornament2/3/7/14/24/54/60`、`ornatec5`、`ornatet5`、`pattern4`。

[gwengo/open-collage](https://github.com/gwengo/open-collage) 的仓库 HEAD 只有说明文件，图片资产不在版本库内，未取用。

## 三、字体

| 字体 | 承担什么 | 授权 |
|---|---|---|
| Cormorant Garamond | 正文拉丁文与小字 | SIL OFL 1.1 |
| EB Garamond | 拉丁文、罗马数字、引文 | SIL OFL 1.1 |
| UnifrakturMaguntia | 学院名黑体（`.blackletter`） | SIL OFL 1.1 |
| 中文 | 系统衬线栈（Noto Serif SC / Source Han Serif / Songti SC / SimSun） | 随系统 |

三种拉丁字体均为 latin 子集，woff2 base64 内联，不请求任何外部域名。

## 四、素材包中未进入页面的内容

版式、配色与页面结构的参考图（不是学院本身的视觉资产）：
`18b7efcb…jpg`、`74f1fdf2…jpg`、`8ab959cb…jpg`、`a489aa9e…jpg`、`a79b0ca2…jpg`、`e601b972…jpg`、`f7ea8ae6…jpg`。

其余透明装饰 PNG（星盘、罗盘、天使、书、卷草、花卉、哥特窗、黄道环等）留在素材包中，未引入页面。

## 五、页面内自绘

四大学派的窗形徽章（`<symbol id="emblem-*">`）、彩色玻璃窗与哥特窗框、星盘同心圆与刻度、星空与流星、点线引导符、页面细框、卷草角花之外的所有线条，均为手写 SVG / CSS。
