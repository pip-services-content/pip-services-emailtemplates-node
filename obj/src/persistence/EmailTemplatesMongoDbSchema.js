"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.EmailTemplatesMongoDbSchema = function (collection) {
    collection = collection || 'email_templates';
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        name: { type: String, required: true },
        /* Content */
        from: { type: String, required: false },
        reply_to: { type: String, required: false },
        subject: { type: Mixed, required: true },
        text: { type: Mixed, required: true },
        html: { type: Mixed, required: true },
        /* Editing status */
        status: { type: String, required: true, 'default': 'writing' }
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=EmailTemplatesMongoDbSchema.js.map