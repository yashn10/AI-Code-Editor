import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-10`}
            style={{
                ...style,
                right: '10px',
                width: 'auto',
                height: 'auto',
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} z-10`}
            style={{
                ...style,
                left: '10px',
                width: 'auto',
                height: 'auto',
                zIndex: 10,
            }}
            onClick={onClick}
        />
    );
}

const IntroductionCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768, // screens < 768px
                settings: {
                    fade: false,   // Disable fade on mobile for smoother performance
                    speed: 300,
                },
            },
        ],
    };

    return (

        <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] bg-gray-200">
            <Slider {...settings} className="h-full relative">
                {/* Slide 1 */}
                <div className="relative w-full h-full">
                    <img
                        src="https://picsum.photos/seed/aiwebdev/1600/900"
                        alt="AI Web Development"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                        <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold text-center max-w-3xl leading-relaxed">
                            Our application leverages advanced AI to streamline web development,
                            offering you instant code generation and live previews directly in your browser.
                        </h2>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative w-full h-full">
                    <img
                        src="https://picsum.photos/seed/teamaicollab/1600/900"
                        alt="Team Collaboration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                        <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold text-center max-w-3xl leading-relaxed">
                            Collaborate with your team, generate full-stack solutions, and
                            integrate third-party libraries—all from a single, intuitive interface.
                        </h2>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative w-full h-full">
                    <img
                        src="https://picsum.photos/seed/fasterdeploy/1600/900"
                        alt="Faster Deploy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                        <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold text-center max-w-3xl leading-relaxed">
                            Build, iterate, and deploy projects faster than ever before with
                            our streamlined setup and boilerplate process.
                        </h2>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="relative w-full h-full">
                    <img
                        src="https://picsum.photos/seed/creativeinterface/1600/900"
                        alt="Creative Interface"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                        <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold text-center max-w-3xl leading-relaxed">
                            Focus on creativity and functionality, while our AI takes care of
                            the heavy lifting in code generation and architecture.
                        </h2>
                    </div>
                </div>
            </Slider>
        </section>

    );
};

export default IntroductionCarousel;
