/**
 * astral を使用して、Basic認証を行うサンプルコードです。
 *
 * ```sh
 * deno run ./authenticate/main.ts
 * ```
 */

import { launch } from "jsr:@astral/astral";

// キャプチャを取得するURL
const CAPTCHA_URL = "https://blog.cateiru.com";

async function main() {
  const browser = await launch({
    // headless を true にすることで実際にブラウザを起動して動作確認ができる:
    // headless: true,
  });

  const page = await browser.newPage();

  // Basic認証の設定
  await page.authenticate({
    username: "username",
    password: "password",
  });

  //  ビューポートサイズの設定
  await page.setViewportSize({
    width: 1280,
    height: 800,
  });

  // UserAgent の設定
  await page.setUserAgent("astral-bot");

  await page.setCookies([
    // 設定したい Cookie を指定する
  ]);

  await page.goto(CAPTCHA_URL);

  await page.close();
  await browser.close();
}

void main();
