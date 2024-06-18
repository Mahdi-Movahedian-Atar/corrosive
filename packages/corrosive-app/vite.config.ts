import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {vitePluginTypescriptTransform} from "vite-plugin-typescript-transform"
import ts from "typescript"


export default defineConfig((): UserConfig => {
  return {
    plugins: [
      vitePluginTypescriptTransform({
        enforce:"pre",
        filter: {
          files:{
            include: /.tsx?$./
          }
        },
            tsconfig:{
              override:{
                jsx: ts.JsxEmit.Preserve
              }
            }
      }),
        qwikCity({trailingSlash: false}), qwikVite(), tsconfigPaths()],
    server: {
      hmr:{overlay: false},
      fs:{
        cachedChecks: false
      },
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});