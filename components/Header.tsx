import Image from "next/image";

const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex items-center w-full">
          <a href="#" className="flex items-center">
            <Image
              src="/logo TCU mujer pnjs-13.png"
              className="mr-3 h-6 sm:h-9"
              alt="TCU Logo"
              width={50}
              height={50}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              DBWM
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
