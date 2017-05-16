const permission = (user) => {
  let isStaff = false;
  let shouldAuth = false;
  if (user && user.role) {
    shouldAuth = true;
    if (user.role === 'staff') {
      isStaff = true;
    }
  }
  return {
    isStaff,
    shouldAuth
  };
};

export default permission;
