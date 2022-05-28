export const loadUsers = () => async (dispatch: any) => {
  try {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };
    const fetchAllUsers = async () => {
      await fetch(
        "http://localhost:5000/api/profiles/get-all-users",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          dispatch({ type: "USERS-LOADED", payload: result.users });
        })
        .catch((error) => console.log("error", error));
    };
    fetchAllUsers().catch(console.error);
  } catch (err) {}
};
