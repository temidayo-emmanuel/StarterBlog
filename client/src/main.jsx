import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import CategoryPosts from './pages/CategoryPosts';
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Tags from './pages/Tags';
import UserProvider from './context/userContext';





const router = createBrowserRouter([
    {
        path: "/",
        element: <UserProvider><Layout /></UserProvider>,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "posts/:id", element: <PostDetail /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            { path: "profile/:id", element: <UserProfile /> },
            { path: "authors", element: <Authors /> },
            { path: "tags", element: <Tags /> },
            { path: "create", element: <CreatePost /> },
            { path: "posts/:id/edit", element: <EditPost /> },
            { path: "posts/:id/delete", element: <DeletePost /> },
            { path: "posts/categories/:category", element: <CategoryPosts /> },
            { path: "posts/users/:id", element: <AuthorPosts /> },
            { path: "myposts/:id", element: <Dashboard /> },
            { path: "logout", element: <Logout /> },
          

        ]
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

