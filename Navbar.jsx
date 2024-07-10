import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem("userId"));
  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const renderButtons = () => {
    if (userId !== null) {
      return (
        <div>
          <button
            className="btn btn-outline-success navbar-brand my-2 text-dark my-sm-1"
            onClick={handleLogout}
          >
            ᒪᗝǤᗝᑌ丅
          </button>
          <Link className="navbar-brand" to="/profile">
            𝐩𝐫𝐨𝐟𝐢𝐥𝐞
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link className="navbar-brand" to="/register">
            RegᎥຮτer
          </Link>
          <Link className="navbar-brand" to="/login">
            LᴏɢIɴ
          </Link>
        </div>
      );
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#99ced3",
      }}
    >
      <Link className="navbar-brand p-2" to="/">
        ᕼᗝᗰᗴ
      </Link>

      <div className="nav-search">
        <input type="text" placeholder="Search..." className="search-input" />
        <div className="search-icon">
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
      <Link className="navbar-brand" to={`/cartinfo/${userId}`}>

        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">{renderButtons()}</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;




// import React, { useState } from 'react';
// import { useNavigate,Link } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(localStorage.getItem('userData'));
//   const [userId, setUserId] = useState(localStorage.getItem('userId'));

//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     localStorage.removeItem('token');

//     setUserData(null);
//     navigate("/login")
//   };
//   const renderButtons = () => {
//     if (userId !== null) {
//       return (
//         <div>
//         <button
//           className='btn btn-outline-success text-black navbar-brand my-2 text-dark my-sm-1'
//           onClick={handleLogout}
//         >
//           ᒪᗝǤᗝᑌ丅
//         </button>
//         <Link className='navbar-brand text-black' to='/profile'>
//         𝐩𝐫𝐨𝐟𝐢𝐥𝐞
//       </Link>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <Link className="navbar-brand text-black" to="/register">
//           RegᎥຮτer
//           </Link>
//           <Link className="navbar-brand text-black" to="/login">
//           LᴏɢIɴ
//           </Link>
//         </div>
//       );
//     }
//   };
//   return (
//         <nav className='navbar navbar-expand-lg '>

//       <Link className='navbar-brand text-black' to='/' >
//       ᕼᗝᗰᗴ
//       </Link>
//       <div className='collapse navbar-collapse' id='navbarNav'>
//         <ul className='navbar-nav ml-auto'>
//           <li className='nav-item'>{renderButtons()}</li>

//         </ul>
//       </div>
//     </nav>

//   );
// }

// export default Navbar;
