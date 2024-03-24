// vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// devops/vite/change-observer.ts
import * as pathlib from "path";
function logRelevantFileChanges() {
  const fileRegex = /\.(js|svelte|ts)$/;
  return {
    name: "transform-file",
    transform(src, path) {
      if (path.indexOf("/src") > -1 && fileRegex.test(path)) {
        let relativePath = pathlib.relative("./", path);
        console.log("(Changed)", relativePath);
        return {
          code: src,
          map: null
        };
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [logRelevantFileChanges(), svelte()],
  publicDir: "public",
  logLevel: "error",
  server: {
    port: 9135
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiZGV2b3BzL3ZpdGUvY2hhbmdlLW9ic2VydmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjtcbmltcG9ydCB7IGxvZ1JlbGV2YW50RmlsZUNoYW5nZXMgfSBmcm9tIFwiLi9kZXZvcHMvdml0ZS9jaGFuZ2Utb2JzZXJ2ZXIuanNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtsb2dSZWxldmFudEZpbGVDaGFuZ2VzKCksIHN2ZWx0ZSgpXSxcbiAgcHVibGljRGlyOiBcInB1YmxpY1wiLFxuICBsb2dMZXZlbDogXCJlcnJvclwiLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA5MTM0XG4gIH1cbn0pO1xuIiwgImltcG9ydCAqIGFzIHBhdGhsaWIgZnJvbSBcInBhdGhcIjtcblxuLy8gQSBjdXN0b20gcGx1Z2luIHRvIG9ic2VydmUgaW1wb3J0YW50IGNoYW5nZXNcbmV4cG9ydCBmdW5jdGlvbiBsb2dSZWxldmFudEZpbGVDaGFuZ2VzKCkge1xuICBjb25zdCBmaWxlUmVnZXggPSAvXFwuKGpzfHN2ZWx0ZXx0cykkLztcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IFwidHJhbnNmb3JtLWZpbGVcIixcblxuICAgIHRyYW5zZm9ybShzcmMsIHBhdGgpIHtcbiAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIvc3JjXCIpID4gLTEgJiYgZmlsZVJlZ2V4LnRlc3QocGF0aCkpIHtcbiAgICAgICAgbGV0IHJlbGF0aXZlUGF0aCA9IHBhdGhsaWIucmVsYXRpdmUoXCIuL1wiLCBwYXRoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIihDaGFuZ2VkKVwiLCByZWxhdGl2ZVBhdGgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29kZTogc3JjLFxuICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsY0FBYzs7O0FDRHZCLFlBQVksYUFBYTtBQUdsQixTQUFTLHlCQUF5QjtBQUN2QyxRQUFNLFlBQVk7QUFFbEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBRU4sVUFBVSxLQUFLLE1BQU07QUFDbkIsVUFBSSxLQUFLLFFBQVEsTUFBTSxJQUFJLE1BQU0sVUFBVSxLQUFLLElBQUksR0FBRztBQUNyRCxZQUFJLGVBQXVCLGlCQUFTLE1BQU0sSUFBSTtBQUU5QyxnQkFBUSxJQUFJLGFBQWEsWUFBWTtBQUVyQyxlQUFPO0FBQUEsVUFDTCxNQUFNO0FBQUEsVUFDTixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QURqQkEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQzVDLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
