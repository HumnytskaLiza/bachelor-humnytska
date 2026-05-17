"use client";

import NavLinks from "@/app/ui/nav-links";
import { logOut } from "@/lib/actions";

export default function SideNav() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="bg-gray-50 border-r border-gray-300
          transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="w-screen h-full flex flex-col">
          <div className="h-20 border-b border-gray-300"></div>
          <div className="flex grow flex-col justify-between">
            <NavLinks />
            <div
              className="border-gray-300 border-t py-4 px-3 text-sm font-medium m-0 hover:bg-gray-100 md:flex-none md:justify-start md:p-4 md:px-3 
              cursor-pointer flex flex-row gap-4 items-center"
              onClick={logOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-door-closed"
                viewBox="0 0 16 16"
              >
                <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />{" "}
                <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />{" "}
              </svg>
              <p className="block">Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
