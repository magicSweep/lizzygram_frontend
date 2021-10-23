declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.jpg" {
  const path: string;
  export = path;
}

declare module "*.jpeg" {
  const path: string;
  export = path;
}

declare module "*.png" {
  const path: string;
  export = path;
}

declare module "*.svg" {
  const path: string;
  export = path;
}
