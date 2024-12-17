import Navbar from "../../Components/Navbar/Navbar";
import useMyProfile from "../../Hooks/UsersHook/MyProfileHook";

const MyProfile = () => {
  const { profile, loading, error } = useMyProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      {profile && (
        <div>
          <p>
            <strong>First Name:</strong> {profile.data.user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.data.user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile.data.user.email}
          </p>
          <p>
            <strong>Contact:</strong> {profile.data.user.contact}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {profile.data.user.status ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Role:</strong> {profile.data.user.role}
          </p>
          {profile.profile && (
            <div>
              <p>
                <strong>Profile Picture:</strong>
              </p>
              <img src={profile.data.profile.profilePic} alt="Profile" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
