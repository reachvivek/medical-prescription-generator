import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Printer } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.setItem('mock_auth', 'true');
    localStorage.setItem(
      'mock_user',
      JSON.stringify({
        id: 'user-' + Date.now(),
        email: 'doctor@clinic.com',
      })
    );
    navigate('/dashboard');
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Image - Full viewport */}
      <img
        src="/assets/hero/hero_bg.png"
        alt="Medical Professional"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay - subtle for unified look */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex items-center pt-24 pb-40 md:pb-32 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          <div className="max-w-4xl mt-4 sm:mt-16 md:mt-24 lg:mt-32">
            {/* Text content - Left aligned */}
            <h1 className="text-[28px] sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 leading-[1.1] sm:leading-tight md:whitespace-nowrap text-left animate-fade-in-up opacity-0" style={{ color: '#1e293b' }}>
              Medical Prescription Generator
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-8 leading-relaxed opacity-80 text-left animate-fade-in-up opacity-0 delay-100" style={{ color: '#64748b' }}>
              Create professional prescriptions in minutes
            </p>

            {/* Buttons */}
            <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in-up opacity-0 delay-200">
              <div className="flex flex-col items-center w-full md:w-auto">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="w-full md:w-auto min-h-[52px] md:min-h-0 px-8 py-3.5 md:py-3 text-base font-medium rounded-lg shadow-sm md:shadow-lg hover:shadow-md md:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] mb-3 md:mb-4"
                >
                  Create New Prescription
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <button
                  className="text-sm font-medium transition-all duration-200 py-2 opacity-70 hover:opacity-100 hover:translate-x-1"
                  style={{ color: '#0284c7' }}
                  onMouseEnter={(e) => e.target.style.color = '#0369a1'}
                  onMouseLeave={(e) => e.target.style.color = '#0284c7'}
                >
                  View Sample Prescription
                </button>
              </div>
            </div>
          </div>

          {/* Features - Horizontal on all screens */}
          <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-2xl md:max-w-4xl mx-auto mt-6 md:mt-8">
              {/* Instant */}
              <div className="relative pt-5 md:pt-8 animate-scale-in opacity-0 delay-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 md:w-16 md:h-16 bg-sky-50 rounded-lg md:rounded-2xl flex items-center justify-center border-2 md:border-4 border-white shadow-sm">
                    <Zap className="h-4 w-4 md:h-7 md:w-7 text-sky-500" />
                  </div>
                </div>
                <div className="group bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg md:rounded-2xl px-2 pt-6 pb-4 md:p-6 md:pt-12 md:pb-8 text-center border border-gray-100 md:border-gray-200/50 shadow-sm md:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] min-h-[90px] md:min-h-0 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-gray-300">
                  <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-1.5 leading-tight">Instant</h3>
                  <p className="text-[10px] md:text-sm text-gray-600 opacity-75 leading-tight md:leading-relaxed">No setup required</p>
                </div>
              </div>

              {/* Secure */}
              <div className="relative pt-5 md:pt-8 animate-scale-in opacity-0 delay-400">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 md:w-16 md:h-16 bg-sky-50 rounded-lg md:rounded-2xl flex items-center justify-center border-2 md:border-4 border-white shadow-sm">
                    <ShieldCheck className="h-4 w-4 md:h-7 md:w-7 text-sky-500" />
                  </div>
                </div>
                <div className="group bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg md:rounded-2xl px-2 pt-6 pb-4 md:p-6 md:pt-12 md:pb-8 text-center border border-gray-100 md:border-gray-200/50 shadow-sm md:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] min-h-[90px] md:min-h-0 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-gray-300">
                  <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-1.5 leading-tight">Secure</h3>
                  <p className="text-[10px] md:text-sm text-gray-600 opacity-75 leading-tight md:leading-relaxed">HIPAA Compliant</p>
                </div>
              </div>

              {/* Professional */}
              <div className="relative pt-5 md:pt-8 animate-scale-in opacity-0 delay-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 md:w-16 md:h-16 bg-sky-50 rounded-lg md:rounded-2xl flex items-center justify-center border-2 md:border-4 border-white shadow-sm">
                    <Printer className="h-4 w-4 md:h-7 md:w-7 text-sky-500" />
                  </div>
                </div>
                <div className="group bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg md:rounded-2xl px-2 pt-6 pb-4 md:p-6 md:pt-12 md:pb-8 text-center border border-gray-100 md:border-gray-200/50 shadow-sm md:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] min-h-[90px] md:min-h-0 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-gray-300">
                  <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-1.5 leading-tight">Professional</h3>
                  <p className="text-[10px] md:text-sm text-gray-600 opacity-75 leading-tight md:leading-relaxed">Trusted by 500+ doctors</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
