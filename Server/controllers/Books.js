const con = require('../config/DB');
const AddCopyBookSql = async (id) => {
    con.query(`insert into books_status (book_id,status_id,available) values(${id},1,1)`, (err, result) => {
        if (err) {
            throw err;
        } else {
            return { mm: "נוסף עותק בהצלחה" };
        }
    })
}
const fanctions = {
    AllBooks: (req, res) => {
            try {
                con.query(`select b.*,a.name as auther_name,(select count(*)
        from books_status bs 
        where bs.book_id= b.id and bs.available=1) as CountOfCopies,ca.name as category
from books b join auther a on b.auther_id=a.id join shelves  s on b.shelf_id=s.id 
join columns_lib c on s.Column_id=c.id join categories ca on c.Category_id=ca.id`, (err, result) => {
                    if (err)
                        res.status(404).send('failed!!');
                    else
                        res.status(200).send(result);
                })
            }
            catch (err) {
                res.Status(500).send(err);
            }
        },
    AddAuther: (req, res) => {
        try {
            let { name } = req.body;
            con.query(`insert into auther (name)
        values('${name}')`, (err, result) => {
                if (err)
                    res.status(404).send('failed!!');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    AddCategory: (req, res) => {
        try {
            let { name } = req.body
            con.query(`insert into categories (name)
        values('${name}')`, (err, result) => {
                if (err)
                    res.status(404).send('failed!!');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    Filter: (req, res) => {
            try {
                let { category, auther, startWith } = req.query;
                let query = ` select b.*,a.name as auther_name,(select count(*)
        from books_status bs 
        where bs.book_id= b.id and bs.available=1) as CountOfCopies,ca.name as name_category
        from books b join auther a on b.auther_id=a.id join shelves  s on b.shelf_id=s.id 
        join columns_lib c on s.Column_id=c.id join categories ca on c.Category_id=ca.id  
        where  (${category} is null or  ca.id=${category})
        and  (${auther} is null or  a.id=${auther})
        and (${startWith == 'null' ? null : '"$"'} is null or b.name Like '%${startWith}%');`
                con.query(query, (err, result) => {
                    if (err)
                        res.status(404).send('failed!!');
                    else
                        res.status(200).send(result);
                })
            }
            catch (err) {
                res.Status(500).send(err);
            }
     },
    AddCopyBook: (req, res) => {
        try {
            let id = parseInt(req.body.id);
            let result = AddCopyBookSql(id)
            res.status(200).send(result);
        } catch (err) {
            res.Status(500).send(err);
        }
    },
    AddBook: async (req, res) => {
        try {
            let { auther_id, shelf_id, year, name } = req.body
            let sql = `insert into books (name,auther_id,year,shelf_id) 
            values('${name}',${parseInt(auther_id)},${year},${shelf_id});`
            console.log(sql)
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct!');
                } else {
                    let newquery = `select * from books where id=(select distinct LAST_INSERT_ID()  from books)`;
                    con.query(newquery, async (err, newresult) => {
                        if (err) {
                            res.status(404).send('we cant sign you');
                        }
                        else {
                            let id = newresult[0].id;
                            for (let index = 0; index < parseInt(req.body.cnt); index++) {
                                await AddCopyBookSql(id);
                            }
                            res.status(200).send({ mm: "הוסף בהצלחה" });
                        }
                    })
                }
            }
            );
        } catch (err) {
            res.Status(500).send(err);
        }

    },
    AddColumn: (req, res) => {
        try {
            let { name, Category_id } = req.body;
            let sql=`insert into columns_lib (name,Category_id)
        values('${name}',${Category_id})`;
        console.log(sql);
            con.query(sql, (err, result) => {
                if (err)
                    res.status(404).send('failed!!');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    },
    AddShelf: (req, res) => {
        try {
            let { name, Column_id } = req.body
            con.query(`insert into shelves (name,Column_id)
        values('${name}',${Column_id})`, (err, result) => {
                if (err)
                    res.status(404).send('failed!!');
                else
                    res.status(200).send(result);
            })
        }
        catch (err) {
            res.Status(500).send(err);
        }
    }
}

module.exports = fanctions;