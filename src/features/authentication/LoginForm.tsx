import {ChangeEvent, useState} from "react";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import {useLogin} from "./useLogin.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";

function LoginForm() {
    // "johndoe@yopmail.com"

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const { authenticate, isLoading } = useLogin()

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
      if (!email || !password) return;
      authenticate({email, password}, {
          onSettled: function(){
              setEmail('')
              setPassword('')
          }
      })
   }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>{isLoading ? <SpinnerMini /> : 'Login'}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;