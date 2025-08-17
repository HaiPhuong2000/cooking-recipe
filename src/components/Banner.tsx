export const Banner = () => {
  return (
    <div>
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/src/assets/img/banner.webp)' }}
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
