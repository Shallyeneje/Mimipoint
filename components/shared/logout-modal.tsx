import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { useUser } from "@/providers/context/user-context";

type LogoutModalProps = {
  open: boolean;
  handleToggle: (open: boolean) => void;
};

const LogoutModal = ({ open, handleToggle }: LogoutModalProps) => {
  const router = useRouter();
  // const { setUser } = useUser()

  const clearCookies = () => {
    // Cookies.remove("access_token");
    // Cookies.remove("refresh_token");
  };

  const Logout = () => {
    // clearCookies();
    // setUser(null);
    // router.push("/login");
  };
  return (
    <AlertDialog open={open} onOpenChange={handleToggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to logout?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              Logout();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
