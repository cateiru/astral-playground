/**
 * astral を使用してブラウザページのスクリーンショットを取得する例
 *
 * ```sh
 * deno run ./captcha_element_screenshot/main.ts
 * ```
 */

import { bold } from "jsr:@std/fmt@1.0.3/colors";
import { launch } from "jsr:@astral/astral";

// キャプチャを取得するURL
const CAPTCHA_URL = "https://blog.cateiru.com/about";
// キャプチャを取得する要素のCSSセレクタ
const CAPTCHA_ELEMENT_SELECTOR = "div.js-about-subscriber";

/**
 * astral を使用してブラウザページのスクリーンショットを取得する例
 */
async function main() {
  const browser = await launch({
    // headless を true にすることで実際にブラウザを起動して動作確認ができる:
    // headless: true,
  });

  const page = await browser.newPage(CAPTCHA_URL);

  await page.setViewportSize({
    width: 1280,
    height: 800,
  });

  const targetElement = await page.$(CAPTCHA_ELEMENT_SELECTOR);
  if (!targetElement) {
    throw new Error("Element not found");
  }

  // CASE1: 要素の絶対位置を取得して、`page.screenshot` メソッドを使用してスクリーンショットを取得する
  // NOTE: `scrollIntoView` をしてしまうと、画面外のサイズ分が取得できないため、スクロールをしていない状態で `boundingBox` を取得する
  const boundingBox = await targetElement.boundingBox();
  if (boundingBox == null) {
    throw new Error("Element bounding box not found");
  }
  const image1 = await page.screenshot({
    captureBeyondViewport: true,
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height,
      scale: 1,
    },
  });
  Deno.writeFileSync(`${import.meta.dirname}/image1.png`, image1);

  // CASE2: 要素の `screenshot` メソッドを使用してスクリーンショットを取得する
  const image2 = await targetElement.screenshot({
    // captureBeyondViewport: false,
  });
  Deno.writeFileSync(`${import.meta.dirname}/image2.png`, image2);

  await page.close();
  await browser.close();
}

void main();
