import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <>
    <footer>
      <div className="bg-themeColor text-white p-4 lg:py-10">
        <div className="container w-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h3 className="text-2xl font-bold">Mihalen</h3>
              <p>Gift shop</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Liên hệ</h3>
              <p>Địa chỉ: 123 Đường ABC</p>
              <p>Điện thoại: 0123456789</p>
              <p>Email:
                <a href="mailto:" className="text-blue-400">
                  </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Danh mục</h3>
              <ul>
                <li><a href="/category">Danh mục 1</a></li>
                <li><a href="/category">Danh mục 2</a></li>
                <li><a href="/category">Danh mục 3</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Liên kết</h3>
              <ul>
                <li><a href="/about">Về chúng tôi</a></li>
                <li><a href="/contact">Liên hệ</a></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer