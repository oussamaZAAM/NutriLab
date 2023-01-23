import { CiTwitter, CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { TbBrandGoogle } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="grid grid-cols-8 bg-footer">
      <div className="flex flex-col-reverse justify-center items-center divide-y-2 divide-y-reverse | md:col-start-2 col-span-8 md:col-span-6">
        <div className="flex-flex-row justify-center items-center">
          <div className="flex justify-between items-center my-4">
            <CiFacebook size={40} color="#FF9351" />
            <CiTwitter size={40} color="#FF9351" />
            <CiInstagram size={40} color="#FF9351" />
            <TbBrandGoogle size={40} color="#FF9351" />
            <CiLinkedin size={40} color="#FF9351" />
          </div>
          <p className="text-custom-orange">
            © Copyright - All Rights Reserved to Ars slum
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full p-4">
          <div className="flex flex-1 flex-col justify-start items-start h-32 my-4 xs:mx-8">
            <div className="flex mb-2">
                <img
                    className="block h-8 w-auto mx-2"
                    src="https://i.ibb.co/Z8KdKVg/orange-slice-1.png"
                    alt="Your Company"
                />
                <b className="font-logo text-white text-2xl tracking-wider my-0">
                  NutriLab
                </b>
            </div>
            <p className="font-paragraph text-white text-sm max-w-sm">
              Proin id cursus sem. Suspendisse eu ligula a tellus euismod
              cursus. Donec ut neque lorem. Sed ac aliquam erat.
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start h-32 my-4 xs:mx-8">
            <b className="font-logo text-white text-2xl tracking-wider">
              Services
            </b>
            <div className="grid grid-cols-4 md:grid-cols-2 w-full">
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                Service 1
              </small>
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                Service 2
              </small>
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                Service 3
              </small>
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                Service 4
              </small>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start h-32 my-4 xs:mx-8">
            <b className="font-logo text-white text-2xl tracking-wider">
              Support
            </b>
            <div className="grid grid-cols-4 md:grid-cols-2 w-full">
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                Contact us
              </small>
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                About us
              </small>
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                Team
              </small>
              <small className="font-paragraph text-white text-sm mr-8 my-1">
                FAQ
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
