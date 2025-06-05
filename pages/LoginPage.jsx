import { useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import InputForm from './form/InputForm';
import { Loader, Loader2, LogInIcon } from 'lucide-react';
import { schemaLogin } from '../validator/schemaRegister';
import { create } from 'zustand';
import useAuthStore from '../stores/authStore';

const initialInput = {
  "username": "",
  "password": "",
}

export default function LoginPage() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const keepToken = useAuthStore((state)=> state.actionGetToken);

  const navi = useNavigate();

  const hdlChange = (e) => {
    const { id, value } = e.target;
    // console.log(e.target);
    // console.log(id);
    setInput((prv) => ({ ...prv, [id]: value }));
    setInputError((prv) => ({ ...prv, [id]: "" }));
  }

  const hdlSubmit = async (e) => {
    // console.log('submit button working');
    try {
      e.preventDefault();
      setIsLoading(true);

      // to validate
      schemaLogin.validateSync(input, { abortEarly: false });
      console.log('input', input)
      // to lauch send api login
      const res = await authApi.login(input);
      console.log("res", res.data);
      // console.log("res token", res.data.accessToken);


      //to keep token in zustand state
      // const keepToken = { headers: { Authorization: `Bearer ${res.data.accessToken}` } }
      keepToken(res.data.accessToken)

        setInput(initialInput);
      navi('/');

      //alert success use toast by lucide
      toast.success("Login succes!!");
    } catch (error) {
      console.log('error while submit login form', error);
      toast.error("Login invalid!!");

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='flex justify-center items_center'>
      <form onSubmit={hdlSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <InputForm
            id="username"
            placeholder="username"
            hdlChange={hdlChange}
            error={inputError.username}
            value={input.username}
            text="Username"
          />

          <InputForm
            id="password"
            placeholder="Password"
            hdlChange={hdlChange}
            error={inputError.password}
            value={input.password}
            text="password"
          />

          <button className="btn btn-neutral mt-4">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                <span>Loading ...</span>
              </>
            ) : (
              <>
                <LogInIcon className="w-5 h-5" strokeWidth={2.5} />
                <span>Login</span>
              </>
            )}
          </button>
        </fieldset>
      </form>
    </div>
  )
}
