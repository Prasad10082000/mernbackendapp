import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Datacontext } from "../../context/DataProvider";
import { authenticateslogin } from "../../service/api";
import { useNavigate } from "react-router-dom";

const LogoImg = styled("img")`
  height: 10vh;
  width: 10vh;
  margin-bottom: 5vh;
  border-radius: 50%;
  border: 2px solid blue;
  padding: 10px;
  display: flex;
  margin: auto;
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

const Error = styled(Typography)`
  font-size: 14px;
  color: #ff6161;
  line-height: 0;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Logo = "https://breathlly.netlify.app/assets/logo.png";
const FBlogo = "https://breathlly.netlify.app/assets/facebbok.png";
const Googlelogo = "https://breathlly.netlify.app/assets/google.png";

const Logininitialval = {
  username: "",
  password: "",
};

const Loginpage = () => {
  const [login, Setlogin] = useState(Logininitialval);
  const { setAccount } = useContext(Datacontext);
  const [error, Seterror] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    Setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const Loginuser = async (e) => {
    e.preventDefault();

    let res = await authenticateslogin(login);
    console.log(res);
    if (res.status === 200) {
      setAccount(res.data.data.username);
      navigate("/dashboard");
    } else {
      Seterror(true);
    }
  };
  return (
    <>
      <Box style={{ height: "100vh" }}>
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
              style={{
                fontSize: "1.5rem",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Welcome Back!
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
            <OrWrap>OR LOG IN WITH EMAIL</OrWrap>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="outlined-basic"
              label="username *"
              name="username"
              onChange={(e) => handleChange(e)}
              variant={"outlined"}
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
            {error && <Error>Please Enter Valid Username Or Password</Error>}
          </Box>
          <Box>
            <Box>
              <a href="/">
                <Button
                  variant="contained"
                  style={{
                    marginBottom: 16,
                    width: "100%",
                    borderRadius: "25px",
                    padding: 12,
                  }}
                  onClick={(e) => Loginuser(e)}
                >
                  Log In
                </Button>
              </a>
            </Box>
          </Box>
          <a href="/" style={{ marginBottom: 16, textAlign: "center" }}>
            Forgot Password
          </a>
          <Box style={{ marginBottom: 16, textAlign: "center" }}>
            New user? <a href="/signup">SIGN UP</a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Loginpage;
