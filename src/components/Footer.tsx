export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RecipeBook</h3>
            <p className="text-gray-400 mb-4">
              Tìm kiếm công thức nấu ăn đến từ mọi nơi trên thế giới cho mọi bữa
              ăn.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Danh mục</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Bữa sáng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Bữa trưa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Bữa tối
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Tiệc đặc biệt
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Ẩm thực</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Việt Nam
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Trung Quốc
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Nhật Bản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white cursor-pointer">
                  Hàn quốc
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
