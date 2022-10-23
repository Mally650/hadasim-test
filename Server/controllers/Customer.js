const { query } = require('../config/DB');
const con = require('../config/DB');
const fanctions = {
    Signin: (req, res) => {
        try {
            let details = req.body;
            let query = ` insert into persons (name,address,phone,mail,password,id_Type)
            values('${details.name}','${details.address}','${details.phone}',
            '${details.mail}','${details.password}',${details.type})`;
            con.query(query, (err, result) => {
                if (err) {
                    res.status(404).send('we cant sign you');
                }
                else {
                    let newquery = `select * from persons where id=(select distinct LAST_INSERT_ID()  from persons)`;
                    con.query(newquery, (err, newresult) => {
                        if (err)
                            res.status(404).send('we cant sign you');
                        else
                            res.status(200).send(newresult);
                    })
                }
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    GetLendedBooks: (req, res) => {
        try {
            let { id } = req.params
            let sql = `select l.*,b.name
            from lending l join books_status bs
            on l.book_id=bs.id
            join books b on bs.book_id=b.id
            where l.Persons_id=${id} and l.returned=0`
            console.log(sql)
            con.query(sql, (err, result) => {
                if (err)
                    res.status(404).send('the id isnt found');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }

    },
    GetWaitingBooks: (req, res) => {
        try {
            let { id, index } = req.params
            con.query(` select w.*,b.name
            from waiting_list w join books b
            on w.book_id=b.id
            where w.Persons_id=${id} and w.recived =0
            order by w.Date_required 
            limit  ${index}`, (err, result) => {
                if (err)
                    res.status(404).send('the id isnt found');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    LendBook: (req, res) => {
        try {
            let { book_id, person_id, date } = req.body
            const sql = `insert into lending (book_id,Persons_id,returned,Date_Lended,Date_returned)
            values((select id
                from books_status
                where book_id=${book_id} and available=1
                limit 1),${parseInt(person_id)},0,'${date}','${date}')`
            con.query(sql, (err, result) => {
                if (err)
                    res.status(404).send('the id isnt found');
                else
                    res.status(200).send(result);
            })
        } catch (err) {
            res.status(500).send(err);
        }
    },
    GetCountLendedBooks:(req, res) => {
            try {
                let { id } = req.params;
                con.query(`select count(*) as counts
                from lending 
                where Persons_id=${parseInt(id)} and returned=0`, (err, result) => {
                    if (err)
                        res.status(404).send('the id isnt found');
                    else
                        res.status(200).send(result);
                })
            }
            catch (err) {
                res.Status(500).send(err);
            }
        },
    DeleteWish: (req, res) => {
        try {
            let { id } = req.params;
            console.log(`delete from waiting_list where id =${(id)};`)
            con.query(`delete from waiting_list where id =${id};`, (err, result) => {
                if (err)
                    res.status(404).send('the id isnt found');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    ReturnBook: (req, res) => {
        try {
            let { date, id } = req.body
            let query = `update lending 
            set returned=1 ,
                Date_returned='${date}'
            where id=${parseInt(id)}`
            console.log(query)
            con.query(query, (err, result) => {
                if (err)
                    res.status(404).send('the id isnt found');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    WaitBook: (req, res) => {
        try {

            let { book_id, person_id, date } = req.body;
            const sql = `insert into waiting_list ( book_id, Persons_id, recived, Date_required)
            values(${book_id},${person_id},0,'${date}')`
            con.query(sql, (err, result) => {
                if (err)
                    res.status(404).send('the id isnt found');
                else
                    res.status(200).send(result);
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
}


module.exports = fanctions;