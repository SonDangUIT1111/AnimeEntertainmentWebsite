import React from "react";
import { Image } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useDisclosure } from "@nextui-org/modal";
import { ReceivedCoinDialog } from "@/components/receivedCoinDialog";

const DailyMission = ({
  currentDateTime,
  hasReceivedDailyGift,
  updateLoginLog,
  userId,
  refetchUserCoinAndQCData,
  loginGift,
}) => {
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const date = new Date(currentDateTime);
  const currentDayIndex = date.getDay();
  const [message, setMessage] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDayClick = async () => {
    if (hasReceivedDailyGift) {
      return;
    } // Prevent clicking if gift already received

    const formData = { userId };

    try {
      // Call updateLoginLog with the userId
      setMessage(
        `${daysOfWeek[currentDayIndex]} vui vẻ. Tặng bạn ${loginGift} skycoin nè.`
      );
      onOpen();
      await updateLoginLog(formData);

      // Update the session
      refetchUserCoinAndQCData();
    } catch (error) {
      console.error("Error updating login log or session:", error);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Nhiệm vụ hàng ngày
        </h2>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {daysOfWeek.map((day, index) => {
            // Determine background color based on current day and gift status
            let bgColor = "bg-[#4A4A4A]";
            let cursorStyle = "";
            if (index === currentDayIndex) {
              bgColor = hasReceivedDailyGift ? "bg-[#4A4A4A]" : "bg-[#DA5EF0]";
              cursorStyle = "cursor-pointer";
            } else if (index < currentDayIndex) {
              bgColor = "bg-[#4A4A4A]";
            } else if (index > currentDayIndex) {
              bgColor = "bg-[#2A2A2F]";
            }

            return (
              <div
                key={day}
                className={`flex flex-col items-center rounded-lg p-2 space-y-1 ${bgColor} ${cursorStyle}`}
                onClick={index === currentDayIndex ? handleDayClick : undefined} // Add click handler only for the current day
              >
                <span className="text-xs text-gray-300 font-bold text-center">
                  {day}
                </span>
                <Image src="/skycoin.png" alt="star" width={25} height={25} />
                <span className="text-xs text-[#FF9100]">x{loginGift}</span>
              </div>
            );
          })}
        </div>
      </div>
      <ReceivedCoinDialog
        message={message}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default DailyMission;
