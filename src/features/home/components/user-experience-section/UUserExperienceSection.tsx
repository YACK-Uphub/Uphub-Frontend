import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/shadcn/carousel";
import React from "react";
import UUserFeedbackCard from "@/features/home/components/user-experience-section/UUserFeecbackCard";

const testimonials = [
  {
    quote:
      "Quy trình ứng tuyển mượt mà, thông tin rõ ràng. Tôi đã tìm được một công việc ứng ý chỉ sau vài ngày sử dụng. Rất khuyến khích mọi người thử!",
    userName: "Yè Hồng Văn",
    userTitle: "Trưởng phòng kinh doanh",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2Ffemale-user.jpg?alt=media&token=b6ea541f-af45-4cce-8c20-aaf0239bfc68",
    rating: 4,
  },
  {
    quote: "Dịch vụ tuyệt vời, hỗ trợ nhiệt tình. Tôi đã có được công việc mơ ước sau 2 tuần.",
    userName: "Nguyễn Thị Mai",
    userTitle: "Chuyên viên Marketing",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2Ffemale-user.jpg?alt=media&token=b6ea541f-af45-4cce-8c20-aaf0239bfc68",
    rating: 5,
  },
  {
    quote: "Trải nghiệm ứng tuyển thuận tiện, giao diện thân thiện. Đáng để trải nghiệm!",
    userName: "Trần Văn Nam",
    userTitle: "Kỹ sư phần mềm",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2Fmale-user.jpg?alt=media&token=7aa18471-6381-44ef-a010-099eaa17add5",
    rating: 4,
  },
  {
    quote: "Trải nghiệm ứng tuyển thuận tiện, giao diện thân thiện. Đáng để trải nghiệm!",
    userName: "Trần Văn Đạt",
    userTitle: "Kỹ sư phần mềm",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2Fmale-user.jpg?alt=media&token=7aa18471-6381-44ef-a010-099eaa17add5",
    rating: 3,
  },
  {
    quote: "Trải nghiệm ứng tuyển thuận tiện, giao diện thân thiện. Đáng để trải nghiệm!",
    userName: "Trần Văn Âú",
    userTitle: "Kỹ sư phần mềm",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2Fmale-user.jpg?alt=media&token=7aa18471-6381-44ef-a010-099eaa17add5",
    rating: 4,
  },
];

const UUserExperienceSection = () => {
  return (
    <>
      {/* Header */}
      <h2
        className="mb-8 text-center
				sm:text-2xl sm:p-4 sm:mb-16 font-bold
				text-custom-blue-3"
      >
        Trải Nghiệm Người Dùng
      </h2>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          axis: "x",
        }}
        className="w-full"
      >
        <CarouselContent className={"-ml-15"}>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <div className="h-full p-1">
                <UUserFeedbackCard
                  quote={testimonial.quote}
                  userName={testimonial.userName}
                  userTitle={testimonial.userTitle}
                  avatarUrl={testimonial.avatarUrl}
                  rating={testimonial.rating}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default UUserExperienceSection;
