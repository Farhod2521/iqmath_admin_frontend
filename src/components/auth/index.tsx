import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";
import { selectIsAuthenticated, selectIsStaff } from "@/store/auth/authSlice";

interface IAuthProps {
  children?: React.ReactNode;
}

function Auth({ children }: IAuthProps) {
  // const isAuthenticated = useAppSelector(selectIsAuthenticated)

  // const isStaff = useAppSelector(selectIsStaff)

  return <>{children}</>;
  // if (isAuthenticated && isStaff) {
  // } else {
  //   return <Navigate to="/" replace />
  // }
}

export default Auth;
