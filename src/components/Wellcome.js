import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  createStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import axios from "axios";

const theme = createMuiTheme();
const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff"
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const Wellcome = () => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
      setHelperText("");
    }
  }, [username, password]);

  const handleLogin = async () => {
    if (username.length > 0 && password.length > 0) {
      const token = jwt.sign({ username, password }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
      });
      localStorage.setItem("token", token);
      const headers = {
        authorization: "Basic " + btoa(username + ":" + password)
      };

      setIsLoading(true);
      setIsButtonDisabled(true);

      const sonar = await axios("http://localhost:8081/sonar/getIssues", {
        headers
      });

      const perforce = await axios(
        "http://localhost:8081/perforce/getMissingMerges",
        {
          headers
        }
      );

      let response = Promise.all([perforce, sonar]).then(
        ([perforce, sonar]) => {
          setIsLoading(false);
          setIsButtonDisabled(true);
          const sonarIssues = sonar.data.issues;
          const perforceIssues = perforce.data;
          const issues = { perforceIssues, sonarIssues };
          const data = { issues };
          return data;
        }
      );
      response.then(issues => {
        if (typeof issues.sonarIssues !== undefined) {
          history.push("/dashboard", issues);
        } else {
          clear();
          setError(true);
          setHelperText("Unauthorized");
        }
      });

      // let response;
    }
  };
  const clear = () => {
    setUsername("");
    setPassword("");
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  const textButton = isLoading ? "is loading" : "Login";
  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="CRM Dashboard APP" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                value={password}
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={() => handleLogin()}
              disabled={isButtonDisabled}
              // isLoading={isLoading}
            >
              {textButton}
            </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
};

export default Wellcome;
