import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Audit from "../models/audit.model.js";
import mongoose from "mongoose";


//METODO GET
const getUsersService = async ({email, id}) => {
  try {
    //Buscar por ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        status: 400,
        message: "ID no válido",
      };
    }

    const users = await User.findById(id)    
      .select("-password")

    if (!users) {
      throw {
        status: 404,
        message: "Usuario no encontrado",
      };
    }

    return users;
  }

  //Buscar por email
  if (email) {
    const user = await User.findOne({ email })
      .select("-password");

    if (!user) {
      throw {
        status: 404,
        message: "Usuario no encontrado",
      };
    }

    return user;
  }

  //Todos los usuarios
  return await User.find()
    .select("-password");
    .sort({ nombre: 1 });
{ catch (error) {
    throw{
        statusCode: error.statusCode || 500,
        message: error.message || "Error interno del servidor",
        errors: error.errors || null,
        };
    };
}

//METODO POST
const createUserService = async (data) => {
  try {
    console.log('SERVICE -> createUserService')
    console.log(data)
    const existUser = await User.findOne({
        email: data.email
    })

    if (existUser) {
        throw new Error('El usuario ya existe')
    }

    const hashPassword = await bcrypt.hash
        (data.password, 10)

    const user =new User({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashPassword,
        edad: data.edad,
        genero: data.genero,
        telefono: data.telefono,
        direccion: data.direccion,
        localidad: data.localidad,
        provincia: data.provincia,
        pais: data.pais,
        codigoPostal: data.codigoPostal,
    })

    await user.save()
    return {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        edad: user.edad,
        genero: user.genero,
        telefono: user.telefono,
        direccion: user.direccion,
        codigoPostal: user.cp,
        localidad: user.localidad,
        provincia: user.provincia,
        pais: user.pais
    }

}catch (error) {
    throw error
    }
}

//METODO PUT
const updateUserService = async (id, data) => {
  try {
    console.log('📦 SERVICE → updateUserService')

    console.log (id)
    console.log (data)

    const user = await User.findById(id)
  if (!user) {
    throw new Error('Usuario no encontrado')
  }
    
  //NO permitir cambiar email
  if (data.email) {
    throw new Error('El email no se puede modificar')
  }

  //Update parcial
  if (data.nombre) user.nombre = data.nombre
  if (data.apellido) user.apellido = data.apellido
  if (data.edad) user.edad = data.edad
  if (data.genero) user.genero = data.genero
  if (data.telefono) user.telefono = data.telefono
  if (data.direccion) user.direccion = data.direccion

  //Canbiar password si viene
  if (data.password) {
    user.password = await bcrypt.hash(
      data.password,
      10
    )
  }

  await user.save()
  return {
    id: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    edad: user.edad,
    genero: user.genero,
    telefono: user.telefono,
    direccion: user.direccion
  }
}

catch (error) {
    throw error
    }
}

//METODO DELETE
const deleteUserService = async (id) => {
  try {
    console.log('📦 SERVICE → deleteUserService')
    console.log (id)
    const user = await User.findById(id)
    if (!user) {
      throw new Error('Usuario no encontrado')
    }


//AUDITORIA
    await Audit.create({
      usuarioEliminado: user
    })
    await user.findByIdAndDelete(id)
    return {
      message: 'Usuario eliminado correctamente'
    }
  }

  catch (error) {
    throw error
  }
}


export {
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService
}