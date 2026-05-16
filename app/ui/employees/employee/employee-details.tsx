import Image from "next/image";
import catPhoto from "@/public/cat.png";
import { User } from "@/lib/definitions";
import DetailCard from "../../detail-card";
import Header from "../../header";

export default function EmployeeDetails({ user }: { user: User }) {
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
        <div className="mt-6">
          <Header name="👩‍💻 Employee Personal Information" type="sectionName" />
          <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <DetailCard header="Job Position" content={user.job_position} />
            <DetailCard header="Level" content={user.level} />
            <DetailCard header="Email" content={user.email} />
            <DetailCard header="Phone" content={user.phone} />
          </div>
        </div>
      </div>
    </div>
  );
}
