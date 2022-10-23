const con = require('../config/DB');
const fanctions = {
    GetTasks: (req, res) => {
        try {
            let fulldate = new Date();
            let date = fulldate.getFullYear() + "-" + fulldate.getMonth() + "-" + fulldate.getDate();
            console.log(date)
            let query = `select bs.id,b.name as book_name,s.name as status_name
            from lending l join books_status bs
            on l.book_id = bs.id
            join books b
            on b.id=bs.book_id
            join status s on s.id=bs.status_id
            where Date_returned=${date}`

            console.log(query);
            con.query(query, (err, result) => {
                if (err)
                    res.status(404).send('the details are not correct!');
                else
                    res.status(200).send(result);
            }
            );
        } catch (err) {
            res.status(500).send(err);
        }

    },
    FixBook: (req, res) => {
        try {
            let id = parseInt(req.body.id);
            let status = parseInt(req.body.status);
            con.query(`UPDATE books_status SET status_id = ${status} WHERE id =${id}`, (err, result) => {
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
    },
    AddEmployee: (req, res) => {
        try {
            let { name, address, phone, mail, password, type } = req.body
            con.query(`insert into persons (name,address,phone,mail,password,id_Type)
            values('${name}','${address}','${phone}','
            ${mail}','${password}',${type});select * from persons where id=select LAST_INSERT_ID()`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct!');
                } else {
                    ress.status(200).send(result);
                }
            }
            );
        } catch (err) {
            res.Status(500).send(err);
        }
    }
}
module.exports = fanctions;