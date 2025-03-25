import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { ReactElement } from "react";


const socialInfo = [

    {
        link:"",
        icon:<FaInstagram/>
    },
    {
        link:"",
        icon:<FaXTwitter/>
    },
    {
        link:"",
        icon:<CiLinkedin/>
    },
    {
        link:"",
        icon:<FaGithub/>
    },
    
]

interface SetLinkProp{
    link:string;
    icon:ReactElement;
}

const SetLink = ({link, icon}:SetLinkProp) =>{
    return(
        <a className="md:text-2xl text-md hover:text-black transition-all ease-in-out" href={link} target="_blank">
            {icon}
        </a>
    )
}


const Footer = () => {


  return (
    <div className="w-full mx-auto mt-6 h-12 bg-[#594EF1] text-white rounded-md md:px-8 md:py-2 px-2 py-2 flex justify-between   items-center gap-2">
        
        <div className="text-lg ">
            <span className="">Made with ❤️ by <span className="text-black">Nitish</span></span>
        </div>


        <div className="flex md:gap-6 gap-4">
            {
                socialInfo.map((social, index) => (
                    <SetLink key={index} link={social.link} icon={social.icon}/>
                ))
            }
        </div>
    </div>
  )
}

export default Footer;