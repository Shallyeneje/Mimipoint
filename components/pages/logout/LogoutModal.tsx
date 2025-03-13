import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogModal } from "@/components/shared/dialogModal"; // Ensure correct import

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
  return (
    <DialogModal
      open={isOpen}
      setOpen={onClose}
      title={<span className="text-[#00005D] text-xl font-bold">Logout Confirmation</span>}
      description={
        <p className="text-[#00005D] font-medium text-[16px] text-center mt-1">
          You are about to logout. Click <span className="font-bold text-[#00005D]">“Logout”</span> to continue,
          or <span className="font-bold text-[#00005D]">“Cancel”</span> to revert.
        </p>
      }
      showFooter={false}
    >
      <div className="flex justify-center gap-4 mt-1">
        <Button onClick={onLogout} className="bg-[#00005D] text-white px-6 py-2 rounded-[6px] hover:bg-blue-900 transition">
          Logout
        </Button>
        <Button onClick={onClose} className="bg-[#E30B17] text-white px-6 py-2 rounded-[6px] hover:bg-red-700 transition">
          Cancel
        </Button>
      </div>
    </DialogModal>
  );
}
