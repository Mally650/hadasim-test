const con = require('../config/DB');


module.exports.Login = (req, res) => {
    try {
        let { id, password } = req.body;
        con.query(`select * from persons where id=${id} and password=${password}`, (err, result) => {
            if (err) {
                res.status(404).send('the details are not correct!');
            } else {
                res.status(200).send(result);
            }
        }
        );
    } catch (err) {
        res.Status(500).send(err);
    }
}
module.exports.GetTable = (req, res) => {
    try {
        let table_name = req.params.table_name;
        con.query(`select * from ${table_name}`, (err, result) => {
            if (err) {
                res.status(404).send('the details are not correct!');
            } else {
                res.status(200).send(result);
            }
        }
        );
    } catch (err) {
        res.Status(500).send(err);

    }
}