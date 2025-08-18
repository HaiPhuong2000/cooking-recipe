import bannerImage from '@/assets/img/banner.webp';
import { useState, useEffect } from 'react';

export const Banner = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bannerImage;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div>
      <section className="relative h-96  overflow-hidden">
        {/* Ảnh banner với hiệu ứng blur khi đang tải */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
            isImageLoaded ? '' : 'blur-xl scale-110'
          }`}
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold mb-4">
                Khám phá công thức nấu ăn mới
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Tìm kiếm công thức nấu ăn đến từ mọi nơi trên thế giới cho mọi
                bữa ăn.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
