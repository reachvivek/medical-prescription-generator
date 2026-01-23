import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Printer, Download, Maximize2, ChevronDown, FileText, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const Hero = () => {
  const navigate = useNavigate();
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prescriptionRef = useRef(null);

  const handleDownloadPDF = async () => {
    try {
      // Call backend API to generate PDF
      const response = await fetch('http://localhost:3001/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // You can pass prescription data here when needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF from server');
      }

      // Get PDF blob from response
      const blob = await response.blob();

      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `prescription-sample-${new Date().getTime()}.pdf`;
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
      setShowDownloadDropdown(false);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`Failed to generate PDF: ${error.message}\nMake sure the backend server is running on port 3001.`);
    }
  };

  const handleDownloadImage = async () => {
    if (!prescriptionRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(prescriptionRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = 'prescription-sample.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      setShowDownloadDropdown(false);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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
      <div className="relative h-full flex items-center pt-24 pb-56 md:pb-48 md:pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="max-w-4xl mt-12 sm:mt-28 md:mt-40 lg:mt-48">
            {/* Text content - Left aligned */}
            <h1 className="text-[22px] sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 leading-[1.1] sm:leading-tight md:whitespace-nowrap text-left animate-fade-in-up opacity-0" style={{ color: '#1e293b' }}>
              Medical Prescription Generator
            </h1>
            <p className="text-[13px] sm:text-sm md:text-base mb-8 sm:mb-8 leading-relaxed opacity-80 text-left animate-fade-in-up opacity-0 delay-100" style={{ color: '#64748b' }}>
              Create professional prescriptions in minutes
            </p>

            {/* Buttons */}
            <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in-up opacity-0 delay-200 inline-block">
              <div className="flex flex-col items-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="w-full md:w-auto min-h-[52px] md:min-h-0 px-8 py-3.5 md:py-3 text-sm font-medium rounded-lg shadow-sm md:shadow-lg hover:shadow-md md:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] mb-3 md:mb-4"
                >
                  Create New Prescription
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <button
                  onClick={() => setShowSampleModal(true)}
                  className="text-xs font-medium transition-all duration-200 py-2 opacity-70 hover:opacity-100 hover:translate-x-1"
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
          <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-2xl md:max-w-4xl mx-auto mt-6 md:mt-8 mb-16 md:mb-20">
              {/* Instant */}
              <div className="relative pt-3 md:pt-6 animate-scale-in opacity-0 delay-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 md:w-16 md:h-16 bg-sky-50 rounded-lg md:rounded-2xl flex items-center justify-center border-2 md:border-4 border-white shadow-sm">
                    <Zap className="h-4 w-4 md:h-7 md:w-7 text-sky-500" />
                  </div>
                </div>
                <div className="group bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg md:rounded-2xl px-2 pt-4 pb-2 md:p-4 md:pt-9 md:pb-6 text-center border border-gray-100 md:border-gray-200/50 shadow-sm md:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] min-h-[70px] md:min-h-0 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-gray-300">
                  <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-1.5 leading-tight">Instant</h3>
                  <p className="text-[10px] md:text-sm text-gray-600 opacity-75 leading-tight md:leading-relaxed">No setup required</p>
                </div>
              </div>

              {/* Secure */}
              <div className="relative pt-3 md:pt-6 animate-scale-in opacity-0 delay-400">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 md:w-16 md:h-16 bg-sky-50 rounded-lg md:rounded-2xl flex items-center justify-center border-2 md:border-4 border-white shadow-sm">
                    <ShieldCheck className="h-4 w-4 md:h-7 md:w-7 text-sky-500" />
                  </div>
                </div>
                <div className="group bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg md:rounded-2xl px-2 pt-4 pb-2 md:p-4 md:pt-9 md:pb-6 text-center border border-gray-100 md:border-gray-200/50 shadow-sm md:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] min-h-[70px] md:min-h-0 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-gray-300">
                  <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-1.5 leading-tight">Secure</h3>
                  <p className="text-[10px] md:text-sm text-gray-600 opacity-75 leading-tight md:leading-relaxed">HIPAA Compliant</p>
                </div>
              </div>

              {/* Professional */}
              <div className="relative pt-3 md:pt-6 animate-scale-in opacity-0 delay-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 md:w-16 md:h-16 bg-sky-50 rounded-lg md:rounded-2xl flex items-center justify-center border-2 md:border-4 border-white shadow-sm">
                    <Printer className="h-4 w-4 md:h-7 md:w-7 text-sky-500" />
                  </div>
                </div>
                <div className="group bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg md:rounded-2xl px-2 pt-4 pb-2 md:p-4 md:pt-9 md:pb-6 text-center border border-gray-100 md:border-gray-200/50 shadow-sm md:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] min-h-[70px] md:min-h-0 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-gray-300">
                  <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-1.5 leading-tight">Professional</h3>
                  <p className="text-[10px] md:text-sm text-gray-600 opacity-75 leading-tight md:leading-relaxed">Trusted by 500+ doctors</p>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Sample Prescription Modal */}
      <Modal
        isOpen={showSampleModal}
        onClose={() => setShowSampleModal(false)}
        title="Sample Prescription"
        size={isFullscreen ? "full" : "xl"}
        footer={
          <div className="flex items-center gap-2">
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {/* Dropdown Menu */}
              {showDownloadDropdown && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-sky-600" />
                    <span>Download as PDF</span>
                  </button>
                  <button
                    onClick={handleDownloadImage}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                  >
                    <ImageIcon className="h-4 w-4 text-sky-600" />
                    <span>Download as Image</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      >
        <div ref={prescriptionRef} className="bg-white p-8 border border-gray-200 rounded-lg relative overflow-hidden">
          {/* SAMPLE Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-[120px] font-bold text-red-500/10 rotate-[-45deg] select-none tracking-widest">
              SAMPLE
            </div>
          </div>

          <div className="relative z-0">
            {/* Header */}
            <div className="border-b-2 border-gray-300 pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">City Medical Center</h2>
              <div className="text-sm text-gray-600">
                <p><strong>Dr. Sarah Johnson, MD</strong></p>
                <p>Specialty: Internal Medicine</p>
                <p>License: MED-123456</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>123 Medical Plaza, Suite 200, New York, NY 10001</p>
              </div>
            </div>

            {/* Patient Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> John Smith</div>
                <div><strong>Age:</strong> 45 years</div>
                <div><strong>Gender:</strong> Male</div>
                <div><strong>Contact:</strong> +1 (555) 987-6543</div>
                <div className="col-span-2"><strong>Address:</strong> 456 Oak Street, Brooklyn, NY 11201</div>
              </div>
            </div>

            {/* Clinical Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Information</h3>
              <div className="text-sm space-y-2">
                <div><strong>Diagnosis:</strong> Hypertension (Stage 1), Type 2 Diabetes Mellitus</div>
                <div><strong>Symptoms:</strong> Elevated blood pressure, increased thirst, frequent urination</div>
                <div><strong>Lab Tests:</strong> CBC, Lipid Panel, HbA1c, Fasting Blood Sugar</div>
              </div>
            </div>

            {/* Prescription */}
            <div className="mb-4 bg-sky-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="bg-sky-600 text-white px-2 py-1 rounded mr-2 text-sm">Rx</span>
                Prescription
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border border-sky-200">
                  <p className="font-semibold text-gray-900">1. Lisinopril 10mg</p>
                  <p className="text-sm text-gray-600">Dosage: 1 tablet | Frequency: Once daily | Duration: 30 days</p>
                  <p className="text-sm text-gray-500">Instructions: Take in the morning with water</p>
                </div>
                <div className="bg-white p-3 rounded border border-sky-200">
                  <p className="font-semibold text-gray-900">2. Metformin 500mg</p>
                  <p className="text-sm text-gray-600">Dosage: 1 tablet | Frequency: Twice daily | Duration: 30 days</p>
                  <p className="text-sm text-gray-500">Instructions: Take with meals</p>
                </div>
                <div className="bg-white p-3 rounded border border-sky-200">
                  <p className="font-semibold text-gray-900">3. Aspirin 81mg</p>
                  <p className="text-sm text-gray-600">Dosage: 1 tablet | Frequency: Once daily | Duration: 30 days</p>
                  <p className="text-sm text-gray-500">Instructions: Take after breakfast</p>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-600">
                • Monitor blood pressure daily<br />
                • Check blood sugar levels as directed<br />
                • Follow low-sodium, diabetic-friendly diet<br />
                • Regular exercise (30 minutes daily)<br />
                • Avoid alcohol and smoking
              </p>
            </div>

            {/* Follow-up */}
            <div className="border-t-2 border-gray-300 pt-4">
              <p className="text-sm"><strong>Follow-up Date:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              <p className="text-sm mt-4"><strong>Doctor's Signature</strong></p>
              <p className="text-sm text-gray-500 italic mt-2">Dr. Sarah Johnson, MD</p>
              <p className="text-xs text-gray-400 mt-4">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Hero;
