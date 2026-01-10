import { organization } from "@/lib/constants";
import React from "react";

const FooterVariant01 = () => {
  return (
    <>
      <footer>
        <div className="u__border-top u__bg-white py-3">
          <div className="container text-center">
            <p className="mb-0" style={{ fontSize: `0.85rem` }}>
              © Copyright{" "}
              <a href="/" className="">
                {organization || ``}
              </a>{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterVariant01;
