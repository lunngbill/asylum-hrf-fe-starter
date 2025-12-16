import { useAuth0 } from '@auth0/auth0-react';

/**
 * Ticket 3: Auth0 login/logout buttons
 */
export const LoggingButtons = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  if (isLoading) return null;

  const handleLogging = () => {
    if (isAuthenticated) {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <button className="nav-btn px-4 py-1" onClick={handleLogging}>
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </button>
  );
}