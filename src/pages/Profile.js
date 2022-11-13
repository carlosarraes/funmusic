import React, { Component } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"
import Loading from "../components/Loading"
import { getUser } from "../services/userAPI"

class Profile extends Component {
  state = {
    name: "",
    email: "",
    image: "",
    description: "",
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
  }

  render() {
    const { name, email, image, loading, description } = this.state
    return loading ? (
      <Loading />
    ) : (
      <div
        data-testid="page-profile"
        className="flex flex-col justify-center items-center md:items-start md:justify-evenly"
      >
        <div className="flex flex-col justify-center w-full items-center mt-4 md:justify-between md:flex-row">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src={image}
              alt=""
              data-testid="profile-image"
              className="w-72 rounded-full self-center"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="block w-full">
              <span className="font-medium">Nome: </span>
              <span className="w-full block border p-1">{name}</span>
            </div>
            <div className="block w-full">
              <span className="font-medium">E-mail: </span>
              <span className="w-full block border p-1">{email}</span>
            </div>
            <div className="block w-full">
              <span className="font-medium">Descrição: </span>
              <span className="w-full block border p-1">{description}</span>
            </div>
          </div>
        </div>
        <Link
          to="/profile/edit"
          className="w-full border rounded-md text-center font-bold py-2 mt-2 hover:bg-slate-200 duration-300"
        >
          Editar perfil
        </Link>
      </div>
    )
  }
}

export default Profile
