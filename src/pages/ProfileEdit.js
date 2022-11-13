import React, { Component } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom"
import Loading from "../components/Loading"
import { getUser, updateUser } from "../services/userAPI"

class Profile extends Component {
  state = {
    name: "",
    email: "",
    image: "",
    description: "",
    saved: false,
    buttonState: true,
    loading: true
  }

  async componentDidMount() {
    const userData = await getUser()
    this.setState({
      name: userData.name,
      email: userData.email,
      image: userData.image,
      description: userData.description,
      loading: false
    })

    if (userData.name && userData.email && userData.description && userData.image) {
      this.setState({ buttonState: false })
    }
  }

  validateForm = () => {
    const { name, email, image, description } = this.state
    const emailVerify = email.split("@")[1] === "test.com" || "email.com"
    if (name && emailVerify && image && description) {
      this.setState({ buttonState: false })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value }, this.validateForm)
  }

  handleClick = async (e) => {
    e.preventDefault()
    const { name, email, image, description } = this.state
    this.setState({ loading: true })
    await updateUser({ name, email, image, description })
    this.setState({ loading: false, saved: true })
  }

  render() {
    const { name, email, image, loading, description, buttonState, saved } = this.state

    if (saved) {
      return <Redirect to="/profile" />
    }

    return loading ? (
      <Loading />
    ) : (
      <div data-testid="page-profile-edit">
        <form className="flex flex-col">
          <label
            htmlFor="name"
            className="flex flex-col"
          >
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              data-testid="edit-input-name"
              onChange={this.handleChange}
            />
          </label>
          <label
            htmlFor="email"
            className="flex flex-col"
          >
            E-mail:
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              data-testid="edit-input-email"
              onChange={this.handleChange}
            />
          </label>
          <label
            htmlFor="description"
            className="flex flex-col"
          >
            Description:
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              data-testid="edit-input-description"
              onChange={this.handleChange}
            />
          </label>
          <label
            htmlFor="image"
            className="flex flex-col"
          >
            Image:
            <input
              type="text"
              name="image"
              id="image"
              value={image}
              data-testid="edit-input-image"
              onChange={this.handleChange}
            />
          </label>
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={buttonState}
            onClick={this.handleClick}
            className="w-full border rounded-md text-center font-bold py-2 mt-2 hover:bg-slate-200 duration-300"
          >
            Salvar
          </button>
        </form>
      </div>
    )
  }
}

export default Profile
