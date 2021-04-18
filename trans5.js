const pool = require("./db");


(async()=>{
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const queryText = "SELECT * FROM prelimexam.line_item WHERE po_no = 4 AND status = 'TRUE'";
        const res = await client.query(queryText);

        console.log("NAME\t\tQUANTITY\tTOTAL PRICE");

        for (var i = 0; i < res.rows.length; i++) {
            console.log(res.rows[i].name + "\t\t" + res.rows[i].quantity + "\t\t" + res.rows[i].total_price);
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