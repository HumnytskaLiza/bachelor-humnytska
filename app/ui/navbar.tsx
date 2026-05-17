import styles from "./modules/main.module.css";
import Image from "next/image";
import catPhoto from "@/public/cat.png";
import Link from "next/link";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  return (
    <header
      className="sticky top-0 h-20 flex items-center px-3 z-40 
    bg-gray-50 border-b border-gray-300 w-full box-border"
    >
      <nav
        className="flex w-full items-center text-sm font-medium 
        flex-none justify-between px-5 h-20 gap-6"
      >
        <div
          className={`cursor-pointer text-2xl ${sidebarOpen ? "" : "rotate-90"}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </div>
        <div
          className={`
    flex items-center gap-4 justify-between w-full
    transition-opacity duration-200
    ${sidebarOpen ? "hidden md:flex" : "flex"}
  `}
        >
          <div className={`w-[70%] md:w-[40%] ${styles.search}`}>
            <svg height="12" viewBox="0 0 16 16" width="12">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
                fill="currentColor"
                className="fill-gray-700"
              ></path>
            </svg>
            <span className="text-gray-700 text-xs">Search</span>
          </div>
          <Link
            href="/profile"
            className="h-12 rounded-full border-gray-300 border"
          >
            <Image
              src={catPhoto}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
