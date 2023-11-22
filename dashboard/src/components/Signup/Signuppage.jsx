import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { authenticatesSignup } from "../../service/api";
import { useContext } from "react";
import { Datacontext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const LogoImg = styled("img")`
  height: 10vh;
  width: 10vh;
  margin-bottom: 2vh;
  border-radius: 50%;
  border: 2px solid blue;
  padding: 10px;
  display: flex;
  margin: auto !important;
`;

const OrWrap = styled(Typography)`
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-weight: bolder;
  color: gray;
  margin: 16px;
  text-align: center;
`;

const signUpIntials = {
  username: "",
  email: "",
  password: "",
};

const Logo = "https://breathlly.netlify.app/assets/logo.png";
const FBlogo = "https://breathlly.netlify.app/assets/facebbok.png";
const Googlelogo = "https://breathlly.netlify.app/assets/google.png";

const Signuppage = () => {
  const [signup, setSignup] = useState(signUpIntials);
  const { setAccount } = useContext(Datacontext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signUser = async () => {
    let res = await authenticatesSignup(signup);
    if (!res) return;
    setAccount(signup.firstname);
    if (res.status === 200) {
      navigate("/");
      alert("User signed up successfully!")
    }
  };

  return (
    <>
      <Box>
        <Box
          style={{
            maxWidth: "444px",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            padding: "16px",
          }}
        >
          <Box>
            <LogoImg src={Logo} alt="logo" />
            <Typography
              component="h1"
              style={{ fontSize: "1.5rem", fontWeight: "bolder",textAlign: "center"}}
            >
              Create your account
            </Typography>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant="contained"
              style={{ marginBottom: 16, borderRadius: "25px" }}
            >
              <img
                src={FBlogo}
                alt="fb"
                style={{ height: "30px", marginRight: 15 }}
              />
              Continue With Facebook
            </Button>
            <Button
              variant="outlined"
              style={{ marginBottom: 16, borderRadius: "25px" }}
            >
              <img
                src={Googlelogo}
                alt="google"
                style={{ height: "30px", marginRight: 15 }}
              />
              Continue With Google
            </Button>
          </Box>
          <Box>
            <OrWrap>OR SIGN UP WITH EMAIL</OrWrap>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="outlined-basic"
              label="Username *"
              variant={"outlined"}
              name="username"
              onChange={(e) => handleChange(e)}
              style={{ marginBottom: 16, width: "100%" }}
            />
            <TextField
              id="outlined-basic"
              label="Email Address *"
              variant={"outlined"}
              name="email"
              onChange={(e) => handleChange(e)}
              style={{ marginBottom: 16, width: "100%" }}
            />
            <TextField
              id="outlined-basic"
              label="Password *"
              name="password"
              onChange={(e) => handleChange(e)}
              variant={"outlined"}
              style={{ marginBottom: 16, width: "100%" }}
            />
          </Box>
          <Box>
            <Box>
              <Button
                variant="contained"
                style={{
                  marginBottom: 16,
                  width: "100%",
                  borderRadius: "25px",
                  padding: 12,
                }}
                onClick={signUser}
              >
                Get Started
              </Button>
            </Box>
          </Box>
          <Box style={{ marginBottom: 16,textAlign:"center" }}>
            Already have an account? <Link to="/">Log In</Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signuppage;
