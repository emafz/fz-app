import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({

    usuarioEliminado: {
        type: Object,
        required: true
    },
    fechaEliminacion: {
        type: Date,
        required: date.now
    }
});

const Audit = mongoose.model('Audit', auditSchema);
export default Audit