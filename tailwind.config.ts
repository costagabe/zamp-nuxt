import type { Config } from "tailwindcss";

import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ...colors,
        "text-default": "#FF0000",
        "harvest-gold": {
          "50": "#fbf9f1",
          "100": "#f6f1de",
          "200": "#ece0bc",
          "300": "#dfc892",
          "400": "#d3af6c",
          "500": "#c79548",
          "600": "#b9803d",
          "700": "#9a6634",
          "800": "#7c5230",
          "900": "#654429",
          "950": "#362214",
        },
        "fuscous-gray": {
          "50": "#f5f5f1",
          "100": "#e5e5dc",
          "200": "#cdcdbb",
          "300": "#afaf95",
          "400": "#989777",
          "500": "#8a8768",
          "600": "#767058",
          "700": "#5f5949",
          "800": "#544e42",
          "900": "#49433a",
          "950": "#282420",
        },
        sambuca: {
          "50": "#f9f8ed",
          "100": "#f1edd0",
          "200": "#e4dba4",
          "300": "#d4c270",
          "400": "#FFFFFF",
          "500": "#FFFFFF",
          "600": "#9e7830",
          "700": "#7e5a2a",
          "800": "#372315",
          "900": "#261910",
          "950": "#241408",
        },
      },
    },
  },
};
