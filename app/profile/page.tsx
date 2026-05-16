import Header from "../ui/header";
import Image from "next/image";
import Button from "../ui/button";
import DetailCard from "../ui/detail-card";
import catPhoto from "@/public/cat.png";
import { getUserRoleAction } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const role = await getUserRoleAction();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Header type="header" name="💼 My Profile" />
      <div
        className={`h-40 w-full ${role === "admin" ? "bg-[#808bc5]" : "bg-[#ED773C]"} rounded-2xl border border-gray-300`}
      />
      <div className="relative pt-0">
        <div className="flex items-center gap-4 -mt-16">
          <div className="h-30 w-30 rounded-full border-4 border-white bg-gray-300 overflow-hidden">
            <Image
              src={catPhoto}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold mt-9">
            {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
          </h1>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            text="Edit Profile"
            type="main"
            buttonType="button"
            svg="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
          />
        </div>
        <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          <DetailCard
            header="Job Position"
            content={role === "admin" ? "Mentor" : "Developer"}
          />
          <DetailCard
            header="Level"
            content={role === "admin" ? "Senior" : "Junior"}
          />
          <DetailCard
            header="Email"
            content={
              user?.email === undefined ? "example@gmail.com" : user?.email
            }
          />
          <DetailCard
            header="Phone"
            content={
              user?.user_metadata?.phone === undefined
                ? "example@gmail.com"
                : user?.user_metadata?.phone
            }
          />
        </div>
      </div>
    </div>
  );
}
