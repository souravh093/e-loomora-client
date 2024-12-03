export type TMenuItem = {
  name: string;
  to: string;
  icon: React.ReactNode;
  subMenu?: TSubMenuItem[];
};

export type TSubMenuItem = {
  name: string;
  to: string;
};
