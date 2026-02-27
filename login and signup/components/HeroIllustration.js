function HeroIllustration() {
  const [hoverGreen, setHoverGreen] = React.useState(false);
  const [hoverBlue, setHoverBlue] = React.useState(false);

  try {
    return (
      <div className="h-full w-full relative overflow-hidden noise" data-name="hero" data-file="components/HeroIllustration.js">
        <div className="absolute inset-0" data-name="hero-bg" data-file="components/HeroIllustration.js">
        </div>

        <div className="absolute inset-0 flex items-center justify-center" data-name="hero-stage" data-file="components/HeroIllustration.js">
          <div className="relative w-[min(420px,90%)] h-[280px]" data-name="hero-scene" data-file="components/HeroIllustration.js">
            <div className="absolute inset-x-0 bottom-8 h-20 rounded-[999px] bg-black/25 blur-xl" data-name="hero-shadow" data-file="components/HeroIllustration.js"></div>

            {/* Green Dustbin */}
            <div 
              className="absolute left-20 bottom-14 anim-float cursor-pointer group transform-gpu will-change-transform"
              style={{ animationDelay: "-1.2s" }}
              onMouseEnter={() => setHoverGreen(true)}
              onMouseLeave={() => setHoverGreen(false)}
              data-name="dustbin-green"
            >
              <div className="relative w-24 h-32 mx-auto">
                {/* Lid */}
                <div className="absolute -top-2 left-0 w-24 h-3 bg-green-600 rounded-t-lg shadow-md"></div>
                {/* Handle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-green-700 rounded-full shadow-md"></div>
                {/* Main body - cylindrical */}
                <div className="absolute top-3 left-0 w-24 h-20 bg-gradient-to-b from-green-500 to-green-600 rounded-lg shadow-lg border border-green-700/50"></div>
                {/* Left gradient shine */}
                <div className="absolute top-4 left-2 w-4 h-16 bg-green-400 opacity-30 rounded-full"></div>
                {/* Bottom rim */}
                <div className="absolute bottom-0 left-0 w-24 h-2 bg-green-700 rounded-b-lg shadow-inner"></div>
                {/* Hover text */}
                {hoverGreen && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg animate-fadeIn">
                    dry waste
                  </div>
                )}
              </div>
            </div>

            {/* Blue Dustbin */}
            <div 
              className="absolute right-20 bottom-14 anim-float cursor-pointer group transform-gpu will-change-transform"
              style={{ animationDelay: "-0.8s" }}
              onMouseEnter={() => setHoverBlue(true)}
              onMouseLeave={() => setHoverBlue(false)}
              data-name="dustbin-blue"
            >
              <div className="relative w-24 h-32 mx-auto">
                {/* Lid */}
                <div className="absolute -top-2 left-0 w-24 h-3 bg-blue-600 rounded-t-lg shadow-md"></div>
                {/* Handle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-blue-700 rounded-full shadow-md"></div>
                {/* Main body - cylindrical */}
                <div className="absolute top-3 left-0 w-24 h-20 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg shadow-lg border border-blue-700/50"></div>
                {/* Left gradient shine */}
                <div className="absolute top-4 left-2 w-4 h-16 bg-blue-400 opacity-30 rounded-full"></div>
                {/* Bottom rim */}
                <div className="absolute bottom-0 left-0 w-24 h-2 bg-blue-700 rounded-b-lg shadow-inner"></div>
                {/* Hover text */}
                {hoverBlue && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg animate-fadeIn">
                    wet waste
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HeroIllustration component error:', error);
    return null;
  }
}

