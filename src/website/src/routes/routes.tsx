import { Login } from '../components/auth/Login/index';
import { Signup } from '../components/auth/Signup/index';
import {
  About,
  ErrorPage,
  Home,
  PrivacyPolicy,
  ProfessionalUserProfile,
  Trades,
} from '../components/pages';

export interface IRoute {
  url: string;
  label?: string;
  isPublic?: boolean;
  showNavigation?: boolean;
  element: JSX.Element;
}

export const routes = Object.freeze<IRoute[]>([
  {
    url: '/',
    label: 'Home',
    isPublic: true,
    showNavigation: true,
    element: <Home />,
  },
  {
    url: 'trades',
    label: 'Oficios',
    isPublic: true,
    showNavigation: true,
    element: <Trades />,
  },
  {
    url: 'about',
    label: 'Sobre Nosotros',
    isPublic: true,
    showNavigation: true,
    element: <About />,
  },
  {
    url: 'privacy-policy',
    label: 'Política de privacidad',
    isPublic: true,
    showNavigation: true,
    element: <PrivacyPolicy />,
  },
  {
    url: 'login',
    label: 'Log In',
    isPublic: true,
    element: <Login />,
  },
  {
    url: 'signup',
    label: 'Signup',
    isPublic: true,
    element: <Signup />,
  },
  {
    url: 'profile',
    isPublic: false,
    element: <ProfessionalUserProfile />,
  },
  {
    url: '*',
    isPublic: false,
    element: <ErrorPage />,
  },
]);
