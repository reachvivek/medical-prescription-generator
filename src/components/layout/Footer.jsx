const Footer = () => {
  const logos = [
    { src: "/assets/logos/trustedby/cleveland.png", alt: "Cleveland Clinic", height: "h-6 sm:h-8 md:h-10" },
    { src: "/assets/logos/trustedby/mayo.png", alt: "Mayo Clinic", height: "h-6 sm:h-8 md:h-10" },
    { src: "/assets/logos/trustedby/kaiser.png", alt: "Kaiser Permanente", height: "h-6 sm:h-8 md:h-10" },
    { src: "/assets/logos/trustedby/fortis.png", alt: "Fortis Healthcare", height: "h-6 sm:h-8 md:h-10" },
    { src: "/assets/logos/trustedby/life.png", alt: "Alsicripts", height: "h-8 sm:h-10 md:h-14" },
  ];

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-50 border-t border-gray-200/50" style={{ backgroundColor: '#F9F9FA' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 md:py-6">
        {/* Copyright Text */}
        <div className="text-center text-xs sm:text-xs text-gray-400 mb-2 sm:mb-3 md:mb-4">
          © {new Date().getFullYear()} Medical Prescription Generator. Designed for clinicians. Built for accuracy.
        </div>

        {/* Partner Logos - Infinite Scroll */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll opacity-40 grayscale">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <img
                key={`logo-1-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.height} object-contain mx-4 sm:mx-6 md:mx-8 flex-shrink-0`}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <img
                key={`logo-2-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.height} object-contain mx-4 sm:mx-6 md:mx-8 flex-shrink-0`}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
