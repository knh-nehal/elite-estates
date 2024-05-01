/* eslint-disable react/no-unescaped-entities */
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateProfileName } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;
    const name = form.name.value;
    const photo = form.url.value;

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(pass)) {
      setRegisterError(
        "Password must contain at least 6 characters, including uppercase and lowercase letters."
      );
      toast.error(registerError);
      return;
    }

    createUser(email, pass)
      .then(() => {
        updateProfileName(name, photo);
        toast.success("User registered successfully");
      })
      .catch((error) => {
        setRegisterError(error.message);
        toast.error(registerError);
        return;
      });
  };

  return (
    <div className="flex justify-center mt-6">
      <Card className="shadow-xl p-14" color="transparent" shadow={false}>
        <Typography className="text-center" variant="h4" color="blue-gray">
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleRegister}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              name="name"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              PhotoURL
            </Typography>
            <Input
              type="text"
              name="url"
              size="lg"
              placeholder="https://example.com/some-image.jpg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              name="pass"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="my-4 flex justify-between items-center">
            <p>Already Have an Account?</p>
            <Link to="/login">
              <Button className="bg-[#1abc9c]" size="sm">
                Login
              </Button>
            </Link>
          </div>

          <Button type="submit" className="mt-6 bg-[#1abc9c]" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
