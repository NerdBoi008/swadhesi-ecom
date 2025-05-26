import { testimonials } from '@/lib/constant';
import { motion } from 'motion/react';
import { useRef } from 'react';

export const TestimonialsSection = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container-x-padding flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold font-secondary">Endorsements</h1>
      
      {/* Scrollable Container */}
      <motion.div 
        ref={testimonialsRef}
        className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6"
        style={{
          padding: '1rem 0',
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          msOverflowStyle: 'none' // Hide scrollbar in IE
        }}
      >
        {/* Hide scrollbar in WebKit browsers */}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
              
        <div className='flex gap-6 px-4 p-[1rem_0]'>
            {testimonials?.map(({ id, quote, author, location, rating }) => (
            <motion.div
                key={id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-6 bg-white rounded-lg shadow-md snap-center border"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < rating ? '⭐' : '☆'}</span>
                ))}
                </div>
                <p className="text-lg italic mb-4">&quot;{quote}&quot;</p>
                <p className="font-semibold">— {author}, {location}</p>
            </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Navigation Dots (Optional) */}
      <div className="flex gap-2 mt-4">
        {testimonials?.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              testimonialsRef.current?.scrollTo({
                left: index * testimonialsRef.current?.offsetWidth,
                behavior: 'smooth'
              });
            }}
            className="w-3 h-3 rounded-full bg-gray-300 hover:bg-[#bc6c25] transition-colors"
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};