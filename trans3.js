const pool = require("./db");


(async()=>{
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const queryText = 'UPDATE prelimexam.line_item SET status = FALSE WHERE lo_no = 1';
        const res = await client.query(queryText);

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