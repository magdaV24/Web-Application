import "./Userbar.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const logo =
    "https://document-export.canva.com/hiINk/DAFWOkhiINk/6/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20230105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230105T221501Z&X-Amz-Expires=45810&X-Amz-Signature=b62fbd090619591a5faee815720c3ee8846266ce97e4345ac722a5591c0a049c&X-Amz-SignedHeaders=host&response-expires=Fri%2C%2006%20Jan%202023%2010%3A58%3A31%20GMT";
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
