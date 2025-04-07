"use client";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/pageheader";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComplaint } from "@/api/data/complaints";
import { getUserId } from "@/utils";
import toast from "react-hot-toast";

const ComplaintForm = () => {
  const [transactionId, setTransactionId] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const disabled = !transactionId || !complaint;
  const router = useRouter();
  const { mutateAsync: createComplaint } = useCreateComplaint();
  const user_id = getUserId();

  const clearInputs = () => {
    setTransactionId("");
    setComplaint("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (disabled) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    if (!user_id) {
      toast.error("User ID is required.");
      return;
    }

    setLoading(true);

    try {
      await createComplaint({
        user_id,
        transaction_id: transactionId,
        complaint,
      });
      toast.success("Complaint submitted successfully.");
      router.push("/complaints/submitFeedback"); // Redirect to feedback page
    } catch (error: any) {
      toast.error("Error submitting complaint. Please try again.");
    } finally {
      setLoading(false);
      clearInputs(); // Clear inputs after submission
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-4">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Complaints"
        description="submit your complaints and be rest assured that we will reach out to you immediately"
      />

      <div className="flex justify-center items-center p-4 pt-2 mt-5">
        <div className="w-full max-w-md bg-white p-8  rounded-[6px]">
          <h1 className="text-xl font-bold text-center text-[#00005D] mb-6">
            Complaints Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <Label className="" htmlFor="transactionId">
                Transaction ID
              </Label>
              <Input
                type="text"
                id="transactionId"
                placeholder="Enter your transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="" htmlFor="complaint">
                Complaint
              </Label>
              <Textarea
                placeholder="Enter your complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                required
                className="resize-none h-27"
              />
            </div>

            <Button
              type="submit"
              disabled={disabled || loading}
              className="w-full bg-[#00005D] text-white py-3 mt-3 rounded-md font-bold text-[16px]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <CgSpinner className="animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Complaint"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
