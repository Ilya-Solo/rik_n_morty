// components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link className="text-xl font-bold text-gray-800" href="/">
              MyApp
            </Link>
          </div>
          <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              href="/"
            >
              Главная
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              href="/about"
            >
              О нас
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              href="/contact"
            >
              Контакты
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
