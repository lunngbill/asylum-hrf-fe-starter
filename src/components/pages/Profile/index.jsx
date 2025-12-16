import { useAuth0 } from '@auth0/auth0-react';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Protected behavior
  if (!isAuthenticated) {
    return (
      <div className="text-center p-4">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>

      {user?.picture && (
        <img
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
      )}

      <p className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>

      {user.email && (
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
      )}
    </div>
  );
};

export default Profile;
