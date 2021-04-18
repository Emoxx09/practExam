const pool = require("./db");


(async()=>{
    const client = await pool.connect();
    try{
        var rating = 5;

        await client.query('BEGIN');
        const queryText = 'SELECT * FROM prelimexam.supplier WHERE supp_no = 19';
        const res = await client.query(queryText);

        if (res.rows[0].rating == null){
            const queryText1 = "UPDATE prelimexam.supplier SET rating = " + (rating) + " WHERE supp_no = 19";
            const res1 = await client.query(queryText1);
        }
        else{
            const queryText1 = "UPDATE prelimexam.supplier SET rating = " + ((rating + res.rows[0].rating)/2) + " WHERE supp_no = 19";
            const res1 = await client.query(queryText1);
        }

        await client.query('COMMIT');
    }
    catch(e){
        await client.query('ROLLBACK');
         throw e
    } finally {
        client.release();
        console.log('Database transaction is completed.');
    }

})().catch(e=>console.error(e.stack))