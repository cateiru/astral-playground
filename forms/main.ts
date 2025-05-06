/**
 * astral を使用して各種のフォーム要素を操作するサンプルコードです。
 *
 * ```sh
 * deno run ./forms/main.ts
 * ```
 */

import { launch } from "@astral/astral";

// see `../index.html`
const TARGET_URL = "https://cateiru.github.io/astral-playground/";

async function main() {
  const browser = await launch({
    // headless を true にすることで実際にブラウザを起動して動作確認ができる:
    // headless: true,
  });

  const page = await browser.newPage(TARGET_URL);

  page.setViewportSize({
    width: 1000,
    height: 1000,
  });

  const formGroupElement = await page.$(".form-group");
  if (formGroupElement == null) {
    throw new Error("formGroupElement is null");
  }

  // type="text"
  const textElement = await formGroupElement.$("input[type='text']");
  if (textElement == null) {
    throw new Error("textElement is null");
  }
  await textElement.type("こんにちは", { delay: 100 });

  // type="button"
  const buttonElement = await formGroupElement.$("input[type='button']");
  if (buttonElement == null) {
    throw new Error("buttonElement is null");
  }
  await buttonElement.click();

  // type="checkbox"
  const checkboxElement = await formGroupElement.$("input[type='checkbox']");
  if (checkboxElement == null) {
    throw new Error("checkboxElement is null");
  }
  await checkboxElement.click();

  // type="radio"
  const radioElement = await formGroupElement.$("input[type='radio']");
  if (radioElement == null) {
    throw new Error("radioElement is null");
  }
  await radioElement.click();

  // type="color"
  const colorElement = await formGroupElement.$("input[type='color']");
  if (colorElement == null) {
    throw new Error("colorElement is null");
  }
  await colorElement.type("#ff0000");

  // type="date"
  const dateElement = await formGroupElement.$("input[type='date']");
  if (dateElement == null) {
    throw new Error("dateElement is null");
  }
  await dateElement.evaluate(
    (element: any, date) => {
      element.value = date;
    },
    { args: ["2023-10-01"] }
  );

  // type="datetime-local"
  const datetimeElement = await formGroupElement.$(
    "input[type='datetime-local']"
  );
  if (datetimeElement == null) {
    throw new Error("datetimeElement is null");
  }
  await datetimeElement.evaluate(
    (element: any, date) => {
      element.value = date;
    },
    { args: ["2023-10-01T12:00"] }
  );

  // type="month"
  const monthElement = await formGroupElement.$("input[type='month']");
  if (monthElement == null) {
    throw new Error("monthElement is null");
  }
  await monthElement.evaluate(
    (element: any, date) => {
      element.value = date;
    },
    { args: ["2023-10"] }
  );

  // type="time"
  const timeElement = await formGroupElement.$("input[type='time']");
  if (timeElement == null) {
    throw new Error("timeElement is null");
  }
  await timeElement.evaluate(
    (element: any, date) => {
      element.value = date;
    },
    { args: ["12:34"] }
  );

  // type="week"
  const weekElement = await formGroupElement.$("input[type='week']");
  if (weekElement == null) {
    throw new Error("weekElement is null");
  }
  await weekElement.evaluate(
    (element: any, date) => {
      element.value = date;
    },
    { args: ["2023-W40"] }
  );

  // type="email"
  const emailElement = await formGroupElement.$("input[type='email']");
  if (emailElement == null) {
    throw new Error("emailElement is null");
  }
  await emailElement.type("test@example.test");

  // type="number"
  const numberElement = await formGroupElement.$("input[type='number']");
  if (numberElement == null) {
    throw new Error("numberElement is null");
  }
  await numberElement.type("1234567890");

  // type="password"
  const passwordElement = await formGroupElement.$("input[type='password']");
  if (passwordElement == null) {
    throw new Error("passwordElement is null");
  }
  await passwordElement.type("password", { delay: 100 });

  // type="range"
  const rangeElement = await formGroupElement.$("input[type='range']");
  if (rangeElement == null) {
    throw new Error("rangeElement is null");
  }
  await rangeElement.evaluate(
    (element: any, value) => {
      element.value = value;
    },
    { args: [90] }
  );

  // select
  const selectElement = await formGroupElement.$("select");
  if (selectElement == null) {
    throw new Error("selectElement is null");
  }
  const selectedValue = "option2";
  await selectElement.evaluate(
    (element: any, v) => {
      const optionElement = element.querySelector(`option[value='${v}']`);
      if (optionElement != null) {
        optionElement.selected = true;
      }
    },
    { args: [selectedValue] }
  );

  // textarea
  const textareaElement = await formGroupElement.$("textarea");
  if (textareaElement == null) {
    throw new Error("textareaElement is null");
  }
  await textareaElement.type("こんにちは", { delay: 100 });

  // 最後に確認のためにスクリーンショットを撮る
  const image = await page.screenshot();
  Deno.writeFileSync(`${import.meta.dirname}/image.png`, image);

  await page.close();
  await browser.close();
}

void main();
