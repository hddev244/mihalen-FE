import Image from 'next/image';
import React from 'react';
import p1 from '@images/icons/policies_icon_1.webp';
import p2 from '@images/icons/policies_icon_2.webp';
import p3 from '@images/icons/policies_icon_3.webp';
import p4 from '@images/icons/policies_icon_4.png';


function ServiceComponent() {
    return (
        <section className="w-full grid grid-cols-2 lg:grid-cols-4 py-14 gap-2">
        <div className="flex flex-col items-center">
            <Image
              src={p1}
              className=" w-16 aspect-square mb-2 object-cover"
              alt="banner-1"
              // layout="responsive"
               />
          <h2 className=" text-lg  text-gray-700 font-semibold ">Miễn phí vận chuyển</h2>
          <p className="text-sm text-gray-600 text-center ">Nhận hàng trong vòng 3 ngày</p>
        </div>
        <div className="flex flex-col items-center">
            <Image
              src={p2}
              className=" w-16 aspect-square mb-2 object-cover"
              alt="banner-1"
              // layout="responsive"
               />
          <h2 className=" text-lg  text-gray-700 font-semibold ">Quà tặng hấp dẫn</h2>
          <p className="text-sm text-gray-600  text-center">Nhiều ưu đãi khuyến mãi hot</p>
        </div>
        <div className="flex flex-col items-center">
            <Image
              src={p3}
              className=" w-16 aspect-square mb-2 object-cover"
              alt="banner-1"
              // layout="responsive"
               />
          <h2 className=" text-lg  text-gray-700 font-semibold ">Bảo đảm chất lượng</h2>
          <p className="text-sm text-gray-600  text-center">Sản phẩm đã dược kiểm định</p>
        </div>
        <div className="flex flex-col items-center">
            <Image
              src={p4}
              className=" w-16 aspect-square mb-2 object-cover"
              alt="banner-1"
              // layout="responsive"
               />
          <h2 className=" text-lg  text-gray-700 font-semibold ">Hotline: 19001993</h2>
          <p className="text-sm text-gray-600  text-center">Dịch vụ hỗ trợ bạn 24/7</p>
        </div>
      </section>
    );
}

export default ServiceComponent;