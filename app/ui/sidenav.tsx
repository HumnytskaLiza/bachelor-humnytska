import NavLinks from "@/app/ui/nav-links";
import { logOut } from "@/lib/actions";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col w-40 md:w-50 lg:w-80 bg-gray-50 border-r border-gray-300">
      <div className="h-20 p-3 items-center flex">
        <svg height="20" viewBox="0 0 16 16" width="20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="flex grow flex-col justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div
          className="border-gray-300 border-t p-2 text-sm font-medium m-0 
        hover:bg-gray-100 md:flex-none md:justify-start md:p-4 md:px-3 cursor-pointer
        flex flex-row gap-4 items-center"
          onClick={logOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-door-closed"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
            <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
          </svg>
          <p className="hidden md:block">Sign Out</p>
        </div>
      </div>
    </div>
  );
}
