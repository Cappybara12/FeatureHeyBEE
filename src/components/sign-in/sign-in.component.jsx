import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './sign-In.styles.scss';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();
      navigate('/');  // Redirect to home page after successful sign-in
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      setCurrentUser(user);
      navigate('/');  // Redirect to home page after successful Google sign-in
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
