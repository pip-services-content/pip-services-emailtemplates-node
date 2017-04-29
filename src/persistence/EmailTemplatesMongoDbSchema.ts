import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let EmailTemplatesMongoDbSchema = function(collection?: string) {
    collection = collection || 'email_templates';

    let schema = new Schema(
        {
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
        },
        {
            collection: collection,
            autoIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
