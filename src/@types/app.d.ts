export interface PageAppProps {
  children: ReactNode;
}

export interface PageLayoutProps {
  children: ReactNode;
  userData: any;
}

export interface PageProps {
  userData: any;
  pageData: any;
}

export interface SigningProps {
  username: string;
  password: string;
  profile: string;
}

export interface SidebarRouteProps {
  path: string;
  name: string;
  icon: string;
  layout: string;
}
