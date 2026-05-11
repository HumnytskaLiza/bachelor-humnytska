import Button from "../button";
import Image from "next/image";
import catPhoto from "@/public/cat.png";
import { EmployeeProfileProps } from "@/lib/definitions";
import DetailCard from "../detail-card";

export default function EmployeeProfilePage({ user }: EmployeeProfileProps) {
  return (
    <div>
      <div className="h-40 w-full bg-[#ED773C] rounded-2xl border border-gray-300" />
      <div className="relative pt-0">
        <div className="flex items-center gap-4 -mt-10">
          <div className="h-30 w-30 rounded-full border-4 border-white bg-gray-300 overflow-hidden">
            <Image
              src={catPhoto}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold mt-9">
            {user.first_name} {user.last_name}
          </h1>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            text="Message"
            type="main"
            buttonType="button"
            svg="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"
          />
          <Button
            text="Edit Profile"
            type="secondary"
            buttonType="button"
            svg="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
          />
        </div>
        <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          <DetailCard header="Job Position" content={user.job_position} />
          <DetailCard header="Level" content={user.level} />
          <DetailCard header="Email" content={user.email} />
          <DetailCard header="Phone" content={user.phone} />
        </div>
      </div>
    </div>
  );
}
