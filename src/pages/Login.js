import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { name, buttonControl, handleChange, handleClick } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Usuario:
            <input
              type="text"
              id="name"
              name="name"
              data-testid="login-name-input"
              value={ name }
              onChange={ handleChange }
            />
          </label>
          <button
            type="submit"
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
