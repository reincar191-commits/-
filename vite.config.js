import {defineConfig} from 'vite';

export default defineConfig({
 build:{rollupOptions:{output:{manualChunks:{motion:['gsap','gsap/ScrollTrigger'],react:['react','react-dom','react-dom/client']}}}}
});
