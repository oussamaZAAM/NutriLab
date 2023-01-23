import { CiTwitter, CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { TbBrandGoogle } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="grid grid-cols-8 bg-footer mt-24">
      <div className="flex flex-col-reverse justify-center items-center divide-y-2 divide-y-reverse | md:col-start-2 col-span-8 md:col-span-6">
        <div className="flex flex-col justify-center items-center w-64">
          <div className="flex justify-between items-center my-4 xs:w-full">
            <CiFacebook size={40} color="#FF9351" />
            <CiTwitter size={40} color="#FF9351" />
            <CiInstagram size={40} color="#FF9351" />
            <TbBrandGoogle size={40} color="#FF9351" />
            <CiLinkedin size={40} color="#FF9351" />
          </div>
          <p className="text-custom-orange">
            © Copyright - All Rights Reserved
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start w-75 p-4">
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
            <p className="font-paragraph text-white text-xs max-w-sm">
              An app that helps you balance your daily nutrients
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start h-32 my-4 xs:mx-8">
            <b className="font-logo text-white text-2xl tracking-wider mb-1">
              Services
            </b>
            <div className="grid grid-cols-1 w-full">
              <small className="font-paragraph text-white text-xs my-1">
                Customize Nutrients
              </small>
              <small className="font-paragraph text-white text-xs my-1">
                Balance Food
              </small>
              <small className="font-paragraph text-white text-xs my-1">
                Suggest Meals
              </small>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start h-32 my-4 xs:mx-8">
            <b className="font-logo text-white text-2xl tracking-wider mb-1">
              Support
            </b>
            <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-2 w-full">
              <small className="font-paragraph text-white text-xs mr-8 my-1">
                Contact us
              </small>
              <small className="font-paragraph text-white text-xs mr-8 my-1">
                About us
              </small>
              <small className="font-paragraph text-white text-xs mr-8 my-1">
                Team
              </small>
              <small className="font-paragraph text-white text-xs mr-8 my-1">
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
