export const setUser = (userData) => ({
  type: "SET_USER",
  payload: userData,
});

export const resetUser = () => ({
  type: "RESET_USER",
});
