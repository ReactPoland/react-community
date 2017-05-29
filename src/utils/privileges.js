const permission = (user) => {
  let isStaff = false;
  let isAuth = false;
  if (user && user.role) {
    isAuth = true;
    if (user.role === 'staff') {
      isStaff = true;
    }
  }
  return {
    isStaff,
    isAuth
  };
};

export default permission;
