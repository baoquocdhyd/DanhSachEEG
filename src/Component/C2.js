import axios from "../axios.js";
// import axios from "axios";
import { useState, useEffect , useLayoutEffect} from "react";

const C2 = () => {
  const [a, setA] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "1",
    roleId: "",
  });

 
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value });
  };
  let B = async (a) => {
    try {
      await axios.post("/api/create-new-user", a);
      console.log("thực hiện");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className="" id="">
        <div className="">
          <label>Email</label>
          <input
            type="email"
            className=""
            onChange={(e) => {
              A(e, "email");
            }}
            value={a.email}
          />
        </div>
        <div className="">
          <label>Password</label>
          <input
            type="password"
            className=""
            onChange={(e) => {
              A(e, "password");
            }}
            value={a.password}
          />
        </div>
        <div className="">
          <label>First Name</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, "firstName");
            }}
            value={a.firstName}
          />
        </div>
        <div className="">
          <label>Last Name</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, "lastName");
            }}
            value={a.lastName}
          />
        </div>
        <div className="">
          <label>Address</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, "address");
            }}
            value={a.address}
          />
        </div>

        <div class="">
          <input
            type="radio"
            name="gender"
            checked={a.gender === "1"}
            onClick={() => {
              setA({ ...a, gender: "1" });
            }}
          />
          <a>Nam</a>
          <input
            type="radio"
            name="gender"
            onClick={() => {
              setA({ ...a, gender: "0" });
            }}
          />
          <a>Nữ</a>
        </div>

        <div className="">
          <label for="" className="">
            {" "}
            Role Id{" "}
          </label>
          <select
            className=""
            value={a.roleId}
            onChange={(e) => {
              A(e, "roleId");
            }}
          >
            <option value=""> Choose </option>
            <option selected value="1">
              Admin
            </option>
            <option value="2">Doctor</option>
            <option value="3">Patient</option>
            <option>Khác</option>
          </select>
          <div>
            <button
              className=""
              onClick={() => {
                B(a);
              }}
            >
              Add New
            </button>
            <button className="" onClick={() => {}}>
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default C2;
