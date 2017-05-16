const permission = (user) => {
  let onlyStaff = false;
  let shouldAuth = false;
  if (user && user.role) {
    shouldAuth = true;
    if (user.role === 'staff') {
      onlyStaff = true;
    }
  }
  return {
    onlyStaff,
    shouldAuth
  };
};

export default permission;
