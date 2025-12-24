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
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[320px] text-center">

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl">
              {user.email?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        {/* Email */}
        <h2 className="text-lg font-semibold">{user.email}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

        {/* Logout button */}
        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
