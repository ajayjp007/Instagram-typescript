export const loadPosts = () => async (dispatch: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const fetchData = async () => {
      await fetch(
        "http://localhost:5000/api/posts/get-all-posts",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          dispatch({ type: "POST-LOADED", payload: result.posts });
        })
        .catch((error) => console.log("error", error));
    };
    fetchData().catch(console.error);
  } catch (err) {}
};
