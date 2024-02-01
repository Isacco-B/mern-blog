import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row p-3 border border-teal-400 justify-center items-center rounded-3xl rounded-br-none rounded-tl-none text-center">
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript</h2>
        <p className="text-gray-500 my-2">Checkout these resources with 100 Javascript Project</p>
        <Button gradientDuoTone="purpleToPink">
          <a href="https://google.com" target="_blank" rel="noreferrer">Learn More</a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_3840,q_auto"  className="rounded-lg"/>
      </div>
    </div>
  );
}
