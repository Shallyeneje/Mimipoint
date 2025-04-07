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
import { useClerk } from '@clerk/nextjs'
import { removeToken } from "@/utils";

type LogoutModalProps = {
  open: boolean;
  handleToggle: (open: boolean) => void;
};

const LogoutModal = ({ open, handleToggle }: LogoutModalProps) => {
  const { signOut } = useClerk() 

  const Logout = async () => {
    try {
      removeToken();
      await signOut({ redirectUrl: '/' });
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          <AlertDialogAction onClick={Logout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
