const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'please enter your name'
    },
    last_name: {
        type: String,
    },
    nickname: {
        type: String,
        required: 'please enter your nickname',
        unique: true,
    },
    
    email: {
        type: String,
        required: 'please enter your email',
        unique: true, // Garantiza unicidad en los emails
        lowercase: true, // Convierte el email a minúsculas antes de guardarlo
        validate: {
            validator: function(v) {
                // Utiliza una expresión regular para validar el formato del email
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} no es un formato de correo electrónico válido`
        },
    }
})

module.exports = mongoose.model('User', userSchema)