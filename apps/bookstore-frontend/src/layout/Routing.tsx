import {ReactNode} from "react";
import {createBrowserRouter, RouterProvider, useNavigate, useParams} from "react-router-dom";

import {BookIdType} from "../type";
import {Layout as BaseLayout} from './index';
import {
  AuthLoginPage,
  AuthRegistrationPage,
  BookDetailsPage,
  BooksBrowserPage,
  BooksFavoritesPage,
  BooksManagementPage
} from '../view';

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <AuthLoginPageRoute/>,
    },
    {
      path: "/registration",
      element: <AuthRegistrationPageRoute/>,
    },
    {
      path: "/",
      element: <BooksBrowserPageRoute/>,
    },
    {
      path: "/books/:id",
      element: <BookDetailsPageRoute/>,
    },
    {
      path: "/favorites",
      element: <BooksFavoritesPageRoute/>,
    },
    {
      path: "/admin",
      element: <BookManagementPageRoute/>,
    }
  ]);

  return <RouterProvider router={router}/>
}

const Layout = ({
  auth,
  children
}: {
  auth: boolean
  children: ReactNode,
}) => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  }

  const handleNavigateToHomepage = () => {
    navigate('/');
  }

  const handleNavigateToFavorites = () => {
    navigate('/favorites');
  }

  const handleNavigateToManagement = () => {
    navigate('/admin');
  }

  const handleLogoutSuccess = () => {
    navigate('/login');
  }

  return <BaseLayout
    auth={auth}
    onNavigateToHomepage={handleNavigateToHomepage}
    onNavigateToFavorites={handleNavigateToFavorites}
    onNavigateToManagement={handleNavigateToManagement}
    onNavigateToLogin={handleNavigateToLogin}
    onLogoutSuccess={handleLogoutSuccess}
  >
    {children}
  </BaseLayout>;
}

const AuthLoginPageRoute = () => {
  const navigate = useNavigate();

  return <Layout auth={false}>
    <AuthLoginPage
      onLoginSuccess={() => {
        navigate('/');
      }}
      onNavigateToRegistration={() => {
        navigate('/registration');
      }}
    />
  </Layout>;
}

const AuthRegistrationPageRoute = () => {
  const navigate = useNavigate();

  return <Layout auth={false}>
    <AuthRegistrationPage
      onRegistrationSuccess={() => {
        navigate('/');
      }}
    />
  </Layout>;
}

const BooksBrowserPageRoute = () => {
  const navigate = useNavigate();

  return <Layout auth={true}>
    <BooksBrowserPage
      onNavigateToBookDetails={(id: BookIdType) => {
        navigate(`/books/${id}`);
      }}
    />
  </Layout>;
}

const BookDetailsPageRoute = () => {
  const navigate = useNavigate();

  const {id} = useParams() as { id: string };

  return <Layout auth={true}>
    <BookDetailsPage
      id={parseInt(id)}
      onBack={() => {
        navigate(-1);
      }}
    />
  </Layout>;
}

const BooksFavoritesPageRoute = () => {
  const navigate = useNavigate();

  return <Layout auth={true}>
    <BooksFavoritesPage
      onNavigateToBookDetails={(id: BookIdType) => {
        navigate(`/books/${id}`);
      }}
    />
  </Layout>;
}

const BookManagementPageRoute = () => {
  return <Layout auth={true}>
    <BooksManagementPage/>
  </Layout>;
}

export {
  Routing
}
