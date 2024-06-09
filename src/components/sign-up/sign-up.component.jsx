import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';
import './sign-up.styles.scss';

const defaultFormFields = { displayName: '', email: '', password: '', confirmPassword: '' };

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      setCurrentUser(user);
      resetFormFields();
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('error', error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        <Button type="submit">Sign UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
