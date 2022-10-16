import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // console.log(user.userInfo.status);

  return (
    user?.role === "teacher" && user?.userInfo?.status === false
      ? <Navigate to="/waiting-approval" state={{ from: location }} replace />
        : allowedRoles?.includes(user?.role)
          ? <Outlet />
            : user?.role
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;