import createUser from "./createUser";

const populateUsers = async () => {
  const data = [
    {
      username: "admin",
      password: "admin",
      is_admin: true,
    }
  ];

  for (let i = 0; i < data.length; i++) {
    await createUser(data[i]);
  }
};

export default populateUsers;
