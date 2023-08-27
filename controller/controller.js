import pg from 'pg';
import nodemailer from 'nodemailer';
import { response } from 'express';


export const beginner = (request, response) => {
    response.status(200);
    response.send('Sevre is running successfully')
}

export const elephantSql = (request, response) => {
    const connectionUrl = 'postgres://fhkusyjn:gjzNNlfVQ2xnHMrKTVl7mPr6O5rYCGbE@lallah.db.elephantsql.com/fhkusyjn';

    let client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) {
            return console.error('Could not connect to POSTGRES', error)
        }
        client.query('Select * from EMPLOYEE', (err, result) => {
            if (err) {
                return console.err('Error while executing Query', err)
            }

            let empData = result.rows;
            console.log(empData);

            client.end()

        })

    })
}

export const elephantSql2 = async (request, response) => {
    try {
        const connectionUrl = 'postgres://fhkusyjn:gjzNNlfVQ2xnHMrKTVl7mPr6O5rYCGbE@lallah.db.elephantsql.com/fhkusyjn';

        let client = new pg.Client(connectionUrl);

        client.connect((error) => {
            if (error) {
                return console.error('Could not connect to POSTGRES', error)
            }
            client.query('Select * from EMPLOYEE', (err, result) => {
                if (err) {
                    return console.err('Error while executing Query', err)
                }

                let todayDate = new Date();

                let empData = result.rows;

                empData.map((data, index) => {
                    console.log(data.dob, todayDate);
                    console.log(typeof(data.dob));
                    console.log(typeof(todayDate))
                })


                response.status(200).json(empData)
                client.end()
            })
        })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

export const sendMail = async (request, response) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'nishantkrishna1288@gmail.com',
                pass: 'teahaymaydnddtkq'
            },
        });
        const info = await transporter.sendMail({
            from: '"Nishant Krishna Ghadigaonkar 👻" <nishantkrishna1288@gmail.com>', // sender address
            to: "nishantghadigaonkar134@gmail.com, nishantkrishna1288@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        response.status(200).json({ message: 'Mail sent' })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
