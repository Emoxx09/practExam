const pool = require("./db");


(async()=>{
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const prod1 = "Wheel";
        var prod1quan = 1;
        var prod2 = "Pillow";
        var prod2quan = 2;
        var prod3 = "Tshirt";
        var prod3quan = 3;

        const fetchProd1 = "SELECT * FROM prelimexam.product WHERE name = '" + prod1 + "';";
        const fetchProd2 = "SELECT * FROM prelimexam.product WHERE name = '" + prod2 + "';";
        const fetchProd3 = "SELECT * FROM prelimexam.product WHERE name = '" + prod3 + "';";
        const poAdd = 'INSERT INTO prelimexam.purchase_order(date, supp_no, cust_no, status) VALUES ($1, $2, $3, $4) RETURNING po_no;';
        const loAdd = 'INSERT INTO prelimexam.line_item(name, total_price, quantity, po_no, prod_no, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING lo_no;';

        const po = ["04-01-2021", "1", "1", "TRUE"];
        
        const grab1 = await client.query(fetchProd1);
        const grab2 = await client.query(fetchProd2);
        const grab3 = await client.query(fetchProd3);

        const res = await client.query(poAdd, po);

        const lo1 = [prod1, ""+(grab1.rows[0].price * prod1quan), prod1quan, res.rows[0].po_no, ""+ grab1.rows[0].prod_no, "TRUE"];
        const lo2 = [prod2, ""+(grab2.rows[0].price * prod2quan), prod2quan, res.rows[0].po_no, ""+ grab2.rows[0].prod_no, "TRUE"];
        const lo3 = [prod3, ""+(grab3.rows[0].price * prod3quan), prod3quan, res.rows[0].po_no, ""+ grab3.rows[0].prod_no, "TRUE"];

        const res0 = await client.query(loAdd, lo1);
        const res1 = await client.query(loAdd, lo2);
        const res2 = await client.query(loAdd, lo3);

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