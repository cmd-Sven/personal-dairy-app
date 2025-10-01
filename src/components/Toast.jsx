import { useState, useEffect } from 'react';

/**
 * Toast Notification - Star Trek LCARS Style
 * System Status Messages
 */
function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const colors = {
    success: 'from-[#9999ff] to-[#cc99cc]',
    error: 'from-[#cc6666] to-[#ff6666]',
    warning: 'from-[#ff9c00] to-[#ffcc99]',
    info: 'from-[#9999ff] to-[#9999ff]',
  };

  const textColors = {
    success: 'text-[#0a0e27]',
    error: 'text-white',
    warning: 'text-[#0a0e27]',
    info: 'text-white',
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`bg-gradient-to-r ${colors[type]} ${textColors[type]} px-8 py-5 rounded-none shadow-2xl flex items-center gap-4 min-w-[350px] border-4 border-opacity-50 backdrop-blur-sm relative overflow-hidden`}
        style={{ borderColor: type === 'success' ? '#ccccff' : type === 'error' ? '#ff9999' : type === 'warning' ? '#ffcc99' : '#9999ff' }}
      >
        {icons[type]}
        <span className="font-black flex-1 text-lg uppercase tracking-wider">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="hover:bg-white/20 rounded-none p-2 transition-colors border-2 border-current"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Data stream effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent data-stream pointer-events-none"></div>
        
        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-white/40"
          style={{
            width: '100%',
            animation: `shrink ${duration}ms linear`
          }}
        ></div>
      </div>
      
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export default Toast;