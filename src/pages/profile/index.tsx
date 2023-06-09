import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/users", {
          headers: {
            Authorization: process.env.JWT_SECRET,
          },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
};

export default Profile;
