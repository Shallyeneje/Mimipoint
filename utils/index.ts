
export const Auth = {
  getToken: () => {
    const user = JSON.parse(localStorage.getItem("mimipoint_token") || "null");
    if (user) {
      const token = user.token;
      return token;
    } else {
      return null;
    }
  },
};
