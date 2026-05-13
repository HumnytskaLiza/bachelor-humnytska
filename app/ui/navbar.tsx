import styles from "./modules/main.module.css";
import Image from "next/image";
import catPhoto from "@/public/cat.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex bg-white border-b border-gray-300">
      <div
        className="flex w-full items-center gap-2 rounded-md
          bg-gray-50 px-5 text-sm font-medium md:flex-none 
          md:justify-between md:px-5 h-20"
      >
        <div className={styles.search}>
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
  );
}
