import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    
    let user = this;

    //make sure not to rehash the password
    if(!user.isModified('password')) return next();

    //generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            user.password = hash;
            next();

        });
    });
});

UserSchema.methods.checkPassword = function(attempt, callback) {

    let user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {

        if(err) return callback(err);
        callback(null, isMatch);
    });



    
}