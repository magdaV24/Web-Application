import "./Userbar.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const logo =
    "https://document-export.canva.com/hiINk/DAFWOkhiINk/5/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20221229%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221229T104621Z&X-Amz-Expires=91497&X-Amz-Signature=658bd185e38d0769a1cf86fdb2ee2b38de77fa705c24bc701789f421b870316c&X-Amz-SignedHeaders=host&response-expires=Fri%2C%2030%20Dec%202022%2012%3A11%3A18%20GMT";
  const source =
    "https://images.pexels.com/photos/207353/pexels-photo-207353.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div className="header">
      <section className="logo">
        <img src={logo} alt="logo" />
      </section>
      {currentUser && (
        <section className="user-profile">
          <img src={source} alt="profile_picture"></img>
          <h3>{currentUser.username}</h3>
        </section>
      )}

      {currentUser && (
        <section className="user-action">
          <button onClick={logout} className="btn">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          <Link style={{ fontSize: "inherit" }} to="makeapost">
            <button className="btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
        </section>
      )}
    </div>
  );
}
