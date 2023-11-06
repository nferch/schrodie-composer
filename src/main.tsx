import "@dxosTheme";

import React from "react";
import { createRoot } from "react-dom/client";

import { ClientPlugin } from "@braneframe/plugin-client";
import { ErrorPlugin } from "@braneframe/plugin-error";
import { GraphPlugin } from "@braneframe/plugin-graph";
import { IpfsPlugin } from "@braneframe/plugin-ipfs";
import { LayoutPlugin } from "@braneframe/plugin-layout";
import { MarkdownPlugin } from "@braneframe/plugin-markdown";
import { MetadataPlugin } from "@braneframe/plugin-metadata";
import { NavTreePlugin } from "@braneframe/plugin-navtree";
import { PresenterPlugin } from "@braneframe/plugin-presenter";
import { SketchPlugin } from "@braneframe/plugin-sketch";
import { SpacePlugin } from "@braneframe/plugin-space";
import { StackPlugin } from "@braneframe/plugin-stack";

import { ThemePlugin } from "@braneframe/plugin-theme";
import { EchoDatabase, TypedObject } from "@dxos/echo-schema";
import { SpaceProxy } from "@dxos/client/echo";
import { createApp } from "@dxos/app-framework";
import { MyPlugin } from "./my-plugin";
import { types } from "@braneframe/types";

// TODO(wittjosiah): This ensures that typed objects are not proxied by deepsignal. Remove.
// https://github.com/luisherranz/deepsignal/issues/36
(globalThis as any)[TypedObject.name] = TypedObject;
(globalThis as any)[EchoDatabase.name] = EchoDatabase;
(globalThis as any)[SpaceProxy.name] = SpaceProxy;

const App = createApp({
  plugins: [
    ThemePlugin({ appName: "Schrodie" }),
    // Inside theme provider so that errors are styled.
    ErrorPlugin(),
    GraphPlugin(),
    MetadataPlugin(),
    ClientPlugin({ appKey: "schrodie.dxos.network", types }),

    // UX
    LayoutPlugin(),
    NavTreePlugin(),

    // Data
    SpacePlugin(),
    IpfsPlugin(),
    PresenterPlugin(), // Before Stack.
    MarkdownPlugin(),
    SketchPlugin(),
    StackPlugin(),
    MyPlugin(),
  ],
});

createRoot(document.getElementById("root")!).render(<App />);
