/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub} from "react-icons/bs"
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xml mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="my-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Merlino
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog Info
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow US" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions 🐒
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div>
          <Footer.Copyright
            href="#"
            by="Isacco Bertoli"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:justify-center sm:mt-2">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
