import { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Index";
const Footer = () => {
  const SocialIcons = [
    {
      alt: "facebook",
      logo_url: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
      redirect_url: "https://github.com/satyam-yadav12",
    },
    {
      alt: "instagram",
      logo_url: "https://cdn-icons-png.flaticon.com/128/4138/4138124.png",
      redirect_url: "https://instagram.com/satyam9_3",
    },
    {
      alt: "Youtube",
      logo_url: "https://cdn-icons-png.flaticon.com/128/4494/4494485.png",
      redirect_url: "https://github.com/satyam-yadav12",
    },
    {
      alt: "Github",
      logo_url: "https://cdn-icons-png.flaticon.com/128/2111/2111432.png",
      redirect_url: "https://github.com/satyam-yadav12/Lumen-Captures",
    },
  ];
  return (
    <div className="">
      <div className="">
        <div className=" w-[95%] border-white/20  mx-auto select-none grid grid-cols-1 md:grid-cols-3 m-2   rounded-3xl  shadow-md shadow-gray-500">
          <div className=" m-5">
            <div className="m-auto  ml-5">
              <Logo />
              <p className="text-wrap text-justify left-0 pt-1 select-none">
                {" "}
                A platform where users upload and share images publicly, edit
                details anytime, and manage secure accounts with JWT.
              </p>
            </div>
          </div>
          {/* social media */}
          <div className="flex flex-col my-auto pl-2 ml-5 md:m-auto ">
            <p className="p-2 pb-0.5 md:text-center font-medium text-left ">
              join us on Social media
            </p>
            <div className="flex flex-row justify-start md:justify-center">
              {SocialIcons.map((data) => {
                return (
                  <li
                    key={data.alt}
                    className="list-none cursor-pointer select-none p-2 "
                  >
                    <a href={data.redirect_url}>
                      <img
                        src={data.logo_url}
                        alt="data.alt"
                        className="h-10 m-1"
                      />
                    </a>
                  </li>
                );
              })}
            </div>
            <p className="p-2 pt-0 text-left md:text-center font-extralight">
              Copyright resevered © Satyam Yadav 2026
            </p>
          </div>
          {/* links */}
          <div className="flex flex-row md:flex-col md:row-start-1 md:col-start-3 row-start-2 justify-start text-left ml-5 pt-2 p-2 mr-auto">
            {["Feedback", "Developer", "About"].map((text) => {
              return (
                <Fragment key={text}>
                  <Link to={"/" + text.toLowerCase()}>
                    <li
                      key={text}
                      className="list-none cursor-pointer p-2 rounded-sm font-semibold hover:bg-gray-500"
                    >
                      {text}
                    </li>
                  </Link>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
