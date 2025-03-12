import { createI18n } from "vue-i18n";

// JSON을 동적으로 가져오는 함수
function loadLocaleMessages() {
  const locales: any = import.meta.glob("./_locales/**/**/*.json", {
    eager: true,
  });
  const messages: Record<string, any> = {};

  Object.keys(locales).forEach((path) => {
    // path 예시: './locales/en/main.json' -> ['.', 'locales', 'en', 'main.json']
    const [, , locale, file] = path.split("/");
    const moduleName = file.replace(".json", "");

    if (!messages[locale]) {
      messages[locale] = {};
    }
    // JSON 데이터 병합
    messages[locale][moduleName] = locales[path].default;
  });

  return messages;
}

// i18n 설정
const i18n = createI18n({
  locale: navigator.language.startsWith("ko") ? "kr" : "en", // 기본 언어 설정
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});

export default i18n;
