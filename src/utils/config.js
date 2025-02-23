export const getConfig = () => ({
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  