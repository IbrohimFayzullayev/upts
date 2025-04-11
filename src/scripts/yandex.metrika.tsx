import { useEffect } from "react";

declare global {
  interface Window {
    ym: YandexMetrikaFunction;
  }
}

interface YandexMetrikaFunction {
  (...args: any[]): void;
  a?: any[];
  l?: number;
}

const YandexMetrika = () => {
  useEffect(() => {
    const scriptId = "yandex-metrika-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";

    script.onload = () => {
      if (!window.ym) {
        const ymFunc = function (...args: any[]) {
          (ymFunc.a = ymFunc.a || []).push(args);
        } as YandexMetrikaFunction;

        ymFunc.l = +new Date();
        window.ym = ymFunc;
      }

      window.ym(100026420, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    };

    document.head.appendChild(script);
  }, []);

  return null;
};

export default YandexMetrika;
