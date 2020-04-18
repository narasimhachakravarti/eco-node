const User =require('../model/users');

exports.register = function (req, res) {
    console.log(req.body);
    let user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            type : req.body.type,
            password: req.body.password,
            phone : req.body.phone
        }
    );

    user.save().then(
        result => {
            res.send(result);
            console.log(result);
        }
    ).catch((err) => {
        res.send(err)
    })
};

exports.login = function (req, res) {
    console.log(req.body, "here");
    console.log(req.params, "here")
    const email  = req.body.email;
    console.log(email);
    User.findOne({email : email}).then(
        result => {
            console.log(result);
            res.send(result);
        }
    )
}