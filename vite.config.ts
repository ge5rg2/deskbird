import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // Node.js의 path 모듈 가져오기
import { fileURLToPath } from "url"; // ESM에서 __dirname 대체

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite의 loadEnv를 사용하여 환경 변수 로드
export default defineConfig(({ mode }) => {
  // `mode`에 따라 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    css: {
      postcss: "./postcss.config.js", // ✅ PostCSS 파일 직접 지정
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // @를 src 폴더로 설정
      },
    },
    define: {
      "process.env": env, // 환경 변수를 `process.env`로 정의
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        input: "index.html",
      },
    },
  };
});
