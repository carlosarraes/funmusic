import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { name, buttonControl, handleChange, handleClick } = this.props;
    return (
      <div data-testid="page-login" className='flex justify-center items-center'>
        <form className='flex flex-col justify-center gap-4'>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              data-testid="login-name-input"
              value={ name }
              onChange={ handleChange }
              placeholder="Digite o usuário..."
              className="
                form-control
                text-center
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-600 hover:bg-opacity-20 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            data-testid="login-submit-button"
            disabled={ buttonControl }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  buttonControl: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Login;
