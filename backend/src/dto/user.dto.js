import Joi from "joi";

const createUserSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    apellido: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .required(),

    password: Joi.string()
        .trim()
        .min(6)
        .max(100)
        .required(),

    fechaNacimiento: Joi.date()
        .required(),

    edad: Joi.number()
        .integer()
        .min(1)
        .max(120)
        .required()
        .message({
            "number.base": "La edad debe ser numérica",
            "number.integer": "La edad debe ser un número entero",
            "number.min": "La edad debe ser mayor a 0",
            "number.max": "La edad debe ser menor a 120",
        }),

    genero: Joi.string()
        .trim()
        .required(),

    telefono: Joi.string()
        .trim()
        .min(6)
        .max(20)
        .required(),

    direccion: Joi.string()
        .trim()
        .max(200)
        .required(),

    localidad: Joi.string()
        .trim()
        .max(100)
        .required(),

    provincia: Joi.string()
        .trim()
        .max(100)
        .required(),

    pais: Joi.string()
        .trim()
        .max(100)
        .required(),

    codigoPostal: Joi.number()
        .trim()
        .max(100)
        .required(),

})

const updateUserSchema = Joi.object({
    nombre: Joi.string()
        .trim()
        .min(2)
        .max(100),

    apellido: Joi.string()
        .trim()
        .min(2)
        .max(100),

    // Se permite recibirlo para devolver un mensaje amigable
    // desde el service indicando que el email no puede modificarse
    email: Joi.string()
        .trim()
        .email(),

    password: Joi.string()
        .trim()
        .min(6)
        .max(100),

    fechaNacimiento: Joi.date(),

    edad: Joi.number()
        .integer()
        .min(1)
        .max(120)
        .message({
            "number.base": "La edad debe ser numérica",
            "number.integer": "La edad debe ser un número entero",
            "number.min": "La edad debe ser mayor a 0",
            "number.max": "La edad debe ser menor a 120",
        }),

    genero: Joi.string()
        .trim(),

    telefono: Joi.string()
        .trim()
        .min(6)
        .max(20),

    direccion: Joi.string()
        .trim()
        .max(200),

    localidad: Joi.string()
        .trim()
        .max(100),

    provincia: Joi.string()
        .trim()
        .max(100),

    pais: Joi.string()
        .trim()
        .max(100),

    codigoPostal: Joi.number()
        .trim()
        .max(100),

})
    .min(1) // obliga a enviar al menos un campo
    .messages({
        "object.min":
            "Debe enviar al menos un campo para actualizar"
    });


const userParamsSchema = Joi.object({
    id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.hex":
                "El ID debe ser un ObjectID válido",
            "string.length":
                "El ID debe tener 24 caracteres",
            "any.required":
                "El ID es obligatorio"
        }),
});


export {
    createUserSchema,
    updateUserSchema,
    userParamsSchema,
}