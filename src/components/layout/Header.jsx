import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 animate-fade-in opacity-0">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-full shadow-sm md:shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl">
        <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/assets/logos/logo2.png"
                alt="MedRx"
                className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl object-cover"
              />
              <div>
                <div className="font-bold text-gray-900 text-[15px] sm:text-lg md:text-xl leading-tight">MedRx</div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:block opacity-70">Secure Prescriptions</div>
              </div>
            </div>
            <nav className="flex items-center gap-3 sm:gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block">About</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block">Help</a>
              <div className="w-px h-5 bg-gray-200 hidden md:block"></div>
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-primary-600 text-white text-xs sm:text-sm font-medium rounded-full hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
              >
                Log In
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
