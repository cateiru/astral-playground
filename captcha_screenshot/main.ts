/**
 * astral を使用してブラウザページのスクリーンショットを取得する例
 *
 * ```sh
 * deno run ./captcha_screenshot/main.ts
 * ```
 */

import { launch } from "jsr:@astral/astral";

// キャプチャを取得するURL
const CAPTCHA_URL = "https://blog.cateiru.com";

/**
 * astral を使用してブラウザページのスクリーンショットを取得する例
 */
async function main() {
  const browser = await launch({
    // headless を true にすることで実際にブラウザを起動して動作確認ができる:
    // headless: true,
  });

  const page = await browser.newPage(CAPTCHA_URL);

  // スクリーンショットを取得する前にビューポートサイズを設定する
  // このサイズの画像が取得される
  await page.setViewportSize({
    width: 1280,
    height: 800,
  });

  // image: Uint8Array<ArrayBufferLike>
  const image = await page.screenshot();
  Deno.writeFileSync(`${import.meta.dirname}/image.png`, image);

  await page.close();
  await browser.close();
}

void main();
