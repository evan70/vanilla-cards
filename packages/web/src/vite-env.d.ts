/// <reference types="vite/client" />

declare module 'htmx.org' {
  const htmx: any;
  export default htmx;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
