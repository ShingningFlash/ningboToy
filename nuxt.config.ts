// https://nuxt.com/docs/api/configuration/nuxt-config
interface MyConfig {
  server: {};
  app: {
    head: {
      title: string;
    };
    pageTransition: {
      name: string;
      mode: string;
    };
    layoutTransition: {
      name: string;
      mode: string;
    };
    script: object[];
  };

//   nitro: {};
  devtools: {
    enabled: boolean;
  };
  modules: string[];
}

const config: MyConfig = {
  server: {
    port: 3001,
  },
  app: {
    head: {
      title: "NINGO EUFN TOYS CO.,LTD",
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    script: [
      {
        type: "text/javascript",
        src: "https://webapi.amap.com/maps?v=2.0&key=9ac02314779bcc0e257bf335121e5bbc&plugin=AMap.Geolocation,AMap.Geocoder",
      },
    ],
  },

  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-swiper",'@element-plus/nuxt'],
//   nitro: {
//     devProxy: {
//       "/api": {
//         // target: "https://www.efuntoys.cn/api", // 这里是接口地址
//         target: "https://ylwj.ydlweb.com/api", // 这里是接口地址
//         changeOrigin: true,
//         prependPath: true,
//       },
//     },
//   },
};

export default defineNuxtConfig(config);
